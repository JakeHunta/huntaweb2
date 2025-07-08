import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Hunta backend is alive" });
});

app.post("/search", async (req, res) => {
  try {
    const { search_term } = req.body;
    const response = await axios.get("https://app.scrapingbee.com/api/v1", {
      params: {
        api_key: process.env.SCRAPINGBEE_API_KEY,
        url: `https://www.gumtree.com/search?search_category=all&q=${encodeURIComponent(search_term)}`,
        render_js: true
      }
    });
    res.json({ html: response.data.slice(0, 500) }); // demo return
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🎯 Hunta Backend API running on port ${PORT}`);
});
