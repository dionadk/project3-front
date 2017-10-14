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

  // sets state with form values
  handleCreatePost (e) {
    e.preventDefault()
    const name = e.target.name
    this.setState ({
      [name]: e.target.value
    })
  }

  // on submit: creates post
  handleSubmitPost(e) {
    e.preventDefault()
    // create new post in the database
    axios.post("https://ga-aha.herokuapp.com/postCreate", {
        name: this.state.name,
        title: this.state.title,
        content: this.state.content,
    }).then((response)=>{
      // redirects to edit posts page
      window.location.href= "/project3-front/" + response.data._id;
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {

    return (
      <div className="add post-container">
        <h4>Share your Moments</h4>

        {/* new post form */}
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
