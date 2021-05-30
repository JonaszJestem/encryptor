import { RSAKeyPairOptions } from 'crypto';

export const Errors = {
  KeyPairNotGenerated:
    'No key pair is associated with your account. You have to generate it first.',
  NoFileToEncrypt: 'You have to pass valid file to encrypt',
};

export const keyGenerationAlgorithm = 'rsa';

export const BITES_TO_BYTE_RATIO = 8;
export const RSA_KEY_LENGTH = 4096;
export const RSA_KEY_BYTES = RSA_KEY_LENGTH / BITES_TO_BYTE_RATIO;
const HASH_FUNCTION_DIGEST_LENGTH = 20;

// Taken from: https://crypto.stackexchange.com/questions/42097/what-is-the-maximum-size-of-the-plaintext-message-for-rsa-oaep
export const MAX_MESSAGE_LENGTH =
  RSA_KEY_BYTES - 2 * HASH_FUNCTION_DIGEST_LENGTH - 2;

const KEY_FORMAT = 'pem';

export const keyPairOptions: RSAKeyPairOptions<
  typeof KEY_FORMAT,
  typeof KEY_FORMAT
> = {
  modulusLength: RSA_KEY_LENGTH,
  publicKeyEncoding: {
    type: 'spki',
    format: KEY_FORMAT,
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: KEY_FORMAT,
  },
};
