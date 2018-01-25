import React, {Component} from 'react';
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
			username: '',
			password: ''
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

	handleCancel = (e) => {
		e.preventDefault();
		this.setState({
			email: '',
			password: ''
		})
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

							value={this.state.password}
							onChange={this.handleInputChange}
							errorText={this.state.password}>
							<input type="password"/>
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

