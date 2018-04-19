import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';

//TODO fetch from DB for now using Global variable as data store
window.employeeList = [
  { id:1, empId:"1456", name: "Sandeep Kamble", linkedInId: "sandeeprkamble"},
  { id:2, empId:"1356", name: "Jeevan Patil", linkedInId: "jeevanpaatil"},
  { id:3, empId:"1786", name: "Sanjay Yadav", linkedInId: "sanjay-yadav-68701726"}
];

window.feedbackList = {
  "1": [
    { empId: "1", strongPoints: "Good at problem solving\nHard working", weakPoints: "Sometimes Lazy", submittedOn:"1523730600000" },
    { empId: "1", strongPoints: "Quick Learner", weakPoints: "NA", submittedOn:"1523876468671" }
  ],
  "2": [
    { empId: "2", strongPoints: "Good at everything\nLikes to learn new things", weakPoints: "NA", submittedOn:"1523876468671" }
  ],
  "3": [
    { empId: "3", strongPoints: "Techinically very strong\nSeasoned Engineer", weakPoints: "NA", submittedOn:"1523730600000" },
    { empId: "3", strongPoints: "Flexible team member", weakPoints: "Takes very long lunch break", submittedOn:"1523730600000" },
    { empId: "3", strongPoints: "Sanjay is adept and thorough in his development approach", weakPoints: "", submittedOn:"1523876468671" }
  ]
};

ReactDOM.render(
  <Router>
    <App/>
  </Router>
  , document.getElementById('root'));
