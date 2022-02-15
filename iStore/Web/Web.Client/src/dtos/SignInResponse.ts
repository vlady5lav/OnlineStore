import { UserDto } from './UserDto';

export interface SignInResponse {
  accessToken: string;
  user: UserDto;
}
