import React, { Component } from 'react';
import axios from 'axios'



export default class Add extends Component {

  constructor() {
    super ()
    this.state = {
      name: '',
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

    console.log(this.state.name)
    console.log(this.state.content)
    console.log(this.state.title)


  }


  handleSubmitPost(e) {
    e.preventDefault()
    axios.post("http://localhost:4000/", {

        name: this.state.name,
        title: this.state.title,
        content: this.state.content,


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
        <input name="name" type="text" placeholder="name"  onChange={this.handleCreatePost} />
        <input name="title" type="text" placeholder="title" onChange={this.handleCreatePost} />
        <input name="content" type="text" placeholder="content" onChange={this.handleCreatePost} />

        <input className="add-btn" type="submit" value="Create" />
      </form>
    </div>


    )


  }


}
