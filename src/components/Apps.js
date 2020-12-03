import React, { useState, useEffect } from 'react';

const Apps = ({ addApp, permApps, removePermApp }) => {
	const [apps, setApps] = useState([]);

	const getApps = () => {
		setApps(JSON.parse(localStorage.getItem('permrecipes')));
		console.log(apps);
	};

	useEffect(() => {
		getApps();
	}, []);

	const generateServicesUI = (app) => {
		let services = [];
		app.forEach((service) => {
			services.push(
				<div className="event">
					<div className="content">
						<div className="summary">{service.name}</div>
					</div>
				</div>
			);
		});

		return services;
	};

	const renderedApps =
		apps && apps.length > 0 ? (
			apps.map((app, index) => {
				return (
					<div key={index} className="four wide column">
						<div key={index} className="ui card">
							<div className="content">
								<div className="header">{app.name}</div>
							</div>
							<div className="content">
								<h4 className="ui header">Services</h4>
								<div className="ui small feed">
									{generateServicesUI(app.appElements)}
								</div>
								<div>
									<button
										onClick={() => {
											addApp(app);
										}}
										className="circular ui icon button"
										data-tooltip="Load"
									>
										<i className="upload icon"></i>
									</button>
									<button
										className="circular ui icon button"
										onClick={() => {
											removePermApp(app);
											getApps();
										}}
										data-tooltip="Delete"
									>
										<i className="delete icon"></i>
									</button>
								</div>
							</div>
							<div style={{ fontSize: '16px' }}>
								Date created:
								{new Date(app.dateCreated).toLocaleDateString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
								})}
							</div>
							{app.startTime !== '' && app.status === 'Active' ? (
								<div style={{ fontSize: '16px' }}>
									Start Time: {console.log(typeof app.startTime)}
									{new Date(app.startTime).toLocaleDateString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
									})}
								</div>
							) : (
								''
							)}
						</div>
					</div>
				);
			})
		) : (
			<></>
		);

	return (
		<div>
			<div className="ui grid" style={{ paddingLeft: '2%' }}>
				{renderedApps}
			</div>
		</div>
	);
};

export default Apps;
