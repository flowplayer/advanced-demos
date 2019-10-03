import * as API from "./mocks/api"
import * as APIEvents from "./events"
/**
 * it's a good idea to define this token as a constant you
 * can reference from anywhere in your application
 */
export const MY_CUSTOM_TYPE = "my-ovp/id"
/**
 * loader plugins can determine their current state by the 
 * arity of the Arguments passed to them:
 * 
 * 3 arguments == normal plugin state
 * 4 arguments == loading a custom src
 * 
 * loader plugins must also implement a `.wants` function
 * so that `flowplayer()` can tell if this plugin wants
 * to intercept the src or not 
 */
export function my_loader (opts, root, video, src) {
  if (arguments.length == 3) be_normal_plugin(opts, root, video)
  if (arguments.length == 4) load_from_my_ovp(video, src)
}
/**
 * all loader plugins expose a `wants` function that accepts a 
 * src object and returns true/false depending on if they want to
 * intercept the loading call
 */
my_loader.wants = (_, src) => {
  console.log("my_loader.wants(src: %o) -> %o", src, src.type == MY_CUSTOM_TYPE)
  return src.type == MY_CUSTOM_TYPE
}
/**
 * if the arity is 3 we are just in "normal" mode
 */
function be_normal_plugin (opts, root, video) {
  /**
   * by passing the loading response back tot he "normal" context
   * we can be sure that all of the flowplayer UI exists and everything
   * has been loaded
   * 
   * utilizing the Event-based organization structure will also lead to 
   * much more maintainable code (and is how Flowplayer is organized internally)
   */
  video.on(APIEvents.OK, function (e) {
    // we are just using a basic setSrc here, but you could also call
    // any of the other player api methods like `setOpts`
    console.log("Event(type: %s, data: %o)", e.type, e.data)
    if (e.data.src)  video.setSrc(e.data.src)
    if (e.data.opts) video.setOpts(e.data.opts)
  })

  video.on(APIEvents.ERR, function (e) {
    const err = e.data
    // this would be a great place to add your own error tracking if necessary.
    // no example for HTTP demos is complete without error handling!
    console.log("Event(type: %s, data: %o)", e.type, e.data)
    video.emit(flowplayer.events.ERROR, err)
  })
}
/**
 * if the arity was 4 we are in the "loader" mode
 * and should attempt to load this src from our API
 */
function load_from_my_ovp (video, src) {
  console.log("my_loader.load_from_my_ovp(src: %o)", src)
  API.response().then(({ok, err})=> {
    if (ok)  return video.emit(APIEvents.OK, ok)
    if (err) return video.emit(APIEvents.ERR, err)
    throw new Error("unhandled case in load_from_my_ovp()\nthis should never happen")
  })
}