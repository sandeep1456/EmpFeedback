import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl,
   HelpBlock, Button, PageHeader, Alert} from 'react-bootstrap';

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empId: '',
      strongPoints: '',
      weakPoints: '',
      error:'',
      empList: [
        { id:1, name: "Sandeep Kamble", linkedInId: "sandeeprkamble"},
        { id:2, name: "Jeevan Patil", linkedInId: "jeevanpaatil"},
        { id:3, name: "Sanjay Yadav", linkedInId: "sanjay-yadav-68701726"}
      ]
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onStrongPointsChange = this.onStrongPointsChange.bind(this);
    this.onWeakPointsChange = this.onWeakPointsChange.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNameChange(e) {
    this.setState({
      empId: e.target.value
    });
  }

  onStrongPointsChange(e) {
    this.setState({
      strongPoints: e.target.value
    })
  }

  onWeakPointsChange(e) {
    this.setState({
      weakPoints: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    let errorMsg = this.validateForm();
    if(errorMsg) {
      this.setState({
        error: errorMsg
      });
    } else {
      console.log(this.state);
    }
  }

  validateForm(){
    let errorMsg = '';
    if(!this.state.empId) {
      errorMsg = 'Please select Employee.';
    } else if(!this.state.strongPoints) {
      errorMsg = 'Please enter atleast 1 strong point.';
    } else if(!this.state.weakPoints) {
      errorMsg = 'Please enter atleast 1 weak point.';
    }
    return errorMsg;
  }

  handleDismiss(){
    this.setState({
      error:''
    });
  }

  render () {
    let alertText = '';
    if (this.state.error) {
      alertText =
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <p>{this.state.error}</p>
        </Alert>;
    }
    let linkedInLink = '';
    if(this.state.empId){
      for (let i = 0 ; i<this.state.empList.length; i++) {
        let emp = this.state.empList[i];
        if(emp.id == this.state.empId) {
          let linkedInURL = `https://www.linkedin.com/in/${emp.linkedInId}`;
          linkedInLink = <Row>
            <Col md={12}><h4>If you wish you can endorse <b>{emp.name}</b> on LinkedIn, <a target='_blank' href={linkedInURL}> Click here. </a> </h4></Col>
          </Row>;
          break;
        }
      }
    }
    return (
      <Grid className='feedback-form' >
        <PageHeader>
          Feedback Form
        </PageHeader>

        {alertText}

        <form onSubmit={this.onSubmit}>
          <FormGroup controlId="formControlsNameSelect">
            <ControlLabel>Employee Name</ControlLabel>
            <FormControl componentClass="select"
              value={this.state.empId}
              onChange={this.onNameChange}
              placeholder="Select Employee">
              <option value={-1}>Select Employee</option>
              {this.state.empList.map((emp, i) => (
                <option key={i} value={emp.id}>{emp.name}</option>
              ))}
            </FormControl>
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup controlId="formControlsStrong">
                <ControlLabel>Strong Points</ControlLabel>
                <FormControl componentClass="textarea"
                  value={this.state.strongPoints}
                  onChange={this.onStrongPointsChange}
                  placeholder="Enter Strong Points"
                  style={{height:'300px'}}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup controlId="formControlsWeak">
                <ControlLabel>Weak Points</ControlLabel>
                <FormControl componentClass="textarea"
                  value={this.state.weakPoints}
                  onChange={this.onWeakPointsChange}
                  placeholder="Enter Weak Points"
                  style={{height:'300px'}} />
              </FormGroup>
            </Col>
          </Row>
          {linkedInLink}
          <Button className='pull-right' bsStyle='primary' type='submit'> Submit Feedback</Button>
        </form>


      </Grid>
    );
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default FeedbackForm;
