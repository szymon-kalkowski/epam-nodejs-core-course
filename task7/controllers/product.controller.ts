import { Request, Response } from "express";
import { responseObject } from "../utils/responseObject";
import productService from "../services/product.service";
import userService from "../services/user.service";

export default {
  getAllProducts: async (req: Request, res: Response) => {
    const xUserId = req.headers["x-user-id"];

    if (!xUserId) {
      return res
        .status(403)
        .send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        userService.getUser(xUserId as string);
        const products = await productService.getAllProducts();

        return res.status(200).send(responseObject(products, null));
      } catch (error) {
        const errorMessage: string = (error as Error).message;

        return res.status(401).send(responseObject(null, errorMessage));
      }
    }
  },

  getProduct: async (req: Request, res: Response) => {
    const xUserId = req.headers["x-user-id"];
    const id = req.params.id;

    if (!xUserId) {
      return res
        .status(403)
        .send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        userService.getUser(xUserId as string);
        const product = await productService.getProduct(id);

        return res.status(200).send(responseObject(product, null));
      } catch (error) {
        const errorMessage: string = (error as Error).message;
        const status: number =
          errorMessage === "No product with such id" ? 404 : 401;

        return res.status(status).send(responseObject(null, errorMessage));
      }
    }
  },

  createProduct: async (req: Request, res: Response) => {
    const product = req.body;
    const createdProduct = await productService.createProduct(product);
    return res.status(201).send(responseObject(createdProduct, null));
  },
};
