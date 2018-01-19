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


class AddProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			image: ''
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
		const {name, description, image} = this.state;
		if (!err) {
			axios.post('http://localhost:4000/profiles/add_profile',
				{name, description, image})
				.then((response) => {
					this.setState({
						serverMessage: response,
						name: '',
						description: '',
						image: ''
					})
				})
/*
				.catch((error) => {
				console.log(error)
			});
*/
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
							floatingLabelText="Description"
							style={textFieldStyle}
							value={this.state.description}
							onChange={this.handleInputChange}
						/>
						<TextField
							name="image"
							hintText="Upload Image"
							floatingLabelText="Upload Image"
							style={textFieldStyle}
							value={this.state.image}
							onChange={this.handleInputChange}>
							<input
								type="file"
							  encType="multipart/form-data"
							/>
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

			</div>
		)
	}
}

export default AddProfile;