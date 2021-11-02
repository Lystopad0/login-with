module.exports = {
  Ctor: require('passport-twitter').Strategy,
  getConfig: (env, callbackURL) => {
    const consumerKey = env.LW_TWITTER_CONSUMERKEY
    const consumerSecret = env.LW_TWITTER_CONSUMERSECRET
    if (consumerKey && consumerSecret) {
      return {
        consumerKey,
        consumerSecret,
        callbackURL
      }
    }
  },
  toUser: (accessToken, tokenSecret, profile, done) => {
    profile.fullname = profile.displayName
    profile.photo = profile.photos[0].value
    delete profile._raw
    delete profile._json

    done(null, {
      accessToken,
      tokenSecret,
      profile
    })
  }
}
