module.exports = {
  Ctor: require('passport-telegram-official').TelegramStrategy,
  getConfig: (env, callbackURL) => {
    const botToken = env.LW_TELEGRAM_TOKEN
    if (botToken) {
      return {
        botToken,
        callbackURL
      }
    }
  },
  toUser: (accessToken, tokenSecret, profile, done) => {
    // console.log(accessToken, profile)
    profile.fullname  = profile.first_name + ' ' + profile.last_name
    profile.photo = profile.photo_url
    delete profile.photo_url

    done(null, {
      accessToken,
      tokenSecret,
      profile
    })
  }
}
