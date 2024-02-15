import { Request, Response } from "express";
import { responseObject } from "../utils/responseObject";
import cartService from "../services/cart.service";
import userService from "../services/user.service";
import orderService from "services/order.service";
import { cartItemSchema } from "../schemas/cart.entity";

export default {
  getUserCart: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res
        .status(403)
        .send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        await userService.getUser(userId as string);
        const cart = await cartService.getUserCart(userId as string);
        const total = await cartService.getCartTotal(cart);

        return res.status(200).send(
          responseObject(
            {
              cart,
              total,
            },
            null
          )
        );
      } catch (error) {
        const errorMessage: string = (error as Error).message;

        return res.status(401).send(responseObject(null, errorMessage));
      }
    }
  },

  updateUserCart: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"];
    const cartItem = req.body;

    const { error } = cartItemSchema.validate(cartItem);

    if (error) {
      return res
        .status(400)
        .send(responseObject(null, "Products are not valid"));
    }

    if (!userId) {
      return res
        .status(403)
        .send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        await userService.getUser(userId as string);
        const cart = await cartService.getUserCart(userId as string);
        const updatedCart = await cartService.updateCart(cart, cartItem);
        const total = await cartService.getCartTotal(updatedCart);

        return res.status(200).send(
          responseObject(
            {
              cart: updatedCart,
              total,
            },
            null
          )
        );
      } catch (error) {
        const errorMessage: string = (error as Error).message;

        return res.status(401).send(responseObject(null, errorMessage));
      }
    }
  },

  emptyUserCart: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res
        .status(403)
        .send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        await userService.getUser(userId as string);
        const cart = await cartService.getUserCart(userId as string);
        await cartService.emptyCart(cart);

        return res.status(200).send(
          responseObject(
            {
              success: true,
            },
            null
          )
        );
      } catch (error) {
        const errorMessage: string = (error as Error).message;

        return res.status(401).send(responseObject(null, errorMessage));
      }
    }
  },

  createOrder: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res
        .status(403)
        .send(responseObject(null, "You must be authorized user"));
    } else {
      try {
        await userService.getUser(userId as string);
        const cart = await cartService.getUserCart(userId as string);
        const total = await cartService.getCartTotal(cart);

        if (total === 0) {
          return res.status(400).send(responseObject(null, "Cart is empty"));
        }

        const order = await orderService.createOrder(cart);
        await cartService.emptyCart(cart);

        return res.status(200).send(responseObject({ order }, null));
      } catch (error) {
        const errorMessage: string = (error as Error).message;

        return res.status(401).send(responseObject(null, errorMessage));
      }
    }
  },
};
