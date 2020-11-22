import React, { useState, useEffect } from 'react';
import axios from "axios";
import Draggable from 'react-draggable';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}


const Recipe = () => {
	const [services, setServices] = useState([]);
	const [relationships, setRelationships] = useState([]);
	const [deltaXyPos, setDeltaXyPos] = useState({x: 0, y: 0 });
	const [dragRef, setDragRef] = useState(React.createRef());
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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
		//add window resizing handlers and listeners
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
			console.log(windowDimensions);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleDrag = (e,d) => {
		const {x,y} = deltaXyPos;
		console.log(dragRef);

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
						ref={dragRef}
					onDrag={handleDrag}
					bounds="body">

					<div className="drag-wrapper" >
					  <p>{c.name}</p>

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
			<div className="ui relaxed divided list" >{renderedServices}</div>
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
