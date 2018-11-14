import m from "mithril"

export default 
  { view           : _     => m("div")
  , oncreate       : vnode => {
      vnode.attrs.player = flowplayer(vnode.dom, vnode.attrs.video)
      console.log("Component.Native.oncreate():", vnode)
    }
  , onbeforeremove : vnode => {
      console.log("Component.Native.onbeforeremote():", vnode)
      vnode.attrs.player.destroy()
      vnode.attrs.player = 0
    }
  }
