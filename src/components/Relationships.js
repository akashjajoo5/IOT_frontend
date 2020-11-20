import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Relationships = () => {
	const [relationships, setRelationships] = useState([]);

	const getThings = () => {
		axios
			.get('http://54.87.4.154:5000/getrelationships/')
			.then((res) => {
				console.log(res.data);
				setRelationships([...res.data]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getThings();
	}, []);

	const renderedRelationships =
		relationships.length > 0 ? (
			relationships.map((c) => {
				return (
					<div key={c.name} className="item">
						<div className="content" style={{ fontSize: '20px' }}>
							<div style={{ display: 'inline-block' }}>
								First Service - {c.firstService}
							</div>
							<div style={{ display: 'inline-block' }}>
								&emsp;Second Service - {c.secondService}
							</div>
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

	return <div className="ui relaxed divided list">{renderedRelationships}</div>;
};

export default Relationships;
