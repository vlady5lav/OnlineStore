export interface UserDto {
  id: number;
  email: string;
  password?: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  mobile?: string | number;
  age?: number;
  gender?: number;
}
