import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey800, pink300, grey400, grey900, white, cyan700} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navigation from './components/BottomNavigation';
import Profiles from './components/Profiles';
import AddProfile from './components/add_profile';
import SideDrawer from './components/SideDrawer';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
injectTapEventPlugin();

class App extends Component {

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<BrowserRouter>
					<div>
						<SideDrawer />
						<Switch>
								<Route exact path="/" component={Profiles}/>
								<Route path="/add_profile" component={AddProfile} />
								<Route path="/register" component={Register} />
								<Route path="/login" component={Login} />
						</Switch>
						<Navigation />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: blueGrey800,
		primary2Color: cyan700,
		primary3Color: grey400,
		accent1Color: pink300,
		textColor: grey900,
		alternateTextColor: white,
		canvasColor: white
	},
	title: {
		fontSize: 30
	}});

export default App;
