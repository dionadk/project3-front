import React, { Component } from 'react'
import axios from 'axios'
import './Tags.css'


export default class Tags extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''

    }
    this.handleCreateTag = this.handleCreateTag.bind(this)
    this.handleSubmitTag = this.handleSubmitTag.bind(this)
  }

  handleCreateTag (e) {
    e.preventDefault()
    const name = e.target.name
    let newtag = []
    this.setState ({
      [name]: e.target.value,
      post: this.props.post._id
    })


  }

  handleSubmitTag(e) {
    e.preventDefault()

    axios.post("http://localhost:4000/createTag", {
        name: this.state.name,
        post: this.state.post
    })
    .then((response => console.log(response)))
    .catch((err) => {
      console.log(err)
    })

}
  render(){

    return(
      <div className="addTag">

        <form onSubmit={this.handleSubmitTag}>
          <input className="tagInput" name="name" type="text" placeholder="Add a tag" onChange={this.handleCreateTag} />

          <button type='submit'>+</button>
        </form>

      </div>
    )
  }
}
