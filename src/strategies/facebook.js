module.exports = {
  Ctor: require('passport-facebook').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_FACEBOOK_APPID
    const clientSecret = env.LW_FACEBOOK_APPSECRET
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        profileFields: ['displayName', 'name', 'photos', 'email']
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    profile.fullname  = [profile.name.givenName, profile.name.familyName].filter(x => x).join(' ')
    profile.username = profile.displayName
    profile.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null
    delete profile._raw
    delete profile._json

    done(null, {
      accessToken,
      refreshToken,
      profile,
    })
  }
}
