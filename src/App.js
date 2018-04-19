import React, {Component} from 'react';
import FeedbackForm from './feedbackForm/';
import FeedbackTab from './feedbackTab';
import EmployeeTab from './employeeTab';
import {Route, Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class App extends Component {
  render () {
    return (
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
        <Route exact path="feedback" component={FeedbackForm} />
        <Route exact path={`/feedback/:empId`} component={FeedbackForm} />
        <Route path="/responses" component={FeedbackTab} />
        <Route path="/employees" component={EmployeeTab} />
      </div>
    );
  }
}

export default App;
