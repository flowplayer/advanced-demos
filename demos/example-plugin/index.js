import Munin from "./munin"

export default function munin_analytics (opts, root, video) {
  // we should always avoid Maybe types when possible
  // by arranging our architecture this way we can avoid
  // a whole class of JavaScript errors
  const munin = Munin.of(video)
  // make a list of all events we want to track
  // the flowplayer umd assembles itself asynchronously
  // so we must **only** access shared umd objects inside
  // of the plugin context that we own!
  const interesting_events = 
    [ flowplayer.events.PLAYING
    , flowplayer.events.PAUSE
    , flowplayer.events.WAITING
    , flowplayer.events.ENDED
    ]
  // listen to all CONFIG events, in case we are loading
  // our config asynchronously from an api or something like that
  video.on(flowplayer.events.CONFIG, ()=> {
    const config = opts.munin || {}
    // we don't have an api-key so bail
    if (!config.key) {
      return console.warn("plugin(:munin) was not passed an api key")
    }
    // update munin with the key
    munin.setKey(config.key)
  })
  // track only the first play as a special case
  video.one(flowplayer.events.PLAYING, ()=> {
    munin.track("start") 
  })
  // listen to all the interesting events
  video.on(interesting_events, e => {
    // and track them!
    munin.track(e.type)
  })
  // clean up the unsafe reference to the HTMLVideoElement
  // so that it can be garbage-collected
  video.one(flowplayer.events.REAP, ()=> {
    munin.destroy()
  })
  // listen to our own events from when we 
  video.on([Munin.events.ERR, Munin.events.OK], e => {
    config.debug && console.error("Event(kind: %s, data: %o)", e.type, e.data)
  })
}