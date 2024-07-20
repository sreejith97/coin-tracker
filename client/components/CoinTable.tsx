"use client";
import { RootState } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import {
  setDigitalCoins,
  setColumnFilters,
  setCurrentPage,
  setItemsPerPage,
  setSelectedCoin,
  setFetchInformation,
} from "../Redux/CoinSlice";
import io from "socket.io-client";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";

interface Product {
  name: string;
  rate: number;
  code: string;
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
  cap: number;
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

interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoinTable: React.FC = () => {
  const dispatch = useDispatch();
  const digitalCoins = useSelector((state: any) => state?.coin?.digitalCoins);
  const selectedCoin = useSelector((state: any) => state?.coin?.selectedCoin);
  const columnFilters = useSelector((state: any) => state?.coin?.columnFilters);
  const currentPage = useSelector((state: any) => state?.coin?.currentPage);
  const itemsPerPage = useSelector((state: any) => state?.coin?.itemsPerPage);
  const fetchInformation = useSelector(
    (state: any) => state?.coin?.fetchInformation
  );

  const [openModal, setOpenModal] = useState(false);

  // console.log(selectedCoin);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    const fetchData = () => {
      socket.emit("fetchData", selectedCoin);
    };

    fetchData();

    socket.on("priceUpdate", (data) => {
      console.log("Received priceUpdate data:", data);

      const isArray = (data: any): data is any[] => {
        return Array.isArray(data);
      };

      if (isArray(data)) {
        const filteredData = data.filter(
          (coins: any) => coins?.code === selectedCoin
        );
        const newDigitalCoins =
          filteredData.length > 0 ? filteredData[0]?.data : [];
        dispatch(setDigitalCoins(newDigitalCoins));
      } else {
        console.error(
          "Data format error: Data is not an array. Data type:",
          typeof data,
          "Value:",
          data
        );

        dispatch(setDigitalCoins([]));
      }
    });

    socket.on("message", (message) => {
      console.log("Message from server:", message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, selectedCoin]);

  console.log(digitalCoins);

  useEffect(() => {
    const fetchCurrentStatus = async () => {
      try {
        const response = await axios.get<{ isFetching: boolean }>(
          `${process.env.NEXT_PUBLIC_BASE_URL}fetching-status`
        );
        const { isFetching } = response?.data;

        console.log("Fetching status:", isFetching);

        if (isFetching) {
          dispatch(setFetchInformation(isFetching));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentStatus();
  }, []);

  const handleColumnFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newFilters = checked
      ? [...columnFilters, value]
      : columnFilters.filter((filter: any) => filter !== value);
    dispatch(setColumnFilters(newFilters));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1));
  };

  const filteredCoins = digitalCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = async () => {
    try {
      const response = await axios.post<{ isFetching: boolean }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}toggle-fetching`
      );
      const { isFetching } = response?.data;

      console.log("Fetching status:", isFetching);

      dispatch(setFetchInformation(isFetching));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full my-16 lg:my-24 relative">
      <div className=" my-4 w-full flex flex-row justify-center lg:justify-end items-center gap-3 ">
        <div>
          {" "}
          <label className="inline-flex items-center me-4 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={fetchInformation}
              onChange={toggleCheckbox}
            />
            <div
              className={`relative w-11 h-6 bg-gray-600 rounded-full peer   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A855F7]`}
            ></div>
            <span className="ms-3 text-sm font-medium text-white">{"Run"}</span>
          </label>
        </div>
        <div
          className=" flex flex-row gap-2 items-center justify-center text-[16px] text-[#ffff] bg-[#A855F7] p-2 px-5 rounded-full cursor-pointer"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <FaFilter />

          <p>Filter</p>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-full mx-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columnFilters.includes("name") && (
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
              )}
              {columnFilters.includes("price") && (
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              )}
              {columnFilters.includes("volume") && (
                <th scope="col" className="px-6 py-3">
                  Volume
                </th>
              )}
              {columnFilters.includes("delta") && (
                <th scope="col" className="px-6 py-3">
                  Price Change (24h)
                </th>
              )}
              {columnFilters.includes("liquidity") && (
                <th scope="col" className="px-6 py-3">
                  Liquidity
                </th>
              )}
              {columnFilters.includes("allTimeHighUSD") && (
                <th scope="col" className="px-6 py-3">
                  All Time High
                </th>
              )}
              {columnFilters.includes("cap") && (
                <th scope="col" className="px-6 py-3">
                  Market Cap
                </th>
              )}
              {columnFilters.includes("circulatingSupply") && (
                <th scope="col" className="px-6 py-3">
                  Circulating Supply
                </th>
              )}
              {columnFilters.includes("totalSupply") && (
                <th scope="col" className="px-6 py-3">
                  Total Supply
                </th>
              )}
              {columnFilters.includes("age") && (
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
              )}
              {columnFilters.includes("exchanges") && (
                <th scope="col" className="px-6 py-3">
                  Exchanges
                </th>
              )}
              {columnFilters.includes("markets") && (
                <th scope="col" className="px-6 py-3">
                  Markets
                </th>
              )}
              {columnFilters.includes("pairs") && (
                <th scope="col" className="px-6 py-3">
                  Pairs
                </th>
              )}
              {columnFilters.includes("categories") && (
                <th scope="col" className="px-6 py-3">
                  Categories
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((product: Product, index: number) => (
              <ProductRow
                key={index}
                product={product}
                columnFilters={columnFilters}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={digitalCoins.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {openModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl bg-gray-600 p-6 rounded-lg ">
          <div className="mb-4">
            <label className="text-white font-semibold">Column Filters:</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                "cap",
                "circulatingSupply",
                "totalSupply",
                "age",
                "exchanges",
                "markets",
                "pairs",
                "categories",
              ].map((col) => (
                <div key={col} className="flex items-center">
                  <input
                    type="checkbox"
                    value={col}
                    checked={columnFilters.includes(col)}
                    onChange={handleColumnFilterChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <label className="ml-2 text-white">{col}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold">Select Coin:</label>
            <div className="flex flex-row justify-start items-start flex-wrap gap-5 gap-x-2 py-3">
              <div
                className={`${
                  selectedCoin === "BTC" ? "bg-[#A855F7]" : "border"
                } p-1 rounded-2xl  px-8 cursor-pointer`}
                onClick={() => {
                  dispatch(setSelectedCoin("BTC"));
                }}
              >
                Bitcoin
              </div>
              <div
                className={`${
                  selectedCoin === "ETH" ? "bg-[#A855F7]" : "border"
                } p-1 rounded-2xl  px-8 cursor-pointer`}
                onClick={() => {
                  dispatch(setSelectedCoin("ETH"));
                }}
              >
                Etherium
              </div>
              <div
                className={`${
                  selectedCoin === "LTC" ? "bg-[#A855F7]" : "border"
                } p-1 rounded-2xl  px-8 cursor-pointer`}
                onClick={() => {
                  dispatch(setSelectedCoin("LTC"));
                }}
              >
                LiteCoin
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="itemsPerPage" className="mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border p-1 text-[#000] rounded-lg"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div>
            <MdClose
              className="top-6 right-6 absolute cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface ProductRowProps {
  product: Product;
  columnFilters: string[];
}

const ProductRow: React.FC<ProductRowProps> = ({ product, columnFilters }) => {
  const {
    name,
    rate,
    code,
    volume,
    delta,
    liquidity,
    allTimeHighUSD,
    cap,
    circulatingSupply,
    totalSupply,
    age,
    exchanges,
    markets,
    pairs,
    categories,
  } = product;

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      {columnFilters.includes("name") && <td className="px-6 py-4">{name}</td>}
      {columnFilters.includes("price") && <td className="px-6 py-4">{rate}</td>}
      {columnFilters.includes("volume") && (
        <td className="px-6 py-4">{volume}</td>
      )}
      {columnFilters.includes("delta") && (
        <td className="px-6 py-4">{delta.day}%</td>
      )}
      {columnFilters.includes("liquidity") && (
        <td className="px-6 py-4">{liquidity}</td>
      )}
      {columnFilters.includes("allTimeHighUSD") && (
        <td className="px-6 py-4">{allTimeHighUSD}</td>
      )}
      {columnFilters.includes("cap") && <td className="px-6 py-4">{cap}</td>}
      {columnFilters.includes("circulatingSupply") && (
        <td className="px-6 py-4">{circulatingSupply}</td>
      )}
      {columnFilters.includes("totalSupply") && (
        <td className="px-6 py-4">{totalSupply}</td>
      )}
      {columnFilters.includes("age") && <td className="px-6 py-4">{age}</td>}
      {columnFilters.includes("exchanges") && (
        <td className="px-6 py-4">{exchanges}</td>
      )}
      {columnFilters.includes("markets") && (
        <td className="px-6 py-4">{markets}</td>
      )}
      {columnFilters.includes("pairs") && (
        <td className="px-6 py-4">{pairs}</td>
      )}
      {columnFilters.includes("categories") && (
        <td className="px-6 py-4">{categories[0]}</td>
      )}
    </tr>
  );
};

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 border rounded"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 mx-1 border rounded ${
            index + 1 === currentPage ? "bg-gray-300" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 border rounded"
      >
        Next
      </button>
    </div>
  );
};

export default CoinTable;
