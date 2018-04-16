import React, {Component} from 'react';
import {Grid, PageHeader, Table, Button, Glyphicon} from 'react-bootstrap';

class EmployeeTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empList: window.employeeList
    };
  }

  render () {
    return (
      <Grid className='feedback-list'>
        <PageHeader>
          Employee List
        </PageHeader>

        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>LinkedIn ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.state.empList.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.linkedInId}</td>
                <td>
                  <span>
                    <Glyphicon glyph="pencil" />
                  </span>&nbsp;&nbsp;
                  <span>
                    <Glyphicon glyph="trash" />
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
      </Grid>
    );
  }
}

export default EmployeeTab;
