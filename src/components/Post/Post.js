import React, { Component } from 'react'
import {
  Link
} from "react-router-dom"

export default class Post extends Component {
  constructor(props) {
  super(props)
  this.state = {
    posts: this.props.posts
  }

}



  render () {
    return (
        <div>
          <h2>Posts</h2>
            <ul>
              {this.props.posts.map(post => {
                return (<li key={post.userName}><Link to={`/show/${post.title}`}>{post.title}</Link></li>)
              })}
            </ul>
          </div>
        )
      }

}
