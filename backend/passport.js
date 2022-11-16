const passport = require('passport');

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID = "14033383708-saa787n1db8aq77d41a17m05ltjlqtos.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user,done)=>{
    done(null,user)
  })

  passport.deserializeUser((user,done)=>{
    done(null,user)
  })