import React, {Component} from 'react';
import {Grid, PageHeader} from 'react-bootstrap';

class FeedbackList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbacks: []
    };
  }

  render () {
    return (
      <Grid className='feedback-list'>
        <PageHeader>
          Feedback List
        </PageHeader>
      </Grid>
    );
  }
}

export default FeedbackList;
