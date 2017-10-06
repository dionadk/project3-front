import React, { Component } from 'react';
import axios from 'axios'



export default class Add extends Component {

  constructor() {
    super ()
    this.state = {
      userNamename: '',
      title: '',
      content: '',
      date: ''

    }

      this.handleCreatePost = this.handleCreatePost.bind(this)
      this.handleSubmitPost = this.handleSubmitPost.bind(this)
  }

  handleCreatePost (e) {
    e.preventDefault()
    const name = e.target.name
    let newPost = []
    this.setState ({
      [name]: e.target.value
    })


  }


  handleSubmitPost(e) {
    e.preventDefault()
    axios.post("http://localhost:4000/", {

        userName: this.state.user,
        title: this.state.title,
        content: this.state.content,
        date: this.state.date

    })
    .then((response) => {
      this.setState({
        posts: response.data
      })})
    .catch((err) => {
      console.log(err)
    })

}

  render (){

    return (
      <div className="add">

      <h2>Create a new post</h2>
      <form onSubmit={this.handleSubmitPost}>
        <input name="userName" type="text" placeholder="name"  onChange={this.handleCreatePost} />
        <input name="title" type="text" placeholder="title" onChange={this.handleCreatePost} />
        <input name="content" type="text" placeholder="content" onChange={this.handleCreatePost} />
        <input name="date" type="text" placeholder="date" onChange={this.handleCreatePost}  />

        <input className="add-btn" type="submit" value="Add" />
      </form>
    </div>


    )


  }




}
