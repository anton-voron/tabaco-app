import React, {Component} from 'react';

import './OrderItemAdd.css';

class OrderItemAdd extends Component {
	render () {
		const {tasteName, onDeleateClick} = this.props;
		return (
			<section className="order-list-wrapper">
				<span className = "order-list-item-label">
					{tasteName}
				</span>
				<button type="button"
					className="btn btn-outline-danger btn-sm ico"
					onClick = {onDeleateClick}>
					<i className="fa fa-trash-o" />
				</button>
			</section>
		);
	};
}

export default OrderItemAdd;