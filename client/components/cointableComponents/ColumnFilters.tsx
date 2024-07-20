import React from "react";

interface ColumnFiltersProps {
  columnFilters: string[];
  handleColumnFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColumnFilters: React.FC<ColumnFiltersProps> = ({
  columnFilters,
  handleColumnFilterChange,
}) => {
  const filters = [
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
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {filters.map((filter) => (
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
  );
};

export default ColumnFilters;
