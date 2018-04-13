import React, {Component} from 'react';
import FeedbackForm from './feedbackFormBS/';
import {Grid} from 'react-bootstrap';

class App extends Component {
  render () {
    return (
      <Grid fluid={true}>
        <FeedbackForm name="Sandeep"/>;
      </Grid>);
  }
}

export default App;
