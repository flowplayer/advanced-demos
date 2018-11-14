import m      from "mithril"
import Videos from "./videos"
import Native from "./native"

export default
  { root  : document.querySelector("#app")
  , view  : _ => Videos.map(video => m(Native, {video}))
  }