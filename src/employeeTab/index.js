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
      selectedEmployee: undefined
    };

    this.closeEmplyeeForm = this.closeEmplyeeForm.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }

  openEmplyeeForm(selectedEmployee=undefined){
    this.setState({
      showEmpForm: true,
      selectedEmployee: selectedEmployee
    });
  }

  closeEmplyeeForm(){
    this.setState({
      showEmpForm: false,
      selectedEmployee: undefined
    });
  }

  editEmployee(employee){
    this.openEmplyeeForm(employee);
  }

  saveEmployee(employee){
    if(employee.id){
      for(let i=0; i<window.employeeList.length; i++) {
        let emp = window.employeeList[i];
        if(employee.id === emp.id) {
          window.employeeList[i] = employee;
        }
      }
    } else {
      employee.id = window.employeeList.length+1;
      window.employeeList.push(employee);
    }

    this.setState({
      empList: window.employeeList,
      showEmpForm: false,
      selectedEmployee: undefined
    });
  }

  deleteEmployee(employee){
    for(let i=0; i<window.employeeList.length; i++) {
      let emp = window.employeeList[i];
      if(employee.id === emp.id) {
        window.employeeList.splice(i, 1);
      }
    }

    this.setState({
      empList: window.employeeList
    });
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
                  <span title='Edit Employee'>
                    <Glyphicon glyph="pencil"
                      onClick = {this.editEmployee.bind(this, emp)}/>
                  </span>&nbsp;&nbsp;
                  <span title='Delete Employee'>
                    <Glyphicon glyph="trash"
                      onClick = {this.deleteEmployee.bind(this, emp)}/>
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>

      <EmployeeForm show={this.state.showEmpForm}
        empJSON={this.state.selectedEmployee}
        action={this.state.selectedEmployee ? 'Edit' : 'Create'}
        key={this.state.selectedEmployee ? this.state.selectedEmployee.id : 0}
        closeEmplyeeForm={this.closeEmplyeeForm}
        onSubmit={this.saveEmployee}/>
      </Grid>
    );
  }
}

export default EmployeeTab;
