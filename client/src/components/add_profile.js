import React, {Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';
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


class AddProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			image: {}
		}
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}, console.log(e.target.value));
	};

	handleImageChange = (e) => {
		this.setState({
			[e.target.name]: e.target.files[0],
		}, console.log('File:', e.target.files[0]))
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

	handleSubmit = (e) => {
		e.preventDefault();
		const err = this.validate();
		const payload = {...this.state};
		const body = new FormData();
		body.append('image', payload.image.name);
		const options = { content: body };
		if (!err) {
			axios.post('http://localhost:4000/profiles/add_profile', payload, options, {
					headers: {
						'accept': 'application/json',
						'Accept-Language': 'en-US,en;q=0.8',
						'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
					}
				})
				.then((response) => {
					console.log('Info Sent:', body);
					this.setState({
						serverMessage: response,
						name: '',
						description: '',
						image: {}
					})
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
					style={buttonStyle}
				/>

				<div style={contentStyle}>
					<form id="myForm"
					>
						<TextField
							name="name"
							hintText="Name"
							floatingLabelText="Name"
							style={textFieldStyle}
							value={this.state.name}
							onChange={(e) => this.handleInputChange(e)}
							errorText={this.state.nameError}
						/>
						<TextField
							name="description"
							hintText="Description"
							floatingLabelText="Description"
							style={textFieldStyle}
							value={this.state.description}
							onChange={(e) => this.handleInputChange(e)}
						/>
						<TextField
							id="image"
							style={textFieldStyle}
							value={this.state.image}
							onChange={(e) => this.handleImageChange(e)}
						>
							<input
								name="image"
								type="file"
								encType="multipart/form-data"
								accept="multipart/form-data"
							/>
						</TextField>

						<RaisedButton
							label="Submit"
							primary={true}
							style={textFieldStyle}
							onClick={(e) => this.handleSubmit(e)}
						>
						</RaisedButton>
					</form>
				</div>

			</div>
		)
	}
}

export default AddProfile;