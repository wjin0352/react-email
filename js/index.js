import React from 'react';
import ReactDOM from 'react-dom';
import router, { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

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
        <h1>Email Service</h1>
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
        <Link to={'/inbox'}>
          <div className="sidebar-inbox">
            <li>inbox</li>
          </div>
        </Link>
        <Link to={'/spam'}>
          <div className="sidebar-spam" >
            <li>spam</li>
          </div>
        </Link>
      </div>
    )
  }
}

// INBOX
class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inbox: EMAILS.inbox };
  }
  render() {
    var inbox = this.state.inbox;
    var id, title, to, content, from_user;

    var results = Object.keys(inbox).map(function(item) {
      var obj = inbox[item];
      content = obj.content;
      id = obj.id;
      title = obj.title;
      to = obj.to;
      from_user = obj.from;

      return(
        <div className="inbox" key={id}>
          <h4>From: {from_user}</h4>
          <Link to={"/inbox/" + id}>
            <h4>Title: {title}</h4>
          </Link>
          <hr></hr>
          <br/>
        </div>
      )
    });

    return (
      <div className="inbox-results"><h3>Inbox</h3>{results}</div>
    )
  }
}

// SPAM
class Spam extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spam: EMAILS.spam }

  }
  render() {
    var spam = this.state.spam;
    var id, title, to, content, from_user;

    var results = Object.keys(spam).map(function(item) {
      var obj = spam[item];
      content = obj.content;
      id = obj.id;
      title = obj.title;
      to = obj.to;
      from_user = obj.from;
      console.log(id);

      return (
        <div className="spam" key={id}>
          <h4>From: {from_user}</h4>
          <Link to={"/spam/" + id}>
            <h4>Title: {title}</h4>
          </Link>
          <hr></hr>
          <br/>
        </div>
      )
    });

    return (
      <div className="spam-results"><h3>Spam</h3>{results}</div>
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
        <li>welcome user:</li>
        <SideBar />
      </div>
    )
  }
}

class EmailInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inbox: EMAILS.inbox }
  }
  render() {
    var id = this.props.params.id;
    var email = this.state.inbox[id];

    var content = email.content;
    var title = email.title;
    var to = email.to;
    var from_inbox = email.from;

    var results = (
      <div className="spam" >
        <h4>To: {to}</h4>
        <h4>From: {from_inbox}</h4>
        <h4>Title: {title}</h4>
        <p>Content: {content}</p>
        <li className="user-id">user id: {id}</li>
        <hr></hr>
        <br/>
      </div>
    )
    return (
      <div>{results}</div>
    )
  }
}


class EmailSpam extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spam: EMAILS.spam }
  }

  render(props) {
    var id = this.props.params.id;
    var email = this.state.spam[id];

    var content = email.content;
    var title = email.title;
    var to = email.to;
    var from_spam = email.from;

    var results = (
      <div className="spam" >
        <h4>To: {to}</h4>
        <h4>From: {from_spam}</h4>
        <h4>Title: {title}</h4>
        <p>Content: {content}</p>
        <li className="user-id">user id: {id}</li>
        <hr></hr>
        <br/>
      </div>
    )
    return (
      <div>{results}</div>
    )
  }
}

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/inbox" component={Inbox} />
      <Route path="/spam" component={Spam} />
      <Route path="/sidebar" component={SideBar} />
      <Route path="/inbox/:id" component={EmailInbox} />
      <Route path="/spam/:id" component={EmailSpam} />
      <IndexRoute component={EmailContainer} />
    </Route>
  </Router>
)

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('app'));
});
