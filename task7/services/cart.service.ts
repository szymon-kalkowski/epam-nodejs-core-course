import cartRepository from "repositories/cart.repository";
import {
  CartEntity,
  CartItemBody,
  CartItemEntity,
  WriteCartEntity,
} from "schemas/cart.entity";
import productService from "services/product.service";

export default {
  getUserCart: async (userId: string) => {
    const cart: CartEntity | null = await cartRepository.findByUserId(userId);
    if (!cart) {
      const newCart: WriteCartEntity = {
        userId,
        isDeleted: false,
        items: [],
      };

      return cartRepository.create(newCart);
    }

    return cart;
  },

  getCartTotal: async (cart: any): Promise<number> => {
    for (const item of cart.items) {
      const product = await productService.getProduct(item.product._id);
      item.product = product;
    }

    return cart.items.reduce(
      (total: number, item: CartItemEntity) =>
        total + item.product.price * item.count,
      0
    );
  },

  updateCart: async (
    cart: any,
    cartItem: CartItemBody
  ): Promise<CartEntity> => {
    if (cartItem.count === 0) {
      cart.items = cart.items.filter(
        (item: CartItemEntity) =>
          item.product._id.toString() !== cartItem.productId
      );
    } else {
      const product = await productService.getProduct(cartItem.productId);
      const index = cart.items.findIndex(
        (item: CartItemEntity) =>
          item.product._id.toString() === cartItem.productId
      );
      if (index === -1) {
        cart.items.push({ product, count: cartItem.count });
      } else {
        cart.items[index].count = cartItem.count;
      }
    }

    return cartRepository.save(cart);
  },

  emptyCart: (cart: any): Promise<CartEntity> => {
    cart.items = [];
    return cartRepository.save(cart);
  },
};
