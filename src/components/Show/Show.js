import React, { Component } from 'react';
import Comments from '../Comments/Comments.js';
import Tags from '../Tags/Tags.js';
import axios from 'axios';
import './Show.css';
import {
  Link
} from "react-router-dom"


export default class Show extends Component {
    constructor(props){
      super(props)
    // looking for unique id to loop through and find the exact match
      let selectedPost = this.props.match.params._id
      let singlePost = props.posts.filter(item => item._id === selectedPost)
      this.state = {
        post: [],
        comments: [],
        tags: []
      }

    }

    // fetching the newly created posts,comments and tags

    componentDidMount () {
      let selectedPost = this.props.match.params._id
      axios.get(`http://localhost:4000/${selectedPost}`)
           .then(response => this.setState({post: response.data}))
           .catch((err) => console.log(err))

           axios.get(`http://localhost:4000/${selectedPost}/comments`)
                .then(response => this.setState({comments: response.data}))
                .catch((err) => console.log(err))

                axios.get(`http://localhost:4000/${selectedPost}/tags`)
                     .then(response => this.setState({tags: response.data}))
                     .catch((err) => console.log(err))
      }

  render () {
    return (
      <div className="flexContainer defaultView">
          <div className="flexSubContainer">
              <div className="flexRow">
                <div className="flexColumn">
                  <label className="headerTitle">

                      <p>{this.state.post.title}</p>

                      <Link to={`/${this.state.post._id}/updatePost`}>(edit)</Link>
                  </label>
                  <label className="headerSubTitle">
                    <p>By: {this.state.post.name}</p>
                    <p>On: {this.state.post.createdAt}</p>
                  </label>
                </div>
              </div>
                <div className="contentColumn flexRow">
                  <p>{this.state.post.content}</p>
                </div>

            <div className="flexRow">

                <div className="commentColumn flexColumn">
                  <Comments post={this.state.post}/>
                    <ul>
                      {this.state.comments.map(comment => {
                        return (<li key={comment._id}>{comment.content} by: {comment.name}</li>)
                      })}
                    </ul>
                </div>
            </div>
          </div>

          <div className="flexSubContainer">
            <h4>Tags</h4>
          <ul>
            {this.state.tags.map(tag => {
              return (<li key={tag._id}>{tag.name}</li>)
            })}
          </ul>

        <Tags post={this.state.post}/>
          </div>
      </div>
    )
  }
}
