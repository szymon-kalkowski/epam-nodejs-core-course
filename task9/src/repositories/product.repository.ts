import {
  ProductEntity,
  WriteProductEntity,
} from "../schemas/product.entity.js";
import { Product } from "../schemas/product.entity.js";

export default {
  findAll: (): Promise<ProductEntity[]> => Product.find({}),
  findById: (id: string): Promise<ProductEntity | null> => Product.findById(id),
  create: (product: WriteProductEntity): Promise<ProductEntity> =>
    Product.create(product),
};
