import { SignInResponse } from '../dto/sign-in-response.dto';

export class AuthTransformer {
  transformSignIn(jwtToken: string): SignInResponse {
    return {
      authToken: jwtToken,
    };
  }
}
