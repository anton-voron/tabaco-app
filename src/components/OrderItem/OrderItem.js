import React, {Component} from 'react';
import './OrderItem.css';

class OrderItem extends Component {



	render() {
		const { tasteName, onDeleateClick, 
				onToggleDone, done,
				onToggleImportant, important } = this.props;
		let classNames = "order-list-wrapper";

		 if (done) {
		     classNames += " done";
		   }
		 if(important) {
		 	classNames+= " important";
		 }
		return (
			<section className={classNames}>
				<span 
					className = "item-label"
					onClick = {onToggleDone}>
					{tasteName}
				</span>
				<div className="button-wrapper">
					<button type="button"
					className="btn btn-outline-success btn-sm ico"
					onClick = {onToggleImportant}>
					<i className="fa fa-exclamation"/>
				</button>
				<button type="button"
					className="btn btn-outline-danger btn-sm ico"
					onClick = {onDeleateClick}>
					<i className="fa fa-trash-o" />
				</button>
				</div>
			</section>
		);
	}
}

export default OrderItem;