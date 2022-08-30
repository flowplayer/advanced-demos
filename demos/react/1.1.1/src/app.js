import React    from "react"
import ReactDOM from "react-dom"
import {Player} from "./player"
import "./styles/app.sass"

const player = React.createElement(Player, 
  { src   : "eedf1500-78f9-4249-977a-974445a09db3"
  , token : process.env.TOKEN 
  })

ReactDOM.render(
  player,
  document.getElementById("app"))