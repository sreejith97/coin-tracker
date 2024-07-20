import React from "react";

interface CoinSelectorProps {
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
}

const CoinSelector: React.FC<CoinSelectorProps> = ({
  selectedCoin,
  setSelectedCoin,
}) => {
  const coins = ["BTC", "ETH", "LTC"];

  return (
    <div className="mb-4">
      <label
        htmlFor="coin"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Select Coin
      </label>
      <select
        id="coin"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      >
        {coins.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoinSelector;
