import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import filmReducer from '../features/film/store/filmSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    film: filmReducer,
  },
});
