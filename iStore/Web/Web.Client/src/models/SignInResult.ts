import { User } from '.';

export interface SignInResult {
  accessToken: string;
  user: User;
}
