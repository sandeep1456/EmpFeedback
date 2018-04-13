import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl,
   HelpBlock, Button, PageHeader, Alert} from 'react-bootstrap';

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      strongPoints: '',
      weakPoints: '',
      error:''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onStrongPointsChange = this.onStrongPointsChange.bind(this);
    this.onWeakPointsChange = this.onWeakPointsChange.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
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
    let isValid = this.validateForm();
    if(isValid) {
      console.log(this.state);
    }
  }

  validateForm(){
    if(!this.state.name) {
      this.setState({
        error: 'Please enter Employee Name.'
      });
    } else if(!this.state.strongPoints) {
      this.setState({
        error: 'Please enter atleast 1 strong point.'
      });
    } else if(!this.state.weakPoints) {
      this.setState({
        error: 'Please enter atleast 1 weak point.'
      });
    }
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
    return (
      <Grid className='feedback-form' >
        <PageHeader>
          Feedback
        </PageHeader>

        {alertText}

        <form onSubmit={this.onSubmit}>
          <FieldGroup
            id="formControlsName"
            type="text"
            label="Employee Name"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Enter Employee Name"
          />
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
          <Button className='right' bsStyle='primary' type='submit'> Submit Feedback</Button>
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
