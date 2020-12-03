import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Helper from '../services/Helper';

const Services = () => {
	const [services, setServices] = useState([]);

	const getServices = () => {
		axios
			.get(Helper.getURL() + '/getservices')
			.then((res) => {
				console.log(res.data);
				setServices([...res.data]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const setImage = async (imageUrl, name) => {
		console.log(imageUrl);
		console.log(name);
		await axios
			.post(Helper.getURL() + '/setimageurl', {
				imageUrl: imageUrl,
				type: 'Services',
				name: name,
			})
			.then((res) => {
				console.log(res);
				getServices();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getServices();
	}, []);

	const renderedServices =
		services.length > 0 ? (
			services.map((c) => {
				return (
					<div key={c.name} className="card">
						<div className="content">
							{c.imageUrl !== '' ? (
								<img src={c.imageUrl} width="75%" height="150" alt="service" />
							) : (
								<img
									src="https://semantic-ui.com/images/wireframe/image.png"
									width="75%"
									height="150"
									alt="placeholder"
								/>
							)}
							<br />
							<br />
							<div className="header">{c.name}</div>
							<div className="meta">{c.thingID}</div>
							<div className="description">
								{c.description === ''
									? 'No description provided.'
									: c.description}
							</div>
							<button
								id="upload_widget"
								onClick={() => {
									window.cloudinary
										.createUploadWidget(
											{
												cloudName: 'dsgvwdu7t',
												uploadPreset: 'x0udwssk',
											},
											(error, result) => {
												if (!error && result && result.event === 'success') {
													c.imageUrl = result.info.url;
													console.log(
														'Done! Here is the image info: ',
														result.info
													);
													setImage(result.info.url, c.name);
												}
											}
										)
										.open();
								}}
								className="ui button"
							>
								{c.imageUrl !== '' ? 'Update Image' : 'Upload Image'}
							</button>
						</div>
					</div>
				);
			})
		) : (
			<></>
		);

	return (
		<div>
			<button className="ui button" onClick={getServices}>
				Get New Services
			</button>
			<br />
			<br />
			<div className="ui cards" style={{ paddingLeft: '5%' }}>
				{renderedServices}
			</div>
		</div>
	);
};

export default Services;
