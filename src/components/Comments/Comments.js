import React, { Component } from 'react'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      date: '',
      content: ''
    }
  }
  render(){

    return(
      <div className="add">

        <h2> Add Comment To This Post </h2>
        <form onSubmit={this.handleSubmitComment}>
          <input name="name" type="text" placeholder="name" onChange={this.handleCreateComment} />
          <input name="date" type="text" placeholder="date" onChange={this.handleCreateComment} />
          <input name="content" type="text" placeholder="content" onChange={this.handleCreateComment} />

          <input className="add btn" type="Submit" value="Add" />
        </form>

      </div>
    )
  }
}

//   render () {
//     return (
//     <div className="comment">
//         <div className="actor">
//         {this.props.name}
//         </div>
//         <div className="content">
//           {this.props.content}
//         </div>
//         <div className="date">
//           {this.props.date}
//         </div>
//   </div>
//   )}
//
// }
