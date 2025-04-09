const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const logger = require("./logger").logger;

// Configure the GitHub strategy for use by Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can choose to store the user profile into a database
      logger.debug(`Github user ${profile.username} logged in`);

      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      return done(null, profile);
    },
  ),
);

// Configure JWT strategy for protected routes
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      // Here you would look up the user based on jwtPayload data
      return done(null, jwtPayload);
    },
  ),
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
