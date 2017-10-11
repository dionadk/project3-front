import React, { Component } from 'react';
import Post from '../Post/Post.js';
import Show from '../Show/Show.js';
import Add from '../Add/Add.js';
import Edit from '../Edit/Edit.js';
import Tags from '../Tags/Tags.js';
import ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
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
        temperature: "0",
        searchTag: null
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



handleSearchTag (e) {
  //let inputTag = this.props.match.params.searchTag
  this.setState ({
    searchTag: e.target.value

  })
//this.handleSearchSubmit();
}

  handleSearchSubmit (e) {
    console.log(this.state.posts)
    e.preventDefault ()
    //var result=[]
      axios.get(`http://localhost:4000/tags/${this.state.searchTag}`)
      .then(response => {
      // console.log(response.data);
        this.setState({
          tags:response.data
        })
        var filtered=[];

        for (var i = 0; i < response.data.length; i++) {
            filtered.push(this.state.posts.filter((e) => e._id === response.data[i].post));
           }

          let newFiltered = [].concat.apply([], filtered)

           console.log(filtered)
           console.log(newFiltered)

           this.setState({
             posts:newFiltered
           })
      })

  }
  render() {
    return (
      <Router>
          <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">GA Blog</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
              <NavItem eventKey={2}><Link to="/">Posts</Link></NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>WDI</MenuItem>
                <MenuItem eventKey={3.2}>UI/UX</MenuItem>
                <MenuItem eventKey={3.3}>Data Science</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>
          <div className="image_container">
            <div>
                <form onSubmit={(e) => this.handleSearchSubmit(e)}>
                {/* <label>search</label> */}
                <input onChange={(e) => this.handleSearchTag(e)}/>

                <input type="submit" value="Search"/>
            </form>
            </div>
          </div>

          <div className="flexrow">
            <div className="flexcol flexwrap">

            </div>
              <div className="flexcolfeed">
                <div className="flexrow">
                <img className="weatherIcon" src={this.state.weather} alt="weather-icon"/>
                <div className="flexcol">
                <label className="weatherInfo">{this.state.temperature}&#176;F</label>
                <label>Washington, DC</label>
                </div>
                </div>
              </div>

          </div>

            <div>
              <div className="nav-item"><Link to="/postCreate">(+) New Post</Link></div>

            </div>
            <div className="main">
              <Switch>
                <Route exact path="/" render={ () => (
                <Post posts={this.state.posts} />
                )}
              />

              <Route exact path="/postCreate" render={() => (
                <Add />
              )}/>

              <Route exact path="/:_id" render={ (props) => (
                <Show
                  {...props}
                  posts={this.state.posts}
                />
              )}/>
              <Route exact path="/:_id/updatePost" render={ (props) => (
               <Edit
                {...props}
                posts={this.state.posts}
              />
              )}/>


                <Route
                  path="/*"
                  render={ () => (<Redirect to="/" />)}
                />
              )}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
