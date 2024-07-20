"use client";
import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./CoinSlice";

const store = configureStore({
  reducer: {
    coin: coinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
