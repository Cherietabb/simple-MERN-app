import React, {Component} from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red300, blue400} from 'material-ui/styles/colors';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			username: '',
			password: null
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleInputChange = e => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleCancel = (e) => {
		e.preventDefault();
		this.setState({
			name: '',
			email: '',
			username: '',
			password: ''
		})
	};


	validate = () => {
		let isError = false;
		const errors = {
			nameError: '',
			emailError: '',
			usernameError: '',
			passwordError: ''
		};
		if (!this.state.name) {
			isError = true;
			errors.nameError = "Name is required"
		}
		if (!this.state.email) {
			isError = true;
			errors.emailError = 'Email is required'
		} else if (!this.state.email === /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
			isError = true;
			errors.emailError = 'Please enter a valid email address'
		}
		if (!this.state.username) {
			isError = true;
			errors.usernameError = 'Username is required'
		}
		if (!this.state.password) {
			isError = true;
			errors.passwordError = 'Password is required'
		}

		this.setState({
			...this.state,
			...errors
		});
		return isError;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const err = this.validate();
		const payload = {...this.state};
		console.log('Payload:', payload);

		console.log('Will something go wrong?');
		console.log(this.state.email);
		console.log('Something is very wrong!');
		return axios.post('http://localhost:4000/users/register', payload, {
				headers: {
					'Content-type': 'Application/json'
				}
			})
			.then((response) => {
				this.setState({
					serverMessage: response,
					name: '',
					email: '',
					username: '',
					password: ''
				}, console.log('response: ', response))
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div>
				<RaisedButton
					label="Back"
					href="/"
					style={contentStyle.raisedButton}
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
							name="email"
							hintText="Email"
							floatingLabelText="Email"
							style={contentStyle.textField}
							value={this.state.email}
							onChange={this.handleInputChange}
							errorText={this.state.emailError}
						/>

						<TextField
							name="username"
							hintText="Username"
							floatingLabelText="Username"
							style={contentStyle.textField}
							value={this.state.username}
							onChange={this.handleInputChange}
							errorText={this.state.usernameError}
						/>

						<TextField
							name="password"
							hintText="Password"
							floatingLabelText="Password"
							style={contentStyle.textField}

							value={this.state.password}
							onChange={this.handleInputChange}
							errorText={this.state.password}>
							<input type="password"/>
						</TextField>

						<RaisedButton
							label="Submit"
							primary={true}
							style={contentStyle.textField}
							onClick={this.handleSubmit}
						>
						</RaisedButton>
						<br />
						<RaisedButton
							label="Clear Form"
							primary={false}
							style={contentStyle.textField}
							onClick={this.handleCancel}
						>
						</RaisedButton>

					</form>
				</div>
			</div>
		);
	}
}

const contentStyle = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '80%',
		justifyContent: 'center'
	},
	textField: {
		display: 'flex',
		flexDirection: 'column',
	},
	errorStyle: {
		color: red300
	},
	raisedButton: {
		width: '60px',
		backgroundColor: blue400,
		marginTop: '90px'
	}
};

export default Register;

