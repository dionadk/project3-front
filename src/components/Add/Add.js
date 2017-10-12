import React, { Component } from 'react';
import './Add.css'
import axios from 'axios'

export default class Add extends Component {

  constructor() {
    super ()
    this.state = {
      name: '',
      title: '',
      content: ''
    }

      this.handleCreatePost = this.handleCreatePost.bind(this)
      this.handleSubmitPost = this.handleSubmitPost.bind(this)
  }

  handleCreatePost (e) {
    e.preventDefault()
    const name = e.target.name
    // let newPost = []
    this.setState ({
      [name]: e.target.value
    })
  }


  handleSubmitPost(e) {
    e.preventDefault()
    axios.post("http://localhost:4000/postCreate", {
        name: this.state.name,
        title: this.state.title,
        content: this.state.content,
    }).then((response)=>{
      console.log(response)
      // after post is created redirects to edit posts page to add a tag to post
      window.location.href= "/" + response.data._id;
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {

    return (
      <div className="add post-container">

        <h4>Share your Moments</h4>

        <form onSubmit={this.handleSubmitPost}>
          <div className="flexcol">
            <input name="title" type="text" placeholder="title" onChange={this.handleCreatePost} />
            <input name="name" type="text" placeholder="name"  onChange={this.handleCreatePost} />
            <div className="flexrow">
              <textarea name="content" type="text" placeholder="content" onChange={this.handleCreatePost} />
              <button className="add-btn" type="submit" value="Create">Create</button>
            </div>
          </div>
        </form>

      </div>

    )

  }

}
