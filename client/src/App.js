import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {grey500, pink300} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BottomNavigation from './components/BottomNavigation';
import Profiles from './components/Profiles';
import './App.css';
injectTapEventPlugin();

class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div className="App">
					<div>
						<AppBarIcon />
					</div>
					<div>
						<Profiles />
					</div>
					<div>
						<BottomNavigation />
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

const AppBarIcon = () => (
	<AppBar
		title="Simple MERN App"
		showMenuIconButton={false}
	/>
);


const muiTheme = getMuiTheme({
	palette: {
		primary1Color: grey500,
		accent1Color: pink300
	},
	title: {
		fontSize: 30
	},
	appBar: {
		height: 100
	},

	iconStyleLeft: false

});


export default App;
