import express from "express";
import cors from "cors";
import 'dotenv/config'; // loads .env variables
import { connectDB } from "./config/db.js";

import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Handle uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception:', err.message);
}); 

// App config
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads")); // serve images from uploads/

// Database connection
connectDB();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
