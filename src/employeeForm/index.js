import React, {Component} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee : this.props.empJSON
    };

    this.onEmpIdChange = this.onEmpIdChange.bind(this);
    this.onEmpNameChange = this.onEmpNameChange.bind(this);
    this.onLinkedInIdChange = this.onLinkedInIdChange.bind(this);
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
    let empJSON = this.state.employee;
    empJSON.submittedOn = new Date().getTime();
    this.props.onSubmit(this.state.employee);
    
  }

  render () {
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
      <Col md={9}><FormControl {...props} /></Col>
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
