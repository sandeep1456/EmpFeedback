import React, {Component} from 'react';
import EmployeeForm from '../employeeForm';
import {Grid, PageHeader, Table, Button, Glyphicon,
        Row, Col} from 'react-bootstrap';

class EmployeeTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empList: window.employeeList,
      showEmpForm: false,
      selectedEmployee: null
    };

    this.closeEmplyeeForm = this.closeEmplyeeForm.bind(this);
  }

  openEmplyeeForm(selectedEmployee=null){
    this.setState({
      showEmpForm: true,
      selectedEmployee: selectedEmployee
    });
  }

  closeEmplyeeForm(){
    this.setState({
      showEmpForm: false,
      selectedEmployee: null
    });
  }

  editEmployee(employee){
    this.openEmplyeeForm(employee);
  }

  render () {
    return (
      <Grid className='employee-tab'>
        <PageHeader>
          Employee List
        </PageHeader>

        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <Button className='pull-right' bsStyle='primary'
              onClick={()=>this.openEmplyeeForm()}>Add Employee</Button>
          </Col>
        </Row>
        <br/>

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
                    <Glyphicon glyph="pencil"
                      onClick = {this.editEmployee.bind(this, emp)}/>
                  </span>&nbsp;&nbsp;
                  <span>
                    <Glyphicon glyph="trash" />
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>

      <EmployeeForm show={this.state.showEmpForm}
        employee={this.state.selectedEmployee}
        closeEmplyeeForm={this.closeEmplyeeForm}/>
      </Grid>
    );
  }
}

export default EmployeeTab;
