import React, { Component } from 'react';

import TabacoList from '../TabacoList/TabacoList.js';
import Tabaco from '../Tabaco/Tabaco.js';

import OrderHeader from '../OrderHeader/OrderHeader.js';
import OrderStatusFilter from '../OrderStatusFilter/OrderStatusFilter.js'
import OrderList from '../OrderList/OrderList.js';
import OrderAddForm from '../OrderAddForm/OrderAddForm.js';


import TabacoService from '../../service/TabacoService.js';
import TabacoData from '../../service/TabacoData.js';

import './App.css';
 


class App extends Component {
	constructor() {
		super();
		this.state = {
			typeData: [],
			tasteData: [],
			orderConfirm: [],
			orderList: [],
			filter: "all"
		}
	}

	tabacoService = new TabacoService();
	componentWillMount() {
		console.log(TabacoData);
		TabacoData.map((item) => {return this.tabacoService.createItem(item[0], item[1], item[2])})
	}
	orderId = 0;

	creacteOrderItem = (arr) => {
		const res = arr.map((item) => {return `${item.tasteId}: ${item.tasteName}`});
		return {
			tasteName: res.join(" + "),
			id: this.orderId++,
			done:false,
			important: false 
		}
	}

	toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((item) => item.id === id);
		const oldItem = arr[idx];
		const newItem = {
						...oldItem, 
						[propName]: !oldItem[propName]};
		return [
				...arr.slice(0, idx),
				newItem,
				...arr.slice(idx+1)
		];
	}

	onToggleDone = (id) => {
		this.setState(({orderList}) => {
			return {
				orderList: this.toggleProperty(orderList, id, "done")
			}
		});
	}

	onToggleImportant = (id) => {
		this.setState(({orderList}) => {
			return {
				orderList: this.toggleProperty(orderList, id, "important")
			}
		});
	}

	onDeleateConfirm = (id) => {
		this.setState(({orderConfirm}) => {
			const idx = orderConfirm.findIndex((el) => el.tasteId === id);
			const before = orderConfirm.slice(0, idx);
			const after = orderConfirm.slice(idx+1);
			const newArray = [...before, ...after];
			return {
				orderConfirm: newArray
			}
		});
		console.log(id);
	}

	onDeleateOrder = (id) => {
		this.setState(({orderList}) => {
			const idx = orderList.findIndex((el) => el.id === id);
			const before = orderList.slice(0, idx);
			const after = orderList.slice(idx+1);
			const newArray = [...before, ...after];
			return {
				orderList: newArray
			}
		});
	}

	filter = (arr, filter) => {
		switch (filter) {
			case "all": return arr;
			case "active": return arr.filter((el) => {
				return el.done === false;
			});
			case "done": return arr.filter((el) => {
				return el.done;
			});
		}
	}
	onFilterChange = (filter) => {
		this.setState({filter});
	}

	onLabelClick = (func, id) => {
		this.setState(({typeData, tasteData}) => {
			return {
				typeData: func(id),
				tasteData: [] 
				};
		});
	}

	onTypeClick = (func, id) => {
		this.setState(({tasteData}) => {
			return {
				tasteData: func(id) 
				};
		});
	}

	onTasteClick = (func, id) => {
		this.setState(({orderConfirm}) => {
			if(orderConfirm.length <= 2) {
				return {
					orderConfirm: [
						...orderConfirm.slice(),
						func(id)
						] 
					};
			} else ( console.log(" Warning the maximum quantity of tabaco per 1 customer is 3 taste"))	 	
		});
		console.log(this.state.orderConfirm)
	}

	submitOrder = (arr) => {
		const LabelString = this.creacteOrderItem(arr);
		console.log(LabelString);
		this.setState(({orderList}) => {
			const oldList = orderList.slice();
			return {
				orderList: [
					...oldList,
					LabelString
				]
			}
		});
		this.setState(({orderConfirm}) => {
			return {
				orderConfirm: []
			}
		});
	}

	render() {
		const {getTabacos, getType, getTaste, getItem} = this.tabacoService;
		const {typeData, tasteData, orderConfirm, orderList, filter} = this.state;
		const visibleTabaco = this.filter(orderList, filter)
		return (
			<section className = "row jumbotron">
				<div className="col-lg-4">
					<OrderHeader />
					<OrderStatusFilter 
					filter = {filter}
					onFilterChange = {this.onFilterChange}/>
					<OrderList 
					orderList = {visibleTabaco}
					onDeleateClick = {this.onDeleateOrder} 
					onToggleDone = {this.onToggleDone} 
					onToggleImportant ={this.onToggleImportant}/>
					<OrderAddForm  
					orderConfirm = {orderConfirm}
					onDeleateClick = {this.onDeleateConfirm}
					submitOrder= {this.submitOrder}/>
				</div>
				<div className="col-lg-8"> 
					<div className = "row">
						<TabacoList 
						getData = {getTabacos()} 
						itemId = "id" 
						prop = "company" 
						onTabacoClick = {this.onLabelClick}
						func = {getType}
						ElementView = {Tabaco}
						className = "col-md-4"/>

						<TabacoList 
						getData = {typeData} 
						itemId = "typeId" 
						prop = "typeName" 
						onTabacoClick = {this.onTypeClick}
						func = {getTaste}
						ElementView = {Tabaco}
						className = "col-md-4"/>

						<TabacoList 
						getData = {tasteData} 
						itemId = "tasteId" 
						prop = "tasteName" 
						onTabacoClick = {this.onTasteClick}
						func = {getItem}
						ElementView = {Tabaco}
						className = "col-md-4"/>		
					</div>
				</div>
			</section>
		);
	}
};

export default App;