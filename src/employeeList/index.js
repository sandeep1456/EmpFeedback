import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class EmployeeList extends Component {

  onClickEmp(id){
    this.props.onEmpSelect(id);
  }

  render () {
    return (
      <ListGroup>
        {this.props.employees.map(((emp, i) => (
          <ListGroupItem key={i}
            className = {1*this.props.selectedEmpId === 1*emp.id ? 'active' : ''}
            onClick = {this.onClickEmp.bind(this, emp.id)}>{emp.name}</ListGroupItem>
        )))}
      </ListGroup>
    );
  }
}

export default EmployeeList;
