import { CartProduct } from './CartProduct';

export interface Cart {
  userId: number;
  userProducts: CartProduct[];
}
