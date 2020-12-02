import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Things = () => {
	const [things, setThings] = useState([]);

	const getThings = () => {
		axios
			.get('http://54.87.4.154:5000/getthings/')
			.then((res) => {
				console.log(res.data);
				setThings([...res.data]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getThings();
	}, []);

	const renderedThings =
		things.length > 0 ? (
			things.map((c) => {
				return (
					// <div key={c.name} className="item">
					// 	<div className="content" style={{ fontSize: '20px' }}>
					// 		<div className="header">{c.OS}</div>
					// 		<div className="description">
					// 			Description -{' '}
					// 			{c.description === ''
					// 				? 'No description provided.'
					// 				: c.description}
					// 		</div>
					// 	</div>
					// </div>
					<div key={c.name} className="card">
						<div className="content">
							<div className="header">{c.name}</div>
							<div className="meta">{c.owner}</div>
							<div className="description">
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
			<button className="ui button" onClick={getThings}>
				Get New Things
			</button>
			<br />
			<br />
			<div className="ui cards" style={{ paddingLeft: '5%' }}>
				{renderedThings}
			</div>
		</div>
	);
};

export default Things;
