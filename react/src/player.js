import React    from "react"
import ReactDOM from "react-dom"

export class Player extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {  
    console.log(this)
    // create it and expose it
    this.player = flowplayer(this.refs.container, this.props)
  }

  render () {
    return <div ref="container"></div>
  }

  componentWillUnmount () {
    // it is important to ensure that each player created
    // throughout the lifecycle of the SPA is cleaned up
    // Native handles this internally and exposes
    // the .destroy() method
    if (this.player) {
      this.player.destroy()
      // ensure we can GC the reference on this component
      this.player = 0
    }
  }
}