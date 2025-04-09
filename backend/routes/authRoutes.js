const express = require("express");
const passport = require("passport");
const authenticateToken = require("../middleware/authenticateToken");
const jwt = require("jsonwebtoken");
const crypto = require("../config/crypto");
const router = express.Router();
const logger = require("../config/logger").logger;

// Route to start GitHub login
router.get("/check", authenticateToken, (req, res) => {
  const user = req.user; // User object from GitHub profile
  logger.debug(`/check: user: ${user.username}`);

  res.status(200).json({
    username: user.username,
    profile: user.profile,
    accessToken: req.cookies.token,
  });
});

// GitHub login route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

// GitHub callback route
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user; // User object from GitHub profile
    logger.debug(`/github/callback: user: ${user.username}`);
    const sensitiveData = {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };

    const encrypted = crypto.encrypt(JSON.stringify(sensitiveData));

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        iv: encrypted.iv,
        data: encrypted.encryptedData,
        // accessToken: user.accessToken,
        // refreshToken: user.refreshToken,
        profile: {
          name: user.displayName || user.username,
          avatar_url: user._json.avatar_url,
          profile_url: user.profileUrl,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Cookie is stored on the client side so less secure
    // Set JWT in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    }); // Use secure: true in production with HTTPS

    // Session is stored on the server side. The client side only has the session ID.
    // req.session.token = token;
    res.redirect("/profile"); // Redirect to frontend after login
  },
);

// Logout route
// router.get("/logout", authController.logout);

module.exports = router;
