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
              <NavItem componentClass='span'>
                <Link to="/">Feedback</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem componentClass='span'>
                <Link to="/responses">Responses</Link>
              </NavItem>
              <NavItem componentClass='span'>
                <Link to="/employees">Employees</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={FeedbackForm} />
        <Route exact path="/feedback" component={FeedbackForm} />
        <Route path={`/feedback/:empId`} component={FeedbackForm} />
        <Route exact path='/responses' component={FeedbackTab} />
        <Route path={`/responses/:empId`} component={FeedbackTab} />
        <Route path="/employees" component={EmployeeTab} />
      </div>
    );
  }
}

export default App;
