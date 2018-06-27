import React, {Component} from 'react';
import Card, {CardActions, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {grey200} from 'material-ui/styles/colors';

import axios from 'axios';


class Profiles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profiles: []
		};
	}

	componentDidMount() {
		const _this = this;
		axios.get('http://localhost:4000/profiles')
			.then(response => {
				_this.setState({
					profiles: response.data
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	renderList() {
		const {profiles} = this.state;
		if (!profiles) return <p>Loading...</p>;

		console.log('Profiles:', profiles);
		return profiles.map((profile) => {
			return (
				<Card
					data={profiles}
					key={profile._id}
					style={styles.card}
				>
					<CardMedia
						style={styles.media}
					>
						<img src={'https://s3.us-east-2.amazonaws.com/simple-mern-app/' + profile.imageUrl} style={styles.img} alt="profile"/>
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
		maxWidth: 300
	},
	media: {
		width: '100%'
	},
	img: {
		width: '300px',
		height: '225px'
	},
	cardText: {
		padding: '5px',
		backgroundColor: grey200
	}
};

export default Profiles;