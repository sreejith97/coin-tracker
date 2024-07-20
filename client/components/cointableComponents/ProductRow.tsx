import React from "react";

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

interface ProductRowProps {
  product: Product;
  columnFilters: string[];
}

const ProductRow: React.FC<ProductRowProps> = ({ product, columnFilters }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {columnFilters.includes("name") && (
        <td className="px-6 py-4">{product.name}</td>
      )}
      {columnFilters.includes("price") && (
        <td className="px-6 py-4">{product.rate}</td>
      )}
      {columnFilters.includes("volume") && (
        <td className="px-6 py-4">{product.volume}</td>
      )}
      {columnFilters.includes("delta") && (
        <td className="px-6 py-4">{product.delta.day}</td>
      )}
      {columnFilters.includes("liquidity") && (
        <td className="px-6 py-4">{product.liquidity}</td>
      )}
      {columnFilters.includes("allTimeHighUSD") && (
        <td className="px-6 py-4">{product.allTimeHighUSD}</td>
      )}
      {columnFilters.includes("marketCap") && (
        <td className="px-6 py-4">{product.marketCap}</td>
      )}
      {columnFilters.includes("circulatingSupply") && (
        <td className="px-6 py-4">{product.circulatingSupply}</td>
      )}
      {columnFilters.includes("totalSupply") && (
        <td className="px-6 py-4">{product.totalSupply}</td>
      )}
      {columnFilters.includes("age") && (
        <td className="px-6 py-4">{product.age}</td>
      )}
      {columnFilters.includes("exchanges") && (
        <td className="px-6 py-4">{product.exchanges}</td>
      )}
      {columnFilters.includes("markets") && (
        <td className="px-6 py-4">{product.markets}</td>
      )}
      {columnFilters.includes("pairs") && (
        <td className="px-6 py-4">{product.pairs}</td>
      )}
      {columnFilters.includes("categories") && (
        <td className="px-6 py-4">{product.categories.join(", ")}</td>
      )}
      {columnFilters.includes("links") && (
        <td className="px-6 py-4">{product.links.website}</td>
      )}
    </tr>
  );
};

export default ProductRow;
