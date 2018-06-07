import React, {Component} from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red300, blue400} from 'material-ui/styles/colors';

const contentStyle = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textField: {
		display: 'block',
	},
	errorStyle: {
		color: red300
	},
	button: {
		display: 'flex',
		alignItems: 'right',
		width: '60px',
		backgroundColor: blue400,
		marginTop: '90px'
	}
};

class AddProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}, console.log(e.target.value));
	};

	validate = () => {
		let isError = false;
		const errors = {
			nameError: ''
		};
		if (!this.state.name) {
			isError = true;
			errors.nameError = "Name is required"
		}
		this.setState({
			...this.state,
			...errors
		});
		return isError;
	};

	handleSubmit = (e, file) => {
		e.preventDefault();
		const err = this.validate();
		const payload = {...this.state};

		if (!err) {
			return axios.post('http://localhost:4000/profiles/add_profile', payload)
				.then((response) => {
					this.setState({
						serverMessage: response,
						name: '',
						description: '',
					}, console.log('POST Response:', response))
				})
				.catch((error) => {
					console.log(error)
				});
		}
	};

	render() {
		return (
			<div>
				<RaisedButton
					label="Back"
					href="/"
					style={contentStyle.button}
				/>

				<div style={contentStyle.root}>
					<form>
						<TextField
							name="name"
							hintText="Name"
							floatingLabelText="Name"
							style={contentStyle.textField}
							value={this.state.name}
							onChange={this.handleInputChange}
							errorText={this.state.nameError}
						/>
						<TextField
							name="description"
							hintText="Description"
							floatingLabelText="Description"
							style={contentStyle.textField}
							value={this.state.description}
							onChange={this.handleInputChange}
						/>

						<h5>Add an Image</h5>

						<FileUpload


						/>

						<RaisedButton
							label="Submit"
							value="Submit"
							primary={true}
							style={contentStyle.textField}
							onClick={this.handleSubmit}
						>
						</RaisedButton>
					</form>
				</div>
			</div>
		)
	}
}

export default AddProfile;