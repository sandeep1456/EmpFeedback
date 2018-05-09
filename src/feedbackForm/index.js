import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl,
    Button, PageHeader, Alert} from 'react-bootstrap';

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empId: this.props.match.params.empId,
      strongPoints: '',
      weakPoints: '',
      error:'',
      showSuccess: false,
      empList: window.employeeList
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onStrongPointsChange = this.onStrongPointsChange.bind(this);
    this.onWeakPointsChange = this.onWeakPointsChange.bind(this);
    this.clearErrorAlert = this.clearErrorAlert.bind(this);
    this.clearSuccessAlert = this.clearSuccessAlert.bind(this);
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

     //Clear error after 2 sec
     setTimeout(this.clearErrorAlert, 2000);
    } else {
      //TODO implement DB save
      let empFeedbacks = window.feedbackList[this.state.empId];
      if(!empFeedbacks){
        window.feedbackList[this.state.empId] = [];
      }
      window.feedbackList[this.state.empId].push(
       {
         empId: this.state.empId,
         strongPoints: this.state.strongPoints,
         weakPoints: this.state.weakPoints,
         submittedOn: new Date().getTime()
       }
     );

     this.setState({
       showSuccess : true,
       empId: '',
       strongPoints: '',
       weakPoints: ''
     });

     //Clear success after 2 sec
     setTimeout(this.clearSuccessAlert, 2000);
    }
  }

  clearSuccessAlert() {
    this.setState({
      showSuccess : false
    });
  }

  clearErrorAlert(){
    this.setState({
      error:''
    });
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

  componentDidMount(){
    console.log("mount");
    this.refreshLinkedInBatch();
  }

  componentDidUpdate(){
    console.log("update");
    this.refreshLinkedInBatch();
  }

  refreshLinkedInBatch(){
    try {
      // to render LinkedIn profile batch
      window.LIRenderAll();
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    let alertText = '';
    if (this.state.error) {
      alertText =
        <Alert bsStyle="danger" onDismiss={this.clearErrorAlert}>
          <p>{this.state.error}</p>
        </Alert>;
    }
    let linkedInLink = '';
    let linkedInProfile = '';
    if(this.state.empId){
      for (let i = 0 ; i<this.state.empList.length; i++) {
        let emp = this.state.empList[i];
        if(1*emp.id === 1*this.state.empId && emp.linkedInId) {
          let linkedInURL = `https://www.linkedin.com/in/${emp.linkedInId}`;
          linkedInLink = <Row>
            <Col md={12}><h4>If you wish you can endorse <b>{emp.name}</b> on LinkedIn, <a target='_blank' href={linkedInURL}> Click here. </a> </h4></Col>
          </Row>;
          linkedInProfile = <div key={new Date().getTime()} className="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity={emp.linkedInId}>
            <a className="LI-simple-link" href= {linkedInURL+'?trk=profile-badge'}>{emp.name}</a>
          </div>;
          break;
        }
      }
    }

    let successAlert = '';
    if(this.state.showSuccess){
      successAlert = <Alert bsStyle='success'>Your feedback has been recorded successfully, Thank You!</Alert>;
    }

    let formHtml = <form onSubmit={this.onSubmit}>
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
    </form>;

    if(linkedInProfile) {
      formHtml = <Row>
        <Col md={9}>{formHtml}</Col>
        <Col md={3}><div className='linkedin-batch'>{linkedInProfile}</div></Col>
      </Row>;
    }

    return (
      <Grid className='feedback-form' >
        <PageHeader>
          Feedback Form
        </PageHeader>
        {alertText}
        {successAlert}
        {formHtml}
      </Grid>
    );
  }
}

export default FeedbackForm;
