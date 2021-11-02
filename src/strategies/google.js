module.exports = {
  Ctor: require('passport-google-oauth2').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_GOOGLE_CLIENTID
    const clientSecret = env.LW_GOOGLE_CLIENTSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['profile', 'email']
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    profile.name = profile.username = profile.displayName
    profile.photo = profile.photos[0] ? profile.photos[0].value : null
    delete profile._raw
    delete profile._json

    done(null, {
      accessToken,
      refreshToken,
      profile    })
  }
}
