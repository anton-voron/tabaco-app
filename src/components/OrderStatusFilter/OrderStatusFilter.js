import React, { Component } from 'react';

import './OrderStatusFilter.css';

class OrderStatusFilter extends Component {
    buttons = [
      { name: 'all', label: 'All'},
      { name: 'active', label: 'Active'},
      { name: 'done', label: 'Done'}
    ];

  render () {
    const {filter, onFilterChange} = this.props;
    const  buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      const clazz =  isActive ? 'btn-info btn-sm' : 'btn-outline-secondary btn-sm';
      return (
          <button type="button"
                  className= {`btn ${clazz}`}           
                  key = {name}
                  onClick={() => onFilterChange(name)}>
                  {label}
          </button>
        );
    });
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}


export default OrderStatusFilter;