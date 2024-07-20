import React from "react";
import CoinSelector from "./CoinSelector";

interface FilterModalProps {
  setOpenModal: (open: boolean) => void;
  columnFilters: string[];
  handleColumnFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  setOpenModal,
  columnFilters,
  handleColumnFilterChange,
  handleItemsPerPageChange,
  selectedCoin,
  setSelectedCoin,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
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
          ].map((filter) => (
            <label key={filter} className="flex items-center">
              <input
                type="checkbox"
                value={filter}
                checked={columnFilters.includes(filter)}
                onChange={handleColumnFilterChange}
                className="mr-2"
              />
              {filter}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label
            htmlFor="itemsPerPage"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Items Per Page
          </label>
          <select
            id="itemsPerPage"
            onChange={handleItemsPerPageChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            {[10, 20, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <CoinSelector
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </div>
    </div>
  );
};

export default FilterModal;
