import { Request, Response } from "express";
import { responseObject } from "../utils/responseObject";
import productService from "../services/product.service";

export default {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).send(responseObject(products, null));
    } catch (error) {
      return res
        .status(500)
        .send(responseObject(null, "Internal server error"));
    }
  },

  getProduct: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const product = await productService.getProduct(id);

      return res.status(200).send(responseObject(product, null));
    } catch (error) {
      const errorMessage: string = (error as Error).message;
      const status: number =
        errorMessage === "No product with such id" ? 404 : 500;

      return res.status(status).send(responseObject(null, errorMessage));
    }
  },

  createProduct: async (req: Request, res: Response) => {
    const product = req.body;
    const createdProduct = await productService.createProduct(product);
    return res.status(201).send(responseObject(createdProduct, null));
  },
};
