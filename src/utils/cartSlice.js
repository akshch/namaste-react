import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      // mutating the state here

      // Vanialla(older) Redux => DON'T MUTATE STATE, returning is mandatory.
      // const newState = [...state]
      // newState.items.push(action.payload);
      // return newState

      // Redux Toolkit uses immer behind the scenes
      // we have to mutate the state
      state.items.push(action.payload);
    },
    removeItems: (state, action) => {
      state.items.pop();
    },
    // originalState=["pizza"]
    clearCart: (state, action) => {
      // console.log(state); //[pizza]
      // console.log(current(state));
      // state = [];
      // console.log(state);

      // RTK - either Mutate the existing state or return a new state.
      // state.items.length = 0; // []

      return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    },
  },
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
