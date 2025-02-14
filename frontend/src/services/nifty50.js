import express from "express";
import cors from "cors";
import axios from "axios";
// import { getMarketMovers } from "./TopGainersTopLoosers.js"; // Import scraper

const app = express();
app.use(cors()); // Enable CORS for all routes

// ✅ API route to fetch NIFTY 50 data from Yahoo Finance
app.get("/nifty50", async (req, res) => {
  try {
    const yahooFinanceURL = "https://query1.finance.yahoo.com/v8/finance/chart/^NSEI?interval=1d&range=1mo";
    const response = await axios.get(yahooFinanceURL);
    res.json(response.data); // Send data to frontend
  } catch (error) {
    console.error("Error fetching Nifty 50 data:", error);
    res.status(500).json({ error: "Failed to fetch NIFTY 50 data" });
  }
});

// // ✅ API route to fetch Top Gainers and Losers (Scraped from MoneyControl)
// app.get("/api/market-movers", async (req, res) => {
//   try {
//     const data = await getMarketMovers();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching stock data:", error);
//     res.status(500).json({ error: "Failed to fetch stock data" });
//   }
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
