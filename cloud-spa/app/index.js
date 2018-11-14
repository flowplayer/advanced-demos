/**
 * demo app using:
 *  Mithril.js : https://mithril.js.org
 *  Flowplayer : flowplayer.com
 */

import App     from "./app"
import Loading from "./loading"

export default (function () {
  // mount a loading animation
  m.mount(App.root, Loading)
  // wait for the cloud player assets to load
  flowplayer.cloud.then(function () {
    // simulate latency in case the CDN is very fast
    setTimeout(function () {
       // mount the real app
      m.mount(App.root, App)
    }, 1000)
  })
}())



