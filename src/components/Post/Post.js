import React, { Component } from 'react'
import './Post.css'
import {
  Link
} from "react-router-dom"

export default class Post extends Component {
  constructor(props) {
  super(props)
  this.state = {
    // posts: this.props.posts
  }

}


render () {

  // sorts posts newest to oldest
  let posts = []
  this.props.posts.forEach(post => {posts.push(post)})

  // compares posts for .sort
  function compare(a, b) {
    if (a.createdAt > b.createdAt)
      return -1;
    if (a.createdAt < b.createdAt)
      return 1;
    return 0;
  }
  // new variable for sorted posts
  let sortedPosts = posts.sort(compare)
    return (
        <div className='clearSpace'>
          <h2 className="postHeader">Latest Aha Moments</h2>
          <div className='row'>
          {sortedPosts.map( post => {
              return (
                <Link to={`/${post._id}`}>
                  <div className="blogPost col s12" key={post._id}>
                    <h3>{post.title}</h3>
                    <p> {post.createdAt.slice(0, 10)} </p>
                    <h6 className='col s12'>
                      {post.content}
                    </h6>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        )
      }
}
