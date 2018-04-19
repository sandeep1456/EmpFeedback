import React, {Component} from 'react';
import {Modal, Button, FormGroup, FormControl, Col,
      Alert, HelpBlock} from 'react-bootstrap';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.clearErrorAlert = this.clearErrorAlert.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      let empJSON = this.props.empJSON;
      if(!empJSON.id){
        empJSON.submittedOn = new Date().getTime();
      }
      empJSON.empId = this.empId.value;
      empJSON.name = this.name.value;
      empJSON.linkedInId = this.linkedInId.value;
      this.props.onSubmit(empJSON);
    }
  }

  validateForm(){
    let errorMsg = '';
    if(!this.empId.value) {
      errorMsg = 'Please select Employee ID.';
    } else if(!this.name.value) {
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
    let modalBody = <form horizontal='true'>
        <FieldGroup id="FcEmpId" type="text"
          label="Employee ID" placeholder="Enter employee ID"
          value={this.props.empJSON.empId}
          onChange={this.props.onEmpIdChange}
          inputRef = {(input) => this.empId = input}
          />
        <FieldGroup id="FcEmpName" type="text"
          label="Name" placeholder="Enter employee Name"
          value={this.props.empJSON.name}
          onChange={this.props.onEmpNameChange}
          inputRef = {(input) => this.name = input}
          />
        <FieldGroup id="FcEmpLinkedInID" type="text"
          label="LinkedIn ID" placeholder="Enter employee's LinkedIn ID"
          help="Go to your LinkedIn profile and copy end part of URL. e.g. 'sandeeprkamble' is your LinkedIn ID if your URL is https://www.linkedin.com/in/sandeeprkamble/ "
          value={this.props.empJSON.linkedInId}
          onChange={this.props.onLinkedInIdChange}
          inputRef = {(input) => this.linkedInId = input}
          />
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
      <Col md={3}>{label}</Col>
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
