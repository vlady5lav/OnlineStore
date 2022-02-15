export interface Product {
  id: number;
  name: string;
  price: number;
  availableStock?: number;
  description?: string;
  pictureUrl?: string;
  catalogBrand: {
    id: number;
    brand: string;
  };
  catalogType: {
    id: number;
    type: string;
  };
}
