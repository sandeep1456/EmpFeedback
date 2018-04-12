import React, {Component} from 'react';

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      strongPoints: '',
      weakPoints: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onStrongPointsChange = this.onStrongPointsChange.bind(this);
    this.onWeakPointsChange = this.onWeakPointsChange.bind(this);
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
    console.log(this.state);
  }

  render () {
    return (
      <div className='feedback-block'>
        <h1> Emplyee Feedback Form </h1>
        <form onSubmit={this.onSubmit}>
          <label>Name </label>
          <input type='text' value={this.state.name} onChange={this.onNameChange}/>
          <br/>
          <br style={{clear:'both'}}/>
          <div className='left'>
            <label>Strong Points </label>
            <textarea value={this.state.strongPoints} onChange={this.onStrongPointsChange}/>
          </div>
          <div className='right'>
            <label>Weak Points </label>
            <textarea value={this.state.weakPoints} onChange={this.onWeakPointsChange}/>
          </div>
          <br style={{clear:'both'}}/>
          <br/>
          <button type='submit'> Submit </button>
        </form>
      </div>
    );
  }
}

export default FeedbackForm;
