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
		</div>
	);
};

export default Apps;
