import { Request, Response } from "express";
import { responseObject } from "../utils/responseObject";
import productService from "../services/product.service";
import userService from "../services/user.service";

export default {
  getAllProducts: (req: Request, res: Response) => {
    const xUserId = req.headers["x-user-id"];

    if (!xUserId) {
      res.status(403).send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        userService.getUser(xUserId as string);
        const products = productService.getAllProducts();
        res.status(200).send(responseObject(products, null));
      } catch (error) {
        const errorMessage: string = (error as Error).message;
        res.status(401).send(responseObject(null, errorMessage));
      }
    }
  },

  getProduct: (req: Request, res: Response) => {
    const xUserId = req.headers["x-user-id"];
    const id = req.params.id;

    if (!xUserId) {
      res.status(403).send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        userService.getUser(xUserId as string);
        const product = productService.getProduct(id);
        return res.status(200).send(responseObject(product, null));
      } catch (error) {
        const errorMessage: string = (error as Error).message;
        const status: number =
          errorMessage === "No product with such id" ? 404 : 401;
        res.status(status).send(responseObject(null, errorMessage));
      }
    }
  },
};
