import React, { Component } from 'react'

// import Material-UI classes
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {grey900} from 'material-ui/styles/colors';

class SideDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open
		})
	};


	render() {
		const rightButtons = (
			<div>
				<FlatButton
					label="register"
					style={buttonStyle}
				  href='/users/register'
				/>
				<FlatButton
					label="login"
					style={buttonStyle}
				  href='/users/login'
				/>
			</div>
		);

		return (
			<div>
				<AppBar
					style={contentStyles.appBar}
					onLeftIconButtonClick={this.handleToggle}
					title="Simple MERN App"
					iconElementRight={rightButtons}
				/>

				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					containerStyle={{height: 'calc(100% - 90px)', top: 90}}
					onRequestChange={(open) => this.setState({open})}>

					<List>
						<Subheader>The MENU</Subheader>
					</List>
					<MenuItem
						primaryText="Add Profile"
					  value="./add_profile"
					  href="/add_profile"
					/>
			</Drawer>
			</div>
		);
	}
}

const buttonStyle = {
	backgroundColor: '#ffffff',
	color: 'grey900',
	margin: '3px',
	onKeyboardFocus: {
		backgroundColor: '#ffffff',
		color: '#000000',
	}
};

const contentStyles = {
	appBar: {
		position: 'fixed',
		left: 0,
		top: 0,
		height: 90
	},
	iconStyleLeft: false
};

export default SideDrawer;