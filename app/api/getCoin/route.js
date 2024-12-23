import connectDB from "@utils/connectDB";
import User from "@models/user";
import Wallet from "@models/wallet";
import axios from "axios";
//get single restaurant
export const GET = async (req) => {
  try {
    const coins = [
      { id: "bitcoin", symbol: "BTC" },
      { id: "litecoin", symbol: "LTC" },
      { id: "ethereum", symbol: "ETH" },
      { id: "dash", symbol: "DASH" },
      { id: "bitcoin-cash", symbol: "BCH" },
      { id: "dogecoin", symbol: "DOGE" },
    ];
    const responses = await Promise.all(
      coins.map((coin) =>
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`)
      )
    );
    const formattedData = responses.map((response) => {
      const data = response.data;
      return {
        name: data.name,
        symbol: data.symbol.toUpperCase(),
        currentPrice: data.market_data.current_price.usd,
        priceChangePercentage: data.market_data.price_change_percentage_24h,
        image: data.image.thumb, // Using the "thumb" image from the API

      };
    });
    return Response.json({ responses: formattedData }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
