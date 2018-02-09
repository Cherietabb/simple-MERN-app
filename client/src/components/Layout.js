import React, { Component } from 'react'

// import Material-UI classes
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

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
					style={contentStyles.button}
				  href='/register'
				/>
				<FlatButton
					label="login"
					style={contentStyles.button}
				  href='/login'
				/>
			</div>
		);

		return (
			<div style={contentStyles.root}>
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
					containerStyle={{height: 'calc(100% - 64px)', top: 64}}
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

const contentStyles = {
	appBar: {
		position: 'fixed',
		left: 0,
		top: 0,
		// marginBottom: '80px'
	},
	button: {
		backgroundColor: '#ECEFF1',
		margin: '3px',
		ripple: {
			background: '#ECEFF1',
			opacity: !('#ECEFF1' || '#78909C') ? 0.1 : 0.16,
		},
	},
};

export default SideDrawer;