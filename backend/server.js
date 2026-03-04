import express from "express";
import { config } from "dotenv";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
