import React, {Component} from 'react';
import FeedbackList from '../feedbackList';
import EmployeeList from '../employeeList';
import {Grid, PageHeader, Row, Col} from 'react-bootstrap';

class FeedbackTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: window.employeeList,
      feedbacks: window.feedbackList,
      selectedEmpId: ''
    };

    this.onEmpSelect = this.onEmpSelect.bind(this);
  }

  onEmpSelect(selectedEmpId){
    this.setState({
      selectedEmpId: selectedEmpId
    })
  }

  render () {
    return (
      <Grid className='feedback-tab'>
        <PageHeader>
          Feedback List
        </PageHeader>
        <Row>
          <Col md={3}>
            <EmployeeList
              employees={this.state.employees}
              selectedEmpId={this.state.selectedEmpId}
              onEmpSelect={this.onEmpSelect}/>
          </Col>
          <Col md={9}>
            <FeedbackList feedbacks={this.state.feedbacks[this.state.selectedEmpId]}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default FeedbackTab;
