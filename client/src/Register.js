import React, {Component} from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red300, blue400} from 'material-ui/styles/colors';


const contentStyle = {
	marginTop: '5%',
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	width: '80%',
	justifyContent: 'center'
};

const textFieldStyle = {
	display: 'flex',
	flexDirection: 'column',
	errorStyle: {
		color: red300
	},
};

const buttonStyle = {
	backgroundColor: blue400,
	margin: '3px'
};


class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			username: '',
			password: ''
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
		const {name, email, username, password} = this.state;
		if (!err) {
			axios.post('http://localhost:4000/users/register', {name, email, username, password})
				.then((response) => {
					this.setState({
						name: '',
						email: '',
						username: '',
						password: ''
					})
				})
				.catch((error) => {
					console.log(error);
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
						name="email"
						hintText="Email"
						floatingLabelText="Email"
						style={textFieldStyle}
						value={this.state.email}
						onChange={this.handleInputChange}
						errorText={this.state.emailError}
					/>

					<TextField
						name="username"
						hintText="Username"
						floatingLabelText="Username"
						style={textFieldStyle}
						value={this.state.username}
						onChange={this.handleInputChange}
						errorText={this.state.usernameError}
					/>

					<TextField
						name="password"
						hintText="Password"
						floatingLabelText="Password"
						style={textFieldStyle}

						value={this.state.password}
						onChange={this.handleInputChange}
						errorText={this.state.password}>
						<input type="password"/>
					</TextField>
					<RaisedButton
						label="Submit"
						primary={true}
						style={textFieldStyle}
						onClick={this.handleSubmit}
					>
					</RaisedButton>

				</form>
			</div>
		);
	}
}

export default Register;

