import React from 'react';

const Apps = (props) => {
	console.log(props);
	const generateServicesUI = (app) => {
		let services = [];
		app.forEach((service, index) => {
			services.push(<div className="header">{service.name}</div>);
		});

		return services;
	};

	var myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: 'dsgvwdu7t',
			uploadPreset: 'x0udwssk',
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
			}
		}
	);

	document.getElementById('upload_widget').addEventListener(
		'click',
		function () {
			myWidget.open();
		},
		false
	);

	const renderedApps =
		props.apps.length > 0 ? (
			props.apps.map((app, index) => {
				return (
					<div key={index} className="item">
						<div>{generateServicesUI(app)}</div>
					</div>
				);
			})
		) : (
			<></>
		);

	return (
		<div>
			<div className="ui relaxed divided list">{renderedApps}</div>
			<button id="upload_widget" className="cloudinary-button">
				Upload
			</button>
		</div>
	);
};

export default Apps;
