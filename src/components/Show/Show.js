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
        created: '',
        comments: [],
        tags: []
      }

    }

    // fetching the newly created posts,comments and tags

    componentDidMount () {
      let selectedPost = this.props.match.params._id
      axios.get(`http://localhost:4000/${selectedPost}`)
           .then(response => this.setState({
             post: response.data
            }))
           .catch((err) => console.log(err))

           .then(() => {
             this.setState({created: this.state.post.createdAt.slice(0, 10)})
             console.log(this.state.created) 
           })

      axios.get(`http://localhost:4000/${selectedPost}/comments`)
        .then(response => this.setState({comments: response.data}))
        .catch((err) => console.log(err))

      axios.get(`http://localhost:4000/${selectedPost}/tags`)
        .then(response => this.setState({tags: response.data}))
        .catch((err) => console.log(err))
    }
    

  render () {
    return (
      <div className='row'>

        {/* post */}
        <section className='col s12'>
          <h3>{this.state.post.title}</h3>
          <p>By: {this.state.post.name}</p>
          <p>Created On: {this.state.created}</p>
]         <p>{this.state.post.content}</p>
          <Link to={`/${this.state.post._id}/updatePost`}>(edit)</Link>
        </section>

        {/* comments */}
        <section className='col s8'>
          <Comments post={this.state.post}/>
            <ul>
              {this.state.comments.map(comment => {
                return (
                  <div class='comment'key={comment._id}>
                    <p>{comment.content}</p>
                    <h6>by: {comment.name}</h6>
                  </div>)
              })}
            </ul>
        </section>
        
        {/* tags */}
        <section className='col s4'>
          <h5 className='center-align'>Tags</h5>
          {this.state.tags.map(tag => {
            return (<li key={tag._id}>{tag.name}</li>)
          })}
          <Tags post={this.state.post}/>
        </section>
      </div>






      // <div className="flexContainer defaultView">
      //     <div className="flexSubContainer">
      //         <div className="flexRow">
      //           <div className="flexColumn">
      //             <label className="headerTitle">


      //             </label>
      //             <label className="headerSubTitle">
      //             </label>
      //           </div>
      //         </div>
      //           <div className="contentColumn flexRow">
      //           </div>

      //       <div className="flexRow">

      //           <div className="commentColumn flexColumn">
      //           </div>
      //       </div>
      //     </div>

      //     <div className="flexSubContainer">
      //       <h4>Tags</h4>
      //     <ul>
      //     </ul>

      //     </div>
      // </div>
    )
  }
}
