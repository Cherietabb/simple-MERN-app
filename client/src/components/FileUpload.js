import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const styles = {
	preview: {
		width: '100%',
		height: '100%',
	}
};

const handleDropRejected = (...args) => console.log('reject', args);

class FileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			preview: null,
		};
		this.handleDrop = this.handleDrop.bind(this)
	}

	handleDrop([{preview}], files, event) {
		let file = event.target.files[0];
		this.setState({
			preview,
		}, console.log('Preview image', preview));

		axios.get('http://localhost:4000/profiles/upload', {
				filename: file.name,
				filetype: file.type
			})
			.then((response) => {
				let signedUrl = response.data.url;
				let options = {
					headers: {
						'Content-type': file.type
					}
				};
				return axios.put(signedUrl, file, options);
			})
			.then((response) => {
				console.log(response)
			})
	}

	render() {
		const {preview} = this.state;
		return (
			<div>
				<Dropzone
					multiple={false}
					accept="image/jpeg, image/png, image.jpg"
					name="file"
					value={this.state.file}
					onDrop={this.handleDrop}
					onDropRejected={ handleDropRejected }
				>
					{ preview &&
					<img src={ preview } alt="preview" style={styles.preview}/>
					}

					<p>{preview ? '' : 'Drag a image or click to upload an image...'}</p>

				</Dropzone>
				<br/>
			</div>
		)
	}
}

export default FileUpload;