import React, { Component } from 'react';
import Post from '../Post/Post.js';
import Show from '../Show/Show.js';
import Add from '../Add/Add.js';
import Edit from '../Edit/Edit.js';
import LargeHeader from '../LargeHeader/LargeHeader.js';
// import Materialize from 'materialize-css'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem  } from 'react-bootstrap';
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
    // current date
    var today = new Date()
    // converting the date format to month and date
    var m_names = new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var date =  m_names[curr_month] + ' ' + curr_date;
    this.state = {
        posts: [],
        weather:"Sunny",
        temperature: "0",
        date: date
    }
  }

  componentWillMount () {
    axios.get("https://api.wunderground.com/api/e99e675866a9f62a/conditions/q/DC/Washington.json")
    .then(response=>{
        this.setState({
          weather: response.data.current_observation.icon_url,
          temperature :response.data.current_observation.temp_f
        })
    })

    axios.get("https://peaceful-river-87816.herokuapp.com/")
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
            <div>
              {/* header */}
              <div className="header">

                {/* nav bar */}
                <nav className='navbar row black center-align'>

                  {/* logo and home link */}
                  <div className='col s1 red center-align'>
                    <Link to="/project3-front">GA Blog v8</Link>
                  </div>

                  {/* create new post */}
                  <div className='col s2 red'>
                    <Link to="/project3-front/postCreate">(+) New Aha</Link>
                  </div>


                </nav>
                <Switch>
                  {/* display large photo header on homepage */}
                  <Route exact path='/project3-front' render={() => (
                    <LargeHeader />
                  )} />

                </Switch>
              </div>
            </div>

            {/* posts */}
            <section className='col s9 mainSection'>
              <Switch>

                {/* home page */}
                <Route exact path="/project3-front" render={() => (
                  <Post
                    posts={this.state.posts}
                    handleSearchSubmit={this.handleSearchSubmit}
                    handleSearchTag={this.handleSearchTag}
                     />
                )} />

                {/* create post */}
                <Route exact path="/project3-front/postCreate" render={() => (
                  <Add />
                )} />

                {/* show single post */}
                <Route exact path="/project3-front/:_id" render={(props) => (
                  <Show
                    {...props}
                    posts={this.state.posts}
                  />
                )} />

                {/* edit post */}
                <Route exact path="/project3-front/:_id/updatePost" render={(props) => (
                  <Edit
                    {...props}
                    posts={this.state.posts}
                  />
                )} />

                {/* redirect to homepage */}
                <Route
                  path="/project3-front/*" render={() => (<Redirect to="/project3-front" />)}
                />
                  )}/>
              </Switch>
            </section>

            {/* side nav */}
            <section className='col s3 mainSection'>
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

              {/* Upcoming Events */}
                <div className="row">
                  <h5 className="eventStyle">Upcoming Events</h5>
                </div>
                <div className="row currDate">
                    <h4>{this.state.date}</h4>
                    <p>Tech and Advertising with Twitter</p>
                    <p>Digital Marketing info Session</p>
                </div>
                <div className="row currDate">
                    <p>Adobe Indesign Bootcamp</p>
                    <p>SQL Bootcamp</p>
                    <p>Intro to R</p>
                </div>
            </section>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
