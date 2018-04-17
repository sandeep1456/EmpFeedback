import React, {Component} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl, Col,
      Alert, HelpBlock} from 'react-bootstrap';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee : this.props.empJSON,
      error: ''
    };

    this.onEmpIdChange = this.onEmpIdChange.bind(this);
    this.onEmpNameChange = this.onEmpNameChange.bind(this);
    this.onLinkedInIdChange = this.onLinkedInIdChange.bind(this);
    this.clearErrorAlert = this.clearErrorAlert.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmpIdChange(e){
    let empJSON = this.state.employee;
    empJSON.empId = e.target.value;
    this.setState({
      employee: empJSON
    });
  }

  onEmpNameChange(e){
    let empJSON = this.state.employee;
    empJSON.name = e.target.value;
    this.setState({
      employee: empJSON
    });
  }

  onLinkedInIdChange(e){
    let empJSON = this.state.employee;
    empJSON.linkedInId = e.target.value;
    this.setState({
      employee: empJSON
    });
  }

  onSubmit(e){
    e.preventDefault();
    let errorMsg = this.validateForm();
    if(errorMsg) {
      this.setState({
        error: errorMsg
      });

     //Clear error after 2 sec
     setTimeout(this.clearErrorAlert, 2000);
    } else {
      let empJSON = this.state.employee;
      if(!empJSON.id){
        empJSON.submittedOn = new Date().getTime();
      }
      this.props.onSubmit(this.state.employee);
      this.setState({
        employee: {
          empId: '',
          name: '',
          linkedInId: ''
        }
      });
    }
  }

  validateForm(){
    let errorMsg = '';
    if(!this.state.employee.empId) {
      errorMsg = 'Please select Employee ID.';
    } else if(!this.state.employee.name) {
      errorMsg = 'Please enter Employee Name';
    }
    return errorMsg;
  }

  clearErrorAlert(){
    this.setState({
      error: ''
    });
  }

  render () {
    let errorAlert = '';
    if(this.state.error) {
      errorAlert = <Alert bsStyle="danger" onDismiss={this.clearErrorAlert}>
        <p>{this.state.error}</p>
      </Alert>;
    }
    const modalAction = this.props.action;
    let modalBody = <form horizontal>
        <FieldGroup id="FcEmpId" type="text"
          label="Employee ID" placeholder="Enter employee ID"
          value={this.state.employee.empId}
          onChange={this.onEmpIdChange}/>
        <FieldGroup id="FcEmpName" type="text"
          label="Name" placeholder="Enter employee Name"
          value={this.state.employee.name}
          onChange={this.onEmpNameChange}/>
        <FieldGroup id="FcEmpLinkedInID" type="text"
          label="LinkedIn ID" placeholder="Enter employee's LinkedIn ID"
          help="Go to your LinkedIn profile and copy end part of URL. e.g. 'sandeeprkamble' is your LinkedIn ID if your URL is https://www.linkedin.com/in/sandeeprkamble/ "
          value={this.state.employee.linkedInId}
          onChange={this.onLinkedInIdChange}/>
      </form>;

    return (
      <Modal show={this.props.show} backdrop='static'
        className='employee-modal' onHide={this.props.closeEmplyeeForm}>
          <Modal.Header closeButton>
            <Modal.Title>{modalAction} Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorAlert}
            <br/>
            {modalBody}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeEmplyeeForm}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.onSubmit}>{modalAction}</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} md={3}>{label}</Col>
      <Col md={9}>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
      <br style={{clear:'both'}}/>
    </FormGroup>
  );
}

EmployeeForm.defaultProps = {
  empJSON: {
    empId: '',
    name: '',
    linkedInId: ''
  },
  action: 'Create'
}
export default EmployeeForm;
