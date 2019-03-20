import React    from "react"
import ReactDOM from "react-dom"
import {Player} from "./player"

const player = React.createElement(Player, 
  { src: "eedf1500-78f9-4249-977a-974445a09db3"
  })

ReactDOM.render(
  player,
  document.getElementById("app"))