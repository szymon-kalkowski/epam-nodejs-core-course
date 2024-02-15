import cartRepository from "repositories/cart.repository";
import { CartEntity, CartItemBody } from "schemas/cart.entity";
import productService from "services/product.service";

export default {
  getUserCart: (userId: string): CartEntity => {
    const cart: CartEntity | undefined = cartRepository.findByUserId(userId);
    if (!cart) {
      return cartRepository.create(userId);
    }

    return cart;
  },

  getCartTotal: (cart: CartEntity): number => {
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );
  },

  updateCart: (cart: CartEntity, cartItem: CartItemBody): CartEntity => {
    if (cartItem.count === 0) {
      cart.items = cart.items.filter(
        (item) => item.product.id !== cartItem.productId
      );
    } else {
      const product = productService.getProduct(cartItem.productId);
      const index = cart.items.findIndex(
        (item) => item.product.id === cartItem.productId
      );
      if (index === -1) {
        cart.items.push({ product, count: cartItem.count });
      } else {
        cart.items[index].count = cartItem.count;
      }
    }

    return cartRepository.save(cart);
  },

  emptyCart: (cart: CartEntity): CartEntity => {
    cart.items = [];
    return cartRepository.save(cart);
  },
};
