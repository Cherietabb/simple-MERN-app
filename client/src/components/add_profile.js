import React, {Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';
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
		const data = new FormData();
		const payload = {...this.state};
		const imagedata = document.querySelector('input[type="file"]').files[0];
		console.log('Imagedata:', imagedata);
		data.append("image", imagedata);
		console.log('Data:', data);
		if (!err) {
			axios.post('http://localhost:4000/profiles/add_profile', payload, {
				body: data
				})
				.then((response) => {
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
					style={contentStyle.button}
				/>

				<div style={contentStyle.root}>
					<form id="myForm"
					>
						<TextField
							name="name"
							hintText="Name"
							floatingLabelText="Name"
							style={contentStyle.textField}
							value={this.state.name}
							onChange={(e) => this.handleInputChange(e)}
							errorText={this.state.nameError}
						/>
						<TextField
							name="description"
							hintText="Description"
							floatingLabelText="Description"
							style={contentStyle.textField}
							value={this.state.description}
							onChange={(e) => this.handleInputChange(e)}
						/>
						<TextField
							id="image"
							value={this.state.image}
							style={contentStyle.textField}
						>
							<input
								name="image"
								type="file"
								encType="multipart/form-data"
								accept="multipart/form-data"
								onChange={(e) => this.handleImageChange(e)}

							/>
						</TextField>

						<RaisedButton
							label="Submit"
							value="Submit"
							primary={true}
							style={contentStyle.textField}
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