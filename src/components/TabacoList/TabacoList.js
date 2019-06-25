import React  from 'react';

import './TabacoList.css';
 

const TabacoList = (props) => {
	const {getData, itemId, prop, onTabacoClick, func, ElementView} = props;
	const renderItems = getData.map((item) => {
		const id = item[itemId],
		label = item[prop];
		return (
			<li className="tabaco-item"
			key={id}>
				<ElementView 
				value = {label}
				onTabacoClick = {() => onTabacoClick(func, id)}/>
			</li>
		);
	});
	return (
		<ul className="tabaco-list">
			{renderItems}
		</ul>
	);	
};


export default TabacoList;