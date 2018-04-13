import React from 'react';
import ReactDOM from 'react-dom';
import FeedbackForm from './feedbackFormBS/';
import FeedbackList from './feedbackList';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


ReactDOM.render(
  <Router>
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Ex-Mercatus</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <Link to="/">Feedback</Link>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Link to="/responses">Responses</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/" component={FeedbackForm} />
      <Route path="/responses" component={FeedbackList} />
    </div>
  </Router>
  , document.getElementById('root'));
