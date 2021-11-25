module.exports = {
  Ctor: require('passport-linkedin-oauth2').Strategy,
  getConfig: (env, callbackURL) => {
    const clientID = env.LW_LINKEDIN_CLIENTID
    const clientSecret = env.LW_LINKEDIN_CLIENTSECRET

    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        state: true,
        scope: ['r_liteprofile'],
      }
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    profile.fullname  = [profile.name.givenName, profile.name.familyName].filter(x => x).join(' ')
    profile.username = profile.displayName
    profile.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null

    delete profile._raw
    delete profile._json
    delete profile._emailRaw
    delete profile._emailJson

    done(null, {
      accessToken,
      refreshToken,
      profile,
    })
  }
}
