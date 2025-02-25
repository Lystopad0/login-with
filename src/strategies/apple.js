module.exports = {
  Ctor: require('passport-apple'),
  getConfig: (env, callbackURL) => {
    if (!env.LW_APPLE_CLIENTID || !env.LW_APPLE_TEAMID || !env.LW_APPLE_CALLBACK || !env.LW_APPLE_KEYID || !env.LW_APPLE_KEYLOCATION) return
    return {
        clientID: env.LW_APPLE_CLIENTID,
        teamID: env.LW_APPLE_TEAMID,
        callbackURL: env.LW_APPLE_CALLBACK,
        keyID: env.LW_APPLE_KEYID,
        privateKeyLocation: env.LW_APPLE_KEYLOCATION,
    }
  },
  toUser: (accessToken, refreshToken, profile, done) => {
    profile.provider='apple'
    done(null, {
      accessToken,
      refreshToken,
      profile
    })
  }
}
