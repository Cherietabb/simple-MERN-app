import React, {Component} from 'react';
import Card, {CardActions, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {grey200} from 'material-ui/styles/colors';

import axios from 'axios';
// import moraineLake from '../images/moraineLake.jpg';

const styles = {
	container: {
		margin: '90px',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	card: {
		top: 0,
		margin: '10px',
		maxWidth: 345
	},
	media: {
		width: '100%'
	},
	cardText: {
		padding: '5px',
		backgroundColor: grey200
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
				<Card
					key={profile.name}
					style={styles.card}
				>
					<CardMedia
						style={styles.media}
					>
						{/*<img src={moraineLake} alt="Moraine Lake"/>*/}
						<img src={profile.image} alt='' />
					</CardMedia>
					<div style={styles.cardText}>
						<span className="card-title">{profile.name}</span>
						<CardText>
							{profile.description}
						</CardText>
					</div>
					<CardActions>
						<FlatButton label="Edit"/>
						<FlatButton label="Delete"/>
					</CardActions>
				</Card>
			)
		});
	}

	render() {
		return (
			<div>
				<h2 style={{marginTop: '80px'}}>Profiles</h2>
				<div style={styles.container}>
					{this.renderList()}
				</div>

			</div>
		)
	}
}

export default Profiles;