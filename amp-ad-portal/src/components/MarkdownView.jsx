import React, { Component } from "react"

export class MarkdownView extends Component {
  componentDidCatch(error, info) {
    console.log("Caught error ", error)
    console.log("Info: ", info)
  }

  render() {
    
  }
}

export default MarkdownView
