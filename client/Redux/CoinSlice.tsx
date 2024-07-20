"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Coin {
  id: string;
  name: string;
  price: number;
  volume: number;
  delta: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  };
  liquidity: number;
  allTimeHighUSD: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  age: number;
  exchanges: number;
  markets: number;
  pairs: number;
  categories: string[];
  links: {
    website: string | null;
    whitepaper: string | null;
    twitter: string | null;
    reddit: string | null;
    discord: string | null;
  };
}

interface UserState {
  user: Record<string, any>;
  loginState: boolean;
  digitalCoins: Coin[];
  selectedCoin: string;
  fetchInformation: boolean;
  columnFilters: string[];
  currentPage: number;
  itemsPerPage: number;
}

const initialState: UserState = {
  user: { Hello: "hey" },
  loginState: false,
  digitalCoins: [],
  selectedCoin: "ETH",
  fetchInformation: false,
  columnFilters: [
    "name",
    "price",
    "volume",
    "delta",
    "liquidity",
    "allTimeHighUSD",
    "marketCap",
    "circulatingSupply",
    "totalSupply",
    "age",
    "exchanges",
    "markets",
    "pairs",
    "categories",
    "links",
  ],
  currentPage: 1,
  itemsPerPage: 10,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser(state: UserState, action: PayloadAction<Record<string, any>>) {
      return { ...state, user: action.payload };
    },
    setLoginState(state: UserState) {
      state.loginState = true;
    },
    setDigitalCoins(state: UserState, action: PayloadAction<Coin[]>) {
      state.digitalCoins = action.payload;
    },
    setSelectedCoin(state: UserState, action: PayloadAction<string>) {
      state.selectedCoin = action.payload;
    },
    setFetchInformation(state: UserState, action: PayloadAction<boolean>) {
      state.fetchInformation = action.payload;
    },
    setColumnFilters(state: UserState, action: PayloadAction<string[]>) {
      state.columnFilters = action.payload;
    },
    setCurrentPage(state: UserState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state: UserState, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  addUser,
  setLoginState,
  setDigitalCoins,
  setSelectedCoin,
  setFetchInformation,
  setColumnFilters,
  setCurrentPage,
  setItemsPerPage,
} = userSlice.actions;
export default userSlice.reducer;
