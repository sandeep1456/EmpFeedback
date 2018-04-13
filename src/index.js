import React from 'react';
import ReactDOM from 'react-dom';
import FeedbackForm from './feedbackFormBS/';
import FeedbackList from './feedbackList';
import EmployeeList from './employeeList';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

//FIXME
window.employeeList = [
  { id:1, empId:"1456", name: "Sandeep Kamble", linkedInId: "sandeeprkamble"},
  { id:2, empId:"1356", name: "Jeevan Patil", linkedInId: "jeevanpaatil"},
  { id:3, empId:"1786", name: "Sanjay Yadav", linkedInId: "sanjay-yadav-68701726"}
];

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
            <NavItem>
              <Link to="/employees">Employees</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/" component={FeedbackForm} />
      <Route path="/responses" component={FeedbackList} />
      <Route path="/employees" component={EmployeeList} />
    </div>
  </Router>
  , document.getElementById('root'));
