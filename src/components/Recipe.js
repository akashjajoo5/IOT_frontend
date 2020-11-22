import React, { useState, useEffect } from 'react';
import axios from "axios";
import Draggable from 'react-draggable';

const Recipe = () => {
	const [services, setServices] = useState([]);
	const [relationships, setRelationships] = useState([]);

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

	const getRelationships = () => {
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
		getServices();
		getRelationships();
	}, []);





	return (
		<Draggable>
			<div className="drag-wrapper">
				<div>You can drag me now.</div>
			</div>
		</Draggable>
	);
};

export default Recipe;
