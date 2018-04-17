import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };


    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();

  }



  render () {

    const modalAction = this.props.employee ? "Edit" : "Create";
    return (
      <Modal show={this.props.show} backdrop='static'
        onHide={this.props.closeEmplyeeForm}>
          <Modal.Header closeButton>
            <Modal.Title>{modalAction} Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            THIS IS EMPLOYEE FORM
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeEmplyeeForm}>Cancel</Button>
            <Button bsStyle="primary">{modalAction}</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

// function FieldGroup({ id, label, help, ...props }) {
//   return (
//     <FormGroup controlId={id}>
//       <ControlLabel>{label}</ControlLabel>
//       <FormControl {...props} />
//       {help && <HelpBlock>{help}</HelpBlock>}
//     </FormGroup>
//   );
// }

export default EmployeeForm;
