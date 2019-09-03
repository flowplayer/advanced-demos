export default class Munin {
  static defaults = 
    { API_URL : "https://munin.example.com/track/event/:event?:api_key"
    }

  static events =
    { ERR : "munin:err"
    , OK  : "munin:ok"
    }

  static of (video, opts = Munin.defaults) {
    return new Munin(video, api_key, opts)
  }

  constructor (video, opts) {
    this.video   = video
    Object.assign(this, opts)
  }
  // set the api key
  setKey (api_key) {
    this.api_key = api_key
  }
  // always be sure to clean up unsafe references
  // in Browserland or zombies will eat your browser tab!
  destroy () {
    this.video = void 0
  }

  _prepare (payload) {
    return this.API_URL
      .replace(":event", payload.event)
      .replace(":api_key", this.api_key)
  }

  async track (event) {
    try {
      if (!this.api_key) {
        throw new Error("Munin is missing an api key, did you forget to call setKey()?")
      }
      // this is left as an exercise for the reader because the goal here
      // is not to teach someone how to make an HTTP request properly
      await HTTP.post(this._prepare({event}))
      return this.video.emit(Munin.events.OK, {event})
    } catch (err) {
      return this.video.emit(Munin.events.ERR, {err})
    }
  }
}