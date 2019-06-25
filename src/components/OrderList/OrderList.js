import React from 'react';
import OrderItem from '../OrderItem/OrderItem.js';
import './OrderList.css';


const TaskList = ({orderList, onDeleateClick, onToggleDone, onToggleImportant}) => {
	const orderArr = orderList.map((tabaco) => {
		const {id, ...rest} = tabaco;
		return (
		<li key={id}>
				<OrderItem 
					{...rest}
					onToggleDone={() => onToggleDone(id)}
					onToggleImportant = {() => onToggleImportant(id)}
					onDeleateClick = {() => onDeleateClick(id)} 
				/>
		</li>
	)
	});		
	return (
		<ul className="order-list">
			<li className="order-item"> {orderArr} </li>
		</ul>
	);
}
export default TaskList;