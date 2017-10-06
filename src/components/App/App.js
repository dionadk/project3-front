import React, { Component } from 'react';
import Post from '../Post/Post.js';
import Comments from '../Comments/Comments.js';

// import './App.css';
import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"


class App extends Component {
  constructor(props) {
    super (props)
    this.state = {
      posts: [
    {"userName": "Diona", "title": "More on React", "date": "10/05/2017", "content": "The more practice the better you will be. Try youtube tutorials at the begenning to get a deep knowledge"},
    {"userName": "Aaliyah", "title": "DEsign Ideas", "date": "09/05/2017", "content": "The more practice the better you will be. Try youtube tutorials at the begenning to get a deep knowledge"},
    {"userName": "Max", "title": "Html and css", "date": "08/05/2017", "content": "The more practice the better you will be. Try youtube tutorials at the begenning to get a deep knowledge"},
    {"userName": "Drew", "title": "Redux", "date": "10/01/2017", "content": "The more practice the better you will be. Try youtube tutorials at the begenning to get a deep knowledge"},
    {"userName": "Netsue", "title": "More on JS", "date": "08/05/2017", "content": "The more practice the better you will be. Try youtube tutorials at the begenning to get a deep knowledge"},
    {"userName": "Melley", "title": "More on React", "date": "07/05/2017", "content": "The more practice the better you will be. Try youtube tutorials at the begenning to get a deep knowledge"}
    ]}
  }


  render() {
    return (

      <Router>
          <div>
            <div className="nav">
              <div className="nav-item"><span className="nav-logo">GA Posts</span></div>
              <div className="nav-item"><Link to="/">Posts</Link></div>

            </div>
            <div className="main">
              <Switch>
                <Route exact path="/" render={ () => (
                <Post posts={this.state.posts} />
                )}
                />

                <Route
                  path="/*"
                  render={ () => (<Redirect to="/" />)}
                />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
