import React from 'react';
import ReactDOM from 'react-dom';
import router, { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

// Create a simple mockup of an email reader which uses React Router to handle routing. The app should have a sidebar which allows you to navigate between the inbox and the spam folder. Clicking on these should take you to a /inbox or /spam route. Each of the /inbox and /spam routes should display a list of emails. Clicking on an email should take you to a /email/:emailId route, which displays the email contents.

var EMAILS = {
  inbox: {
    0: {
      id: 0,
      from: "billg@microsoft.com",
      to: "TeamWoz@Woz.org",
      title: "Possible work opportunity",
      content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
    },
    1: {
      id: 1,
      from: "zuck@facebook.com",
      to: "TeamWoz@Woz.org",
      title: "Do you know PHP?",
      content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
    }
},
spam: {
    0: {
      id: 0,
      from: "ChEaPFl1ghTZ@hotmail.com",
      to: "TeamWoz@Woz.org",
      title: "WaNt CHEEp FlitZ",
      content: "Theyre CheEp"
    },
    1: {
      id: 1,
      from: "NiKEAIRJordanZ@hotmail.com",
      to: "TeamWoz@Woz.org",
      title: "JorDanz For SAle",
      content: "Theyre REELY CheEp"
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main-app">
        <h1>Email</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="side-bar">
      <div className="inbox">inbox</div>
      <div className="spam">spam</div>
    </div>
    )
  }
}

class EmailContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="email-container">
        email container here! doesn't have a route! its an index route
        <SideBar />
      </div>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        List area
      </div>
    )
  }
}

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/list" component={List} />
      <Route path="/sidebar" component={SideBar} />
      <IndexRoute component={EmailContainer} />
    </Route>
  </Router>
)

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('app'));
});
