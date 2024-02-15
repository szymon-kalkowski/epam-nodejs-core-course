import { ProductEntity, product } from "../schemas/product.entity";

let products: ProductEntity[] = [product];

export default {
  findAll: (): ProductEntity[] => products,
  findById: (id: string): ProductEntity | undefined =>
    products.find((product) => product.id === id),
};
