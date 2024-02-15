import productRepository from "../repositories/product.repository";
import { ProductEntity } from "../schemas/product.entity";

export default {
  getAllProducts: (): ProductEntity[] => {
    return productRepository.findAll();
  },
  getProduct: (id: string): ProductEntity => {
    const product = productRepository.findById(id);
    if (!product) {
      throw new Error("No product with such id");
    }

    return product;
  },
};
