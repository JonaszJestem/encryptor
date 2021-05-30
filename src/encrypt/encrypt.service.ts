import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { KeyPairResponse } from './dto/key-pair.response';
import { generateKeyPair, privateDecrypt, publicEncrypt } from 'crypto';
import { promisify } from 'util';
import { Buffer } from 'buffer';
import {
  keyGenerationAlgorithm,
  keyPairOptions,
  MAX_MESSAGE_LENGTH,
  RSA_KEY_BYTES,
} from './encrypt.constants';
import { KeyPairNotGeneratedException } from './encrypt.errors';

const generateKeyPairAsync = promisify(generateKeyPair);

@Injectable()
export class EncryptService {
  constructor(private readonly userRepository: UserRepository) {}

  public async encryptUserFile(
    email: string,
    content: Buffer,
  ): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user?.publicKey) {
      throw new KeyPairNotGeneratedException();
    }

    const buffers = EncryptService.getBufferChunksToEncrypt(content);

    return Buffer.concat(
      buffers.map((buffer) => publicEncrypt(user.publicKey, buffer)),
    ).toString('base64');
  }

  public decryptUserFile(key: string, content: Buffer): string {
    const buffers = EncryptService.getBufferChunksToDecrypt(content);
    const keyBuffer = Buffer.from(key);

    return Buffer.concat(
      buffers.map((buffer) => privateDecrypt(keyBuffer, buffer)),
    ).toString('base64');
  }

  public async generateKeyPairForUser(email: string): Promise<KeyPairResponse> {
    const { privateKey, publicKey } = await generateKeyPairAsync(
      keyGenerationAlgorithm,
      keyPairOptions,
    );

    await this.userRepository.update({ email }, { publicKey });

    return {
      privKey: privateKey,
      pubKey: publicKey,
    };
  }

  private static getBufferChunksToEncrypt(buffer: Buffer): Buffer[] {
    const bufferSize = buffer.byteLength;
    const buffersCount = Math.ceil(bufferSize / MAX_MESSAGE_LENGTH) || 1;
    const dividedSize = Math.ceil(bufferSize / buffersCount || 1);

    if (buffersCount == 1) {
      return [buffer];
    } else {
      return new Array(buffersCount)
        .fill(null)
        .map((chunk, chunkIndex) =>
          buffer.slice(
            chunkIndex * dividedSize,
            (chunkIndex + 1) * dividedSize,
          ),
        );
    }
  }

  private static getBufferChunksToDecrypt(buffer: Buffer): Buffer[] {
    const buffersCount = buffer.length / RSA_KEY_BYTES;

    return new Array(buffersCount).fill(null).map((chunk, index) => {
      const offset = index * RSA_KEY_BYTES;
      const length = offset + RSA_KEY_BYTES;
      return buffer.slice(offset, Math.min(length, buffer.length));
    });
  }
}
