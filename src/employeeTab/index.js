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
    this.onEmpIdChange = this.onEmpIdChange.bind(this);
    this.onEmpNameChange = this.onEmpNameChange.bind(this);
    this.onLinkedInIdChange = this.onLinkedInIdChange.bind(this);
  }

  openEmplyeeForm(selectedEmployee=undefined, empFormAction='Create'){
    let empJSON = undefined;
    if(selectedEmployee){
      //empJSON = Object.assign({}, selectedEmployee);
      //empJSON = JSON.parse(JSON.stringify(selectedEmployee));
      empJSON = {...selectedEmployee};
      // empJSON.id = selectedEmployee.id;
      // empJSON.empId = selectedEmployee.empId;
      // empJSON.name = selectedEmployee.name;
      // empJSON.linkedInId = selectedEmployee.linkedInId;
    }

    this.setState({
      showEmpForm: true,
      selectedEmployee: empJSON,
      empFormAction: empFormAction
    });
  }

  // componentWillUpdate(nextProps, nextState){
  //   console.log(nextState);
  // }

  closeEmplyeeForm(){
    this.setState({
      showEmpForm: false,
      selectedEmployee: undefined
    });
  }

  editEmployee(employee){
    this.openEmplyeeForm(employee, 'Edit');
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
      empFormAction: null,
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

  submitFeedback(employee){
    this.props.history.push(`/feedback/${employee.id}`);
  }

  onEmpIdChange(e){
    let empJSON = this.state.selectedEmployee || {};
    empJSON.empId = e.target.value;
    this.setState({
      selectedEmployee: empJSON
    });
  }

  onEmpNameChange(e){
    let empJSON = this.state.selectedEmployee || {};
    empJSON.name = e.target.value;
    this.setState({
      selectedEmployee: empJSON
    });
  }

  onLinkedInIdChange(e){
    let empJSON = this.state.selectedEmployee || {};
    empJSON.linkedInId = e.target.value;
    this.setState({
      selectedEmployee: empJSON
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
                  </span>&nbsp;&nbsp;
                  <span title='Submit feedback'>
                    <Glyphicon glyph="edit"
                      onClick = {this.submitFeedback.bind(this, emp)}/>
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>

      <EmployeeForm show={this.state.showEmpForm}
        empJSON={this.state.selectedEmployee}
        action={this.state.empFormAction}
        key={this.state.empFormAction === 'Edit' ? this.state.selectedEmployee.id : 0}
        closeEmplyeeForm={this.closeEmplyeeForm}
        onSubmit={this.saveEmployee}
        onEmpIdChange={this.onEmpIdChange}
        onEmpNameChange={this.onEmpNameChange}
        onLinkedInIdChange={this.onLinkedInIdChange}
        />
      </Grid>
    );
  }
}

export default EmployeeTab;
