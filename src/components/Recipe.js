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
	const [deltaXyPosR, setDeltaXyPosR] = useState({x: 0, y: 0 });
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

	const handleDragR = (e,c) => {
		const {x,y} = deltaXyPosR;
		console.log(dragRef);

		setDeltaXyPosR({
			x: x+c.deltaX,
			y: y +c.deltaY,

		});

	};



	const renderedRelationships =
	relationships.length > 0 ? (
		relationships.map((r) => {
			return (
			<Draggable
			ref={dragRef}
			onDrag={handleDragR}
			bounds="body">

			<div className="drag-wrapperR" >
			  <p>{r.name}</p>

			</div>

		  </Draggable>
			);
		})
	) : (
		<></>
	);





	
	const renderedServices =
		services.length > 0 ? (
			services.map((c) => {
				return (

					<Draggable
						ref={dragRef}
					onDrag={handleDrag}
					bounds="body"
					>

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
			<div className="ui relaxed divided list">{renderedRelationships}</div>;
		</div>
	);
};

export default Recipe;
