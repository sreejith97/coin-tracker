// pages/api/crypto-prices.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const getCryptoPrices = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await axios.get(
      `${process.env.CRYPTO_API_URL}/api/crypto-prices`
    );
    res.status(200).json({ jhsd: "jhsikedj" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching crypto prices" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getCryptoPrices(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
