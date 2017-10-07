import React, { Component } from 'react';
import Comments from '../Comments/Comments.js';
import Tags from '../Tags/Tags.js';
import axios from 'axios';


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
      <div>
      <h1>Posts</h1>

            <p>Name:{this.state.post.name}</p>
            <p>Title:{this.state.post.title}</p>
            <p>Content:{this.state.post.content}</p>
            <p>Date:{this.state.post.createdAt}</p>

            <div>
              <Comments post={this.state.post}/>
              <h2>Comments</h2>
                <ul>
                  {this.state.comments.map(comment => {
                    return (<li key={comment._id}>{comment.content}</li>)
                  })}
                </ul>
            </div>
            <div>
              <Tags post={this.state.post}/>
              <h2>Tags</h2>
                <ul>
                  {this.state.tags.map(tag => {
                    return (<li key={tag._id}>{tag.name}</li>)
                  })}
                </ul>
            </div>




      </div>
    )

  }
}
