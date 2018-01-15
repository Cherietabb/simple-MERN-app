import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

const styles = {
	root: {
		marginTop: '30px',
		paddingTop: '10px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	gridList: {
		marginTop: '30px',
		paddingTop: '20px',
		display: 'flex',
		flexDirection: 'row',
		position: 'static',
		width: 500,
		height: 450,
		overflowY: 'auto',
		justifyContent: 'space-around'
	},
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
					cellHeight={180}
					cols={3}
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