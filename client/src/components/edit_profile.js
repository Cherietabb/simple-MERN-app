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

class EditProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {}
		}
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

	handleSubmit = (e) => {
		e.preventDefault();
		const err = this.validate();
		const {name, description, image} = this.state.profile;
		console.log(this.state);
		if (!err) {
			axios.put(`http://localhost:4000/profiles/edit/${this.props.profiles.id}`,
				{name, description, image})
				.then((response) => {
					this.setState({
						serverMessage: response,
						name: '',
						description: '',
						image: {}
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
							name="image"
							style={contentStyle.textField}
							value={this.state.image}
							onChange={(e) => this.handleInputChange(e)}>
							<input
								type="file"
								name="image"
								encType="multipart/form-data"
							/>
						</TextField>

						<RaisedButton
							label="Submit"
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

export default EditProfile;

