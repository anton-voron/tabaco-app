import React from 'react';
import './OrderHeader.css';

const OrderHeader = ({toDo, done}) => {
	return (
		<div className="order-header d-flex">
			<h2>Order List</h2>
      		<h4>{toDo} more to do, {done} done</h4>	
		</div>
	);
}

export default OrderHeader;