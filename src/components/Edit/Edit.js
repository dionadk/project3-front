import React, { Component } from 'react';
import axios from 'axios';


export default class Edit extends Component {
    constructor(props){
      super(props)
      let selectedPost = this.props.match.params._id
      console.log(props)
      let singlePost = props.posts.filter(item => item._id === selectedPost)
      console.log(singlePost)
      this.state = {
        post: []
      }

        this.handleUpdatePost = this.handleUpdatePost.bind(this)
        this.handleSubmitPost = this.handleSubmitPost.bind(this)
        this.handleDeletePost = this.handleDeletePost.bind(this)
    }

    componentDidMount () {
      let selectedPost = this.props.match.params._id
      axios.get(`https://ga-aha.herokuapp.com/${selectedPost}`)
           .then(response => this.setState({post: response.data}))
           .catch((err) => console.log(err))

      }

    handleUpdatePost (e) {
      e.preventDefault()
      console.log(e);
      const name = e.target.name
      // let updatePost = []
      this.setState ({
        [name]: e.target.value
      })
      console.log(e.target.value);
    }

    handleSubmitPost(e) {
      e.preventDefault()
        axios.post(`https://ga-aha.herokuapp.com/${this.state.post._id}/updatePost`,{name: this.state.name,title: this.state.title,content: this.state.content})

    }

    handleDeletePost(e) {
      e.preventDefault()
      axios.post(`https://ga-aha.herokuapp.com/${this.state.post._id}/deletePost`)
      // redirects to home page
      window.location.href= "/"
    }

    render () {
      return (
        <div className="edit post-container">

          <form onSubmit={this.handleSubmitPost}>
            <div className="flexcol">
              <input name="name" type="text" value={this.state.post.name}  onChange={this.handleUpdatePost} />
              <input name="title" type="text" value={this.state.post.title} onChange={this.handleUpdatePost} />
            <div className="flexrow">
              <textarea name="content" type="text" value={this.state.post.content} onChange={this.handleUpdatePost} />
              <button className="edit-btn" type="submit" value="Update">Update</button>

              <form onSubmit={this.handleDeletePost}>
                <button className="delete-btn" type="submit" value="Delete">Delete</button>
              </form>

            </div>
            </div>
          </form>
        </div>
      )
    }




}
