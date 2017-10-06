import React, { Component } from 'react'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      date: '',
      content: ''
    }
    // this.handleCreateComment = this.handleCreateComment.bind(this)
  }
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
