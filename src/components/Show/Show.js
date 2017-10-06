import React, { Component } from 'react'
import Comments from '../Comments/Comments.js';
import axios from 'axios'


export default class Show extends Component {
    constructor(props){
      super(props)
    // looking for unique id to loop through and find the exact match
      let selectedPost = this.props.match.params._id
      let singlePost = props.posts.filter(item => item._id === selectedPost)
      this.state = {
        post: []
      }

    }

    componentDidMount () {
      let selectedPost = this.props.match.params._id
      axios.get(`http://localhost:4000/${selectedPost}`)
           .then(response => this.setState({post: response.data}))
           .catch((err) => console.log(err))
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
            <Comments post={this.state.post}/>


      </div>
    )

  }
}
