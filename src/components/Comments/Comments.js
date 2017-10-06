import React, { Component } from 'react'
import axios from 'axios'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      content: ''
    }
    this.handleCreateComment = this.handleCreateComment.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  handleCreateComment (e) {
    e.preventDefault()
    const name = e.target.name
    let newComment = []
    this.setState ({
      [name]: e.target.value,
      post: this.props.post._id
    })


  }

  handleSubmitComment(e) {
    e.preventDefault()
    console.log(this.state.name, this.state.content, this.state.post)
    axios.post("http://localhost:4000/createComment", {
        name: this.state.name,
        content: this.state.content,
        post: this.state.post
    })
    .then((response => console.log(response)))
    .catch((err) => {
      console.log(err)
    })

}
  render(){

    return(
      <div className="add">

        <h2> Add Comment To This Post </h2>
        <form onSubmit={this.handleSubmitComment}>
          <input name="name" type="text" placeholder="name" onChange={this.handleCreateComment} />
          <input name="content" type="text" placeholder="content" onChange={this.handleCreateComment} />
          <button type='submit'>Comment</button>
          {/* <input className="add btn" type="Submit" value="Comment" /> */}
        </form>

      </div>
    )
  }
}
