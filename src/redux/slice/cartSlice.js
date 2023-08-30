import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const LOCAL_STORAGE_KEY = "cartItems";

const initialState = {
  cartItems:
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        : []
      : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const { id, quantity, name } = action.payload;

      const productIndex = state.cartItems.findIndex((item) => {
        return item.id === id;
      });

      const increaseCount = quantity ? quantity : 1;

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += increaseCount;
        toast.success(`${name} 상품이 하나 추가되었습니다.`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: increaseCount };

        state.cartItems.push(tempProduct);

        toast.success(`${name} 상품이 추가되었습니다.`);
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY: (state) => {
      const array = state.cartItems.map((cart) => {
        const { cartQuantity } = cart;
        return cartQuantity;
      });

      const totalQuantity = array.reduce((acc, cur) => acc + cur, 0);

      state.cartTotalQuantity = totalQuantity;
    },
    CALCULATE_SUBTOTAL: (state) => {
      const array = state.cartItems.map((cart) => {
        const { price, cartQuantity } = cart;

        return price * cartQuantity;
      });

      const totalAmount = array.reduce((acc, cur) => acc + cur, 0);

      state.cartTotalAmount = totalAmount;
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (cart) => cart.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity--;
        toast.success(`${action.payload.name} 개수 -1`);
      } else {
        const newCartItems = state.cartItems.filter(
          (cart) => cart.id !== action.payload.id
        );

        state.cartItems = newCartItems;
        toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (cart) => cart.id !== action.payload.id
      );

      state.cartItems = newCartItems;
      toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      toast.success(`장바구니를 비웠습니다.`);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.cartItems));
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItem = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
