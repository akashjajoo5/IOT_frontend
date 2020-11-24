import React from 'react';
import axios from 'axios';

const AppManager = ({ apps }) => {
	console.log(apps);

	const generateServicesUI = (app) => {
		let services = [];
		app.forEach((service, index) => {
			services.push(<div className="header">{service.name}</div>);
		});

		return services;
	};

	const startServices = async (id) => {
		console.log(apps[id]);
		if (apps[id].length > 0) {
			document.getElementById('status' + id).innerHTML = 'Status = Active';
			for (let i = 0; i < apps[id].length; i++) {
				console.log('here');
				console.log(apps[id][i]);
				const res = await axios
					.post('http://localhost:5000/runservice/', {
						tweet: apps[id][i],
					})
					.then((res) => {
						console.log(res);
						return 'completed';
					})
					.catch((err) => {
						return 'Error occured';
					});
				if (res === 'Error occured') {
					break;
				}
			}
			document.getElementById('status' + id).innerHTML = 'Status = Inactive';
		}
	};

	const renderedApps =
		apps.length > 0 ? (
			apps.map((app, index) => {
				return (
					<div key={index} className="item">
						<div>{generateServicesUI(app)}</div>
						<div className="ui icon buttons">
							<button
								onClick={() => startServices(index)}
								className="ui button"
							>
								<i className="play icon"></i>
							</button>
							<button className="ui button">
								<i className="stop icon"></i>
							</button>
							<button className="ui button">
								<i className="save icon"></i>
							</button>
							<button className="ui button">
								<i className="delete icon"></i>
							</button>
						</div>
						<div id={'status' + index}>Status = Inactive</div>
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

export default AppManager;
