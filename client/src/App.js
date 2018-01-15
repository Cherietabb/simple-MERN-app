import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey800, pink300} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BottomNavigation from './components/BottomNavigation';
import Profiles from './components/Profiles';
import AddProfile from './components/add_profile';
import SideDrawer from './components/SideDrawer';
import Register from './Register';
import './App.css';
injectTapEventPlugin();

class App extends Component {

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme} className="App">
				<BrowserRouter>
					<div>
						<SideDrawer />
						<Switch>
								<Route exact path="/" component={Profiles}/>
								<Route path="/add_profile" component={AddProfile} />
								<Route path="/register" component={Register} />
						</Switch>
						<BottomNavigation />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: blueGrey800,
		accent1Color: pink300
	},
	title: {
		fontSize: 30
	}});

export default App;
