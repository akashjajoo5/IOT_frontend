import React, { useState, useEffect } from 'react';
import axios from "axios";
import Draggable from 'react-draggable';

const Recipe = () => {
	const [services, setServices] = useState([]);
	const [relationships, setRelationships] = useState([]);
	const [deltaXyPos,setDeltaXyPos] = useState({x:0,y:0});
	//const [deltaXyPos,handleLimits] = useState({x:0,y:0});

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

	const handleDrag = (e,d) => {
		const {x,y} = deltaXyPos;
		
		setDeltaXyPos({
			x: x+d.deltaX,
			y: y +d.deltaY,
			
		});

	};


	const renderedServices =
		services.length > 0 ? (
			services.map((c) => {
				return (

					<Draggable
					onDrag={handleDrag} bounds={{ top: -40, left: 0, right: 100, bottom: 300 }}>

	
					<div className="drag-wrapper" >
					  <p>{c.name}</p>
					  <div>
						<strong>x: {deltaXyPos.x.toFixed(0)}, </strong>
						<strong>y: {deltaXyPos.y.toFixed(0)}</strong>
					  </div>
					</div>
					
				  </Draggable>
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















	return (
		<Draggable
        onDrag={handleDrag} bounds={{ top: -40, left: 0, right: 100, bottom: 300 }}>

        <div className="drag-wrapper">
          <p>Drag position:</p>
          <div>
            <strong>x: {deltaXyPos.x.toFixed(0)}, </strong>
            <strong>y: {deltaXyPos.y.toFixed(0)}</strong>
          </div>
        </div>
        
      </Draggable>
	);
};

export default Recipe;
