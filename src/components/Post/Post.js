import React, { Component } from 'react'
import './Post.css'
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

            <div className="flexrow flexwrap">

              {this.props.posts.map(post => {
                return (<div className="blogPost flexcol" key={post._id}>
                  <h3>{post.title}</h3>
                    <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</h6>
                  <Link to={`/${post._id}`}>Read more...</Link>
                </div>)
              })}
            </div>
          </div>
        )
      }

}
