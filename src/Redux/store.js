import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './MainReducer';
import userReducer from './UserReducer';

export default configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer
  },
});
