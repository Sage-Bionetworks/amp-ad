import React, { Component } from 'react';

class ShowHideSection extends Component {
	state = {
		isChecked: false	
	}
	
	getInitialState = () => {
		return {
			isChecked: false 
		};
	}	

	handleCheckboxChange = event => {
		this.setState({isChecked: event.target.checked});
	}

	toggleIsChecked = () => {
		this.setState({isChecked: !this.state.isChecked});
	}

	render(){
		return (
			<div className={this.state.isChecked === true ? 'row expand-section' : 'row expand-section hide'}>
				<div className={this.state.isChecked === true ? 'col-sm-10 content show' : 'col-sm-10 content hide'}>
					{this.props.content} 
				</div>
				<label className={this.state.isChecked === true ? 'col-sm-2 expand-icon minus' : 'col-sm-2 expand-icon plus'}>
					<input type="checkbox"
						className={this.state.isChecked === true ? 'icon minus' : 'icon plus'} 
						onChange={this.handleCheckboxChange} 
						checked={this.state.isChecked} 
					/>
				</label>
			</div>
		)
	}
}

export default ShowHideSection


