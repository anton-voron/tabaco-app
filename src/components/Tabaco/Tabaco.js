import React, { Component } from 'react';

import './Tabaco.css';
 

class Tabaco extends Component {

	render() {
		const {value, onTabacoClick} = this.props;
		return (
			<section>
				<input type ="button"
				className="tabaco-label btn btn-danger"
				value = {value}
				onClick = {onTabacoClick} />
			</section>
		);
	}
};

export default Tabaco;