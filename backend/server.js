require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes"); 
const incomeRoutes = require("./routes/incomeRoutes"); 
const expenseRoutes = require("./routes/expenseRoutes"); 
const dashboardRoutes = require("./routes/dashboardRoutes"); 

const app = express(); 

// ✅ Connect MongoDB first
connectDB();

// ✅ Allowed origins (frontend URLs)
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-expense-tracker-git-main-zains-projects-9bea9349.vercel.app",
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error("CORS policy does not allow access from this origin."),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ✅ JSON body parsing
app.use(express.json());

// ✅ API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// ✅ Serve uploaded images if needed
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
