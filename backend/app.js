const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from a .env file
const express = require("express");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const repositoryRoutes = require("./routes/repositoryRoutes");
const modulesRoutes = require("./routes/modulesRoutes");
const logger = require("./config/logger").logger;
require("./config/passport"); // Import the Passport configuration

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/dist")));

// Session configuration
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false, // Set to true if you're using HTTPS in production
//       sameSite: "strict", // Ensures cookies are sent on cross-origin requests
//     },
//   }),
// );

// Use cookie-parser middleware to parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Initialize Passport and session handling
app.use(passport.initialize());
// app.use(passport.session());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/repositories", repositoryRoutes);
app.use("/api/v1/modules", modulesRoutes);

// Catch-all route to serve the Vue app's index.html file
// This allows Vue Router to handle any client-side routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

// Serve Vue frontend or other routes here

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
