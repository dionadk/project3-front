import React, { Component } from 'react'
import axios from "axios";

import './Post.css'
import {
  Link
} from "react-router-dom"

export default class Post extends Component {
    constructor(props) {
    super(props)
    // this.props.handleSearchSubmit(e)
    // this.props.handleSearchTag(e)
    this.state = {
      posts: [],
      searchTag: null,
      tags: [],
      searchTag: '',
      searchedPosts: null,
      searched: false
    }
  }

  handleSearchTag(e) {
    this.setState({
      searchTag: e.target.value,
      searched: false
    })
  }

  handleSearchSubmit(e) {
    e.preventDefault()
    if (this.state.searchTag) {
      //var result=[]
      axios.get(`https://ga-aha.herokuapp.com/tags/${this.state.searchTag}`)
        .then(response => {
          this.setState({
            tags: response.data
          })
          var filtered = [];

          for (var i = 0; i < response.data.length; i++) {
            filtered.push(this.props.posts.filter((e) => e._id === response.data[i].post));
          }

          //  storing the results to an empty array (from an array within an array)
          let newFiltered = [].concat.apply([], filtered)

          this.setState({
            searchedPosts: newFiltered,
            searched: true
          })
        })
    }
  }
  render () {

  // sorts posts newest to oldest

  let displayedPosts = []
  if (this.state.searched) {
    displayedPosts = []
    this.state.searchedPosts.forEach(post => {displayedPosts.push(post)})

  } else {
    displayedPosts = []
    this.props.posts.forEach(post => {displayedPosts.push(post)})
  }


  // compares posts for .sort
  function compare(a, b) {
    if (a.createdAt > b.createdAt)
      return -1;
    if (a.createdAt < b.createdAt)
      return 1;
    return 0;
  }


  // new variable for sorted posts
  let sortedPosts = displayedPosts.sort(compare)
    return (
        <div className='clearSpace'>
          <div className='row'>
            <h2 className="postHeader col s6">Latest Aha Moments</h2>

            {/* search */}
            <div className="col s6 searchTag">
              <form onSubmit={(e) => this.handleSearchSubmit(e)}>
                <input className="col s6" onChange={(e) => this.handleSearchTag(e)} />
                <button className="col s5 red" type="submit">Filter Moments</button>
              </form>
            </div>
          </div>
          <div className='row'>
          {sortedPosts.map( post => {
              return (
                <Link to={`/project3-front/${post._id}`}>
                  <div className="blogPost col s12" key={post._id}>
                    <h3>{post.title}</h3>
                    <p> {post.createdAt.slice(0, 10)} </p>
                    <h6 className='col s12'>
                      {post.content}
                    </h6>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        )
      }
}
