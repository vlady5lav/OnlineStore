import { User } from '.';

export interface SignUpResult {
  accessToken: string;
  user: User;
}
