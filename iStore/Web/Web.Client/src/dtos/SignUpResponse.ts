import { UserDto } from './UserDto';

export interface SignUpResponse {
  accessToken: string;
  user: UserDto;
}
