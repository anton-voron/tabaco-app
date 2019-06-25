import React, { Component } from 'react';


import './OrderAddForm.css';

import OrderItemAdd from '../OrderItemAdd/OrderItemAdd.js';


class OrderAddForm extends Component {
	constructor () {
		super();
		this.state = {
			numb: 0
		}
	}
	onSubmit = (evt) => {
		evt.preventDefault();
		if(this.props.orderConfirm.length > 0) {
			this.props.submitOrder(this.props.orderConfirm);
		}
		
	}

	render() {
		const {orderConfirm, onDeleateClick} = this.props;
		const taskLabel = orderConfirm.map((item) => {
			const {tasteId, tasteName} = item;
			return (
				<li key={tasteId}>
					<OrderItemAdd 
					onDeleateClick = {() => onDeleateClick(tasteId)}
					tasteName = {tasteName} />
				</li>
			)
		});
		return (
			<form className="item-add-form"
				onSubmit = {this.onSubmit}>
				<div className="wrapper d-flex">
					<ul className="confirm-list">
						<li className="order-item"> {taskLabel} </li>
					</ul>
				</div>
				<button className="btn btn-primary btn-lg btn-block"> 
					Add Item 
				</button>
			</form>
		);
	}
}

export default OrderAddForm;