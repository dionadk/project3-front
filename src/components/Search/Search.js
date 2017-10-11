import React, { Component } from 'react'
import axios from 'axios'


export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchTag: null,

    }
    this.handleSearchTag = this.handleSearchTag.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }
  handleSearchTag (e) {
    //let inputTag = this.props.match.params.searchTag
    this.setState ({
      searchTag: e.target.value

    })

console.log(this.state.searchTag)

  }

  handleSearchSubmit (e) {
    e.preventDefault (e)
    //var result=[]
    console.log(`http://localhost:4000/tags/${this.state.searchTag}`);
      axios.get(`http://localhost:4000/tags/${this.state.searchTag}`)
      .then(response => {
      console.log(response.data);
        this.setState({
          tags:response.data
        })
      })
    axios.get("http://localhost:4000/tags/{this.state.searchTag}")



  }


  render (){
  return (
      <div>
          <form onSubmit={(e) => this.handleSearchSubmit(e)}>
          {/* <label>search</label> */}
          <input onChange={(e) => this.handleSearchTag(e)}/>

          <input type="submit" value="Search"/>
      </form>
      </div>





  )}
}
