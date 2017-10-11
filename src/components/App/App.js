import React, { Component } from 'react';
import Post from '../Post/Post.js';
import Show from '../Show/Show.js';
import Add from '../Add/Add.js';
import Edit from '../Edit/Edit.js';
// import Materialize from 'materialize-css'
// import ReactBootstrap from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem  } from 'react-bootstrap';
import './App.css';

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
        posts: [],
        weather:"Sunny",
        temperature: "0"
    }
}

  componentWillMount () {
  axios.get("http://api.wunderground.com/api/e99e675866a9f62a/conditions/q/DC/Washington.json")
  .then(response=>{
      this.setState({
        weather: response.data.current_observation.icon_url,
        temperature :response.data.current_observation.temp_f
      })
  })

  axios.get("http://localhost:4000/")
  .then(response => {
    this.setState({
      posts: response.data
    })
  })
  .catch((err) => {
      console.log(err)
    })
}
  render() {
    return (
      <div>
        <Router>
          <div className='row'>
            {/* header */}
            <div className="header">

              {/* nav bar */}
              <nav className='navbar row black center-align'>

                {/* logo and home link */}
                <div className='col s1 red center-align'>
                  <Link to="/">GA Blog</Link>
                </div>

                {/* create new post */}
                <div className='col s2 red'>
                  <Link to="/postCreate">(+) New Post</Link>
                </div>
              </nav>

              <div className='background-image'>
              <h1 className='red-text'>Aha!</h1>
              <h4 className='white-text'>Share your Aha! moments at GA</h4>
             </div>


            </div>

            {/* posts */}
            <section className='col s9'>
              <Switch>

                {/* home page */}
                <Route exact path="/" render={() => (
                  <Post posts={this.state.posts} />
                )} />

                {/* create post */}
                <Route exact path="/postCreate" render={() => (
                  <Add />
                )} />

                {/* show single post */}
                <Route exact path="/:_id" render={(props) => (
                  <Show
                    {...props}
                    posts={this.state.posts}
                  />
                )} />

                {/* edit post */}
                <Route exact path="/:_id/updatePost" render={(props) => (
                  <Edit
                    {...props}
                    posts={this.state.posts}
                  />
                )} />

                {/* redirect to homepage */}
                <Route
                  path="/*"
                  render={() => (<Redirect to="/" />)}
                />
                )}/>
              </Switch>
            </section>

            {/* side nav */}
            <section className='col s3'>

              {/* local weather */}
              <div className="flexcolfeed">
                <div className="flexrow">
                  <img className="weatherIcon" src={this.state.weather} alt="weather-icon"/>
                  <div className="flexcol">
                    <label className="weatherInfo">{this.state.temperature}&#176;F</label>
                    <label>Washington, DC</label>
                  </div>
                </div>
              </div>

            </section>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
