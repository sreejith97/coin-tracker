"use client";
import { Provider } from "react-redux";
import CoinTable from "./CoinTable";
import store from "@/Redux/Store";

export default function CardAndTable() {
  return (
    <section className="max-w-[1700px] w-full flex items-center flex-col ">
      <div className="flex flex-row">
        <div className="w-[115px] h-[50px] bg-[#A855F7] rounded-l-full flex justify-center items-center uppercase font-bold cursor-pointer">
          Chart
        </div>
        <div className="w-[115px] h-[50px] bg-[#1E1E1E] rounded-r-full flex justify-center items-center text-[#6A6A6A] uppercase font-bold cursor-pointer">
          Table
        </div>
      </div>
      <div className="max-w-[100%] relative">
        <Provider store={store}>
          <CoinTable />
        </Provider>
      </div>
    </section>
  );
}
