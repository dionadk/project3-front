import React, { Component } from 'react';
import axios from 'axios';


export default class Edit extends Component {
    constructor(props){
      super(props)
      let selectedPost = this.props.match.params._id
      let singlePost = props.posts.filter(item => item._id === selectedPost)
      this.state = {
        post: [],
        newName: singlePost[0].name,
        newTitle: singlePost[0].title,
        newContent: singlePost[0].content
      }

        this.handleUpdatePost = this.handleUpdatePost.bind(this)
        this.handleSubmitPost = this.handleSubmitPost.bind(this)
        this.handleDeletePost = this.handleDeletePost.bind(this)
    }

    componentDidMount () {
      let selectedPost = this.props.match.params._id
      axios.get(`https://peaceful-river-87816.herokuapp.com/${selectedPost}`)
           .then(response => this.setState({post: response.data}))
           .catch((err) => console.log(err))
      }

    handleUpdatePost (e) {
      e.preventDefault()
      const name = e.target.name
      // let updatePost = []
      this.setState ({
        [name]: e.target.value
      })
    }

    handleSubmitPost(e) {
      e.preventDefault()
      axios.post(`https://peaceful-river-87816.herokuapp.com/${this.state.post._id}/updatePost`,{name: this.state.newName,title: this.state.newTitle,content: this.state.newContent})
        .then((response)=>{

          // after post is created redirects to edit posts page to add a tag to post
          window.location.href= "/project3-front/" + response.data._id;
    })
  }

    handleDeletePost(e) {
      e.preventDefault()
      axios.post(`https://peaceful-river-87816.herokuapp.com/${this.state.post._id}/deletePost`)
      // redirects to home page1
      window.location.href= "/project3-front"
    }

    render () {
      return (
        <div className="edit post-container ">

          <form onSubmit={this.handleSubmitPost}>
            <div className="flexcol">
              <input name="newName" type="text" value={this.state.newName}  onChange={this.handleUpdatePost} />
              <input name="newTitle" type="text" value={this.state.newTitle} onChange={this.handleUpdatePost} />
            <div className="flexrow">
              <textarea name="newContent" type="text" value={this.state.newContent} onChange={this.handleUpdatePost} />
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
