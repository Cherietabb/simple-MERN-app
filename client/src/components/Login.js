import React, {Component} from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red300, blue400} from 'material-ui/styles/colors';


const contentStyle = {
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
	display: 'flex',
	flexDirection: 'right',
	width: '60px',
	backgroundColor: blue400,
	marginTop: '90px'
};

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	validate = () => {
		let isError = false;
		const errors = {
			emailError: '',
			username: '',
		};

		if (!this.state.email) {
			isError = true;
			errors.emailError = 'Email is required'
		} else if (!this.state.email === /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
			isError = true;
			errors.emailError = 'Please enter a valid email address'
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

	handleCancel = (e) => {
		e.preventDefault();
		this.setState({
			email: '',
			password: ''
		})
	};

	handleSubmit = e => {
		e.preventDefault();
		const payload = {...this.state};
		const err = this.validate();
		if(!err) {
			return axios.post('http://localhost:4000/users/login', payload, {
				headers: {
					'Content-type': 'Application/json',
					'Access-Control-Allow-Origin': '*'
				}
			})
				.then(response => {
					this.setState({
						serverResponse: response
					}, console.log('response: ', response))
				})
		}
	};

	render() {
		return (
			<div>
				<RaisedButton
					label="Back"
					href="/"
					style={buttonStyle}
				/>

				<div style={contentStyle}>
					<form>
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
							name="password"
							hintText="Password"
							floatingLabelText="Password"
							style={textFieldStyle}
							type="password"
							value={this.state.password}
							onChange={this.handleInputChange}
							errorText={this.state.password}>
						</TextField>

						<RaisedButton
							label="Login"
							primary={true}
							style={textFieldStyle}
							onClick={this.handleSubmit}
						>
						</RaisedButton>
						<br />
						<RaisedButton
							label="Clear Form"
							primary={false}
							style={textFieldStyle}
							onClick={this.handleCancel}
						>
						</RaisedButton>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;

