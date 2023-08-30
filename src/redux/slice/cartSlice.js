import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const { id, quantity, name } = action.payload;

      const productIndex = state.cartItems.findIndex((item) => item.id === id);

      const increaseCount = quantity ? quantity : 1;

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += increaseCount;
        toast.success(`${name} 상품이 하나 추가되었습니다.`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: increaseCount };

        state.cartItems.push(tempProduct);

        toast.success(`${name} 상품이 추가되었습니다.`);
      }
    },
    CALCULATE_TOTAL_QUANTITY: (state) => {
      const array = state.cartItems.map((cart) => {
        const { cartQuantity } = cart;
        return cartQuantity;
      });

      const totalQuantity = array.reduce((acc, cur) => acc + cur, 0);

      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItem = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export default cartSlice.reducer;
