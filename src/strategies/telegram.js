module.exports = {
  Ctor: require('passport-telegram-official').TelegramStrategy,
  getConfig: (env, callbackURL) => {
    const botToken = env.LW_TELEGRAM_TOKEN

    if (botToken) {
      this.success = env.LW_TELEGRAM_SUCCESS
      this.failure = env.LW_TELEGRAM_FAILURE

      return {
        botToken,
        callbackURL
      }
    }
  },
  toUser: (profile, done) => {
    console.log(profile, done)
    profile.fullname  = profile.first_name + ' ' + profile.last_name
    profile.photo = profile.photo_url
    profile.provider='telegram'
    delete profile.photo_url

    done(null, {
      success: this.success,
      accessToken: profile.id,
      profile
    })
  }
}
