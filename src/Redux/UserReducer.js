import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    // loginAction: (state, action) => {
    //   console.log("user action", action.payload);
    //   state.user = action.payload;
    // },
    setCurrentUser:(state, action) => {
      console.log("user action", action.payload);
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser } = mainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.main.value)`
export const selectUser = state => state.currentUser;

export default mainSlice.reducer;
