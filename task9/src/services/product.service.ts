import { productRepository } from "../repositories/index.js";
import { ProductEntity, WriteProductEntity } from "../schemas/product.entity";

export default {
  getAllProducts: (): Promise<ProductEntity[]> => {
    return productRepository.findAll();
  },
  getProduct: (id: string): Promise<ProductEntity> => {
    const product = productRepository.findById(id);
    if (!product) {
      throw new Error("No product with such id");
    }

    return product as Promise<ProductEntity>;
  },
  createProduct: (product: WriteProductEntity): Promise<ProductEntity> => {
    return productRepository.create(product);
  },
};
