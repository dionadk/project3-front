import React, { Component } from 'react'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: this.props.comments
    }
  }
  render () {
    return (
    <div className="comment">
        <div className="actor">
        {this.props.name}
        </div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="date">
          {this.props.date}
        </div>
  </div>
  )}

}
