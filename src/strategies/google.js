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
    opts.scope = ['profile', 'userinfo.email']
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    profile.name = profile.username = profile.displayName
    profile.provider = 'google'
    profile.photo = profile.photos[0] ? profile.photos[0].value : null

    done(null, {
      accessToken,
      refreshToken,
      profile    })
  }
}
