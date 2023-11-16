import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload; // Renamed item to newItem
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      state.totalQuantity--;
      if (state.items[existingItemIndex].quantity === 1) {
        state.items.splice(existingItemIndex, 1); // Remove the item if quantity is 1
      } else {
        state.items[existingItemIndex].quantity--;
        state.items[existingItemIndex].totalPrice -= state.items[existingItemIndex].price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
