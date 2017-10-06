import React, { Component } from 'react'

export default class Show extends Component {
    constructor(props){
      super(props)
      console.log(this.props.match.params.title)
      let selectedPost = this.props.match.params.title
      let singlePost
      this.props.posts.forEach (item => {
        if(item.tile === selectedPost){
        singlePost = item
      }
      })
      this.state = {
        post: singlePost
      }

    }
  render () {
    return (
      <div>
      <h1>Posts in detail</h1>

            <p>Name:{this.state.post.userName}</p>
            <p>Title:{this.state.post.title}</p>
            <p>Content:{this.state.post.content}</p>
            <p>Date:{this.state.post.date}</p>
            <p>Comment:{this.state.post.comment}</p>


      </div>
    )

  }
}
