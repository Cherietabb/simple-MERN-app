import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

const styles = {
	root: {
		marginTop: '50px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		display: 'flex',
		flexDirection: 'row',
		width: '80%',
		overflowY: 'auto',
		justifyContent: 'center'
	},
	gridTile: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		top: 0,
	}
};

class Profiles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profiles: []
		}
}
componentDidMount() {
		axios.get('http://localhost:4000/profiles')
			.then(response => {
				this.setState({
					profiles: response.data
				})
			}).catch((error) => {
			console.log(error)
		})
}

	renderList() {
		let profiles = this.state.profiles;
		return profiles.map((profile) => {
			return (
				<GridTile
					style={styles.gridTile}
					key={profile.name}
					title={profile.name}
					subtitle={<span>{profile.description}</span>}>
				</GridTile>
			)
		});
	}

	render() {
		return (
			<div style={styles.root}>
				<GridList
					cols={5}
					style={styles.gridList}
				>
					<Subheader>Profiles</Subheader>
					{this.renderList()}
				</GridList>
			</div>
		)
	}
}

export default Profiles;