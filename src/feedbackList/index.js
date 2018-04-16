import React, {Component} from 'react';
import {Grid, Row, Col, Panel, Alert} from 'react-bootstrap';

class FeedbackList extends Component {

  render () {
    let feedbacksHTML = '';
    if(this.props.feedbacks) {
      feedbacksHTML = this.props.feedbacks.map(((feedback, i) => (
        <Panel key={feedback.empId+i}>
           <Panel.Heading>
             <Panel.Title componentClass="h3"><strong>{i+1}</strong>. Submitted at: {new Date(1*feedback.submittedOn).toLocaleDateString()}</Panel.Title>
           </Panel.Heading>
           <Panel.Body>
             <Grid fluid={true}>
              <Row>
                <Col md={6}>
                  <h5>Strong points</h5>
                  <section>{feedback.strongPoints}</section>
                </Col>
                <Col md={6}>
                  <h5>Weak points</h5>
                  <section>{feedback.weakPoints}</section>
                </Col>
              </Row>
             </Grid>
           </Panel.Body>
         </Panel>
      )));
    } else {
      feedbacksHTML = <Alert bsStyle="info">Please select an Employee.</Alert>;
    }

    return (
      <Grid className='feedback-list' fluid={true}>
        {feedbacksHTML}
      </Grid>
    );
  }
}

export default FeedbackList;
