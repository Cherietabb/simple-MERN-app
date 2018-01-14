import React, {Component} from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const contentStyle = {
	display: 'flex',
	width: '80%',
	padding: '50px',
	justifyContent: 'center'
};

const textFieldStyle = {
	display: 'flex',
	flexDirection: 'column',
};


class AddProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: ''
		}
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	validate = () => {
		let isError = false;
		const errors = {
			name: ''
		};
		if (!this.state.name) {
			isError = true;
			errors.name = "Name is required"
		}
		this.setState({
			...this.state,
			...errors
		});

		return isError;
	}
	;

	handleSubmit = (e) => {
		e.preventDefault();
		const err = this.validate();
		const {name, description} = this.state;
		console.log(this.state);
		if (!err) {
			axios.post('http://localhost:4000/profiles/add_profile',
				{name, description})
				.then(function (response) {
					this.setState({
						name: '',
						description: ''
					});
					console.log('response:' + response);
				})
				.catch((error) => {
					console.log(error)
				});
		}
		

	};

	render() {
		return (
			<div style={contentStyle}>
				<form>
					<TextField
						name="name"
						hintText="Name"
						floatingLabelText="Name"
						style={textFieldStyle}
						value={this.state.name}
						onChange={this.handleInputChange}
						errorText={this.state.nameError}
					/>
					<TextField
						name="description"
						hintText="Description"
						floatingLabelText="description"
						style={textFieldStyle}
						value={this.state.description}
						onChange={this.handleInputChange}
					/>
					<RaisedButton
						label="Submit"
						primary={true}
						style={textFieldStyle}
						onClick={this.handleSubmit}
					>
					</RaisedButton>

				</form>
			</div>
		)
	}
}

export default AddProfile;