import { useState } from "react";
import { CartContext } from "./cartContextValue";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity, variant, color) => {
    setCartItems((prev) => {
      const existing = prev.findIndex(
        (item) => item.id === product.id && item.variant === variant && item.color === color
      );
      if (existing !== -1) {
        return prev.map((item, i) =>
          i === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity,
          variant,
          color,
          cartPrice: product.price,
          cartOldPrice: product.oldPrice,
          checked: true,
        },
      ];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const toggleCheck = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, toggleCheck, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
