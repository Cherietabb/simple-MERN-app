import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {grey700, pink300} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BottomNavigation from './components/BottomNavigation';
import Profiles from './components/Profiles';
import AddProfile from './components/add_profile';
import './App.css';
injectTapEventPlugin();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		}
	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open
		})
	};

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<BrowserRouter>
					<div>
						<AppBar
							onLeftIconButtonClick={this.handleToggle}
							title="Simple MERN App"
						/>
						<Drawer
							docked={false}
							width={200}
							open={this.state.open}
							onRequestChange={(open) => this.setState({open})}>

							<AppBar title="Menu"/>
							<MenuItem><Link to="/add_profile">Add Profile</Link></MenuItem>
							<MenuItem>Coming Soon!</MenuItem>

						</Drawer>
						<Switch>
							<div>
								<Route exact path="/" component={Profiles}/>
								<Route path="/add_profile" component={AddProfile}/>
							</div>
						</Switch>
						<BottomNavigation />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

/*
 const AppBarIcon = () => (
 <AppBar
 title="Simple MERN App"
 showMenuIconButton={true}
 />
 );
 */

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: grey700,
		accent1Color: pink300
	},
	title: {
		fontSize: 30
	},
	appBar: {
		top: 0,
		height: 100
	},

	iconStyleLeft: false

});


export default App;
