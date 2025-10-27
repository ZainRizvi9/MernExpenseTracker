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
  "https://mern-expense-tracker-a0x2xvgz6-zains-projects-9bea9349.vercel.app",
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin);

      if (!isAllowed) {
        return callback(
          new Error(
            `CORS policy does not allow access from this origin: ${origin}`
          ),
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

// ✅ Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
