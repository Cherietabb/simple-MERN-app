import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

class SideDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: true
		};

		this.switchDrawer = this.switchDrawer.bind(this);
	}

	switchDrawer() {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		})
	}

	render() {
		return (
			<Drawer
				docked={true}
				open={this.props.drawerOpen}
				onRequestChange={this.props.switchDrawer}
			>
				<List>
					<Subheader>The MENU</Subheader>
				</List>
				
			</Drawer>
		);
	}
}

export default SideDrawer;