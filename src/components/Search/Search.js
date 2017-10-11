import React, { Component } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"


export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTag: null,
      posts: []

    }
    console.log(this.state.posts)
    this.handleSearchTag = this.handleSearchTag.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }



  handleSearchTag (e) {
    //let inputTag = this.props.match.params.searchTag
    this.setState ({
      searchTag: e.target.value

    })
  //this.handleSearchSubmit();
  }

    handleSearchSubmit (e) {
      e.preventDefault ()
      //var result=[]
        axios.get(`http://localhost:4000/tags/${this.state.searchTag}`)
        .then(response => {
        console.log(response.data);
        console.log(this.props.posts);
        var filtered=[];
          this.setState({
            tags:response.data,
            posts:[]
          })


          for (var i = 0; i < response.data.length; i++) {
              filtered.push(this.props.posts.filter((e) => e._id === response.data[i].post));
             }console.log(filtered);
             this.setState({
               posts:filtered
             })
             console.log(filtered)

        })
    }




  render (){

  return (
<div className = "main">
      <div>
          <form onSubmit={(e) => this.handleSearchSubmit(e)}>
          {/* <label>search</label> */}
          <input onChange={(e) => this.handleSearchTag(e)}/>

          <input type="submit" value="Search"/>
      </form>

      </div>

  </div>





  )}
}
