import { CartProduct } from '.';

export interface User {
  id: number;
  email: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  mobile?: string | number;
  password?: string;
  products?: CartProduct[];
  age?: number;
  gender?: number;
}
