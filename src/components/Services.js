import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
	const [services, setServices] = useState([]);

	const getServices = () => {
		axios
			.get('http://54.87.4.154:5000/getservices/')
			.then((res) => {
				console.log(res.data);
				setServices([...res.data]);
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
					<div key={c.name} className="item">
						<div className="content" style={{ fontSize: '20px' }}>
							<div className="header">{c.name}</div>
							<div className="description">
								Description -{' '}
								{c.description === ''
									? 'No description provided.'
									: c.description}
							</div>
						</div>
					</div>
				);
			})
		) : (
			<></>
		);

	return (
		<div>
			<button onClick={getServices}>Get New Services</button>
			<div className="ui relaxed divided list">{renderedServices}</div>
		</div>
	);
};

export default Services;
