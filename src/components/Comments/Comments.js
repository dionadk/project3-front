import React, { Component } from 'react'
import axios from 'axios'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      date: '',
      content: ''
    }
    this.handleCreateComment = this.handleCreateComment.bind(this)
  }

  handleCreateComment (e) {
    e.preventDefault()
    const name = e.target.name
    let newPost = []
    this.setState ({
      [name]: e.target.value
    })


  }

//   handleSubmitComment(e) {
//     e.preventDefault()
//     axios.post(`http://localhost:4000/show/${this.state.post._id}`, {
//
//         name: this.state.name,
//         title: this.state.title,
//         content: this.state.content,
//         date: this.state.date
//
//     })
//     .then((response) => {
//       this.setState({
//         posts: response.data
//       })})
//     .catch((err) => {
//       console.log(err)
//     })
//
// }
  render(){

    return(
      <div className="add">

        <h2> Add Comment To This Post </h2>
        <form onSubmit={this.handleSubmitComment}>
          <input name="name" type="text" placeholder="name" onChange={this.handleCreateComment} />
          <input name="date" type="text" placeholder="date" onChange={this.handleCreateComment} />
          <input name="content" type="text" placeholder="content" onChange={this.handleCreateComment} />

          <input className="add btn" type="Submit" value="Comment" />
        </form>

      </div>
    )
  }
}
