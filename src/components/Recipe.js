import React, { useState, useEffect } from 'react';
import axios from "axios";
import Draggable from 'react-draggable';
import { Container, Row, Col} from "react-bootstrap";

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
	const [servicePositions, setServicePositions] = useState([]);
	const [relationshipPositions, setRelationshipPositions] = useState([]);
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const nodeRef = React.useRef(null);

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

	//UseEffect for initializing the Service positions array
	useEffect(() => {
		//clear all positions when services change and
		setServicePositions([]);
		//then set them all back to zero
		for(let k = 0; k < services.length; k++){
			console.log("service length is " + services.length);
			setServicePositions(servicePositions => [...servicePositions, {"x": 0, "y": 0} ]);
		}
	}, [services]);

	//UseEffect for initializing the relationships positions array
	useEffect(() => {
		//clear all positions when services change and
		setRelationshipPositions([]);
		//then set them all back to zero
		for(let k = 0; k < relationships.length; k++){
			console.log("relationship length is " + relationships.length);
			setRelationshipPositions(relationshipPositions => [...relationshipPositions, {"x": 0, "y": 0} ]);
		}
	}, [relationships]);

	const handleDrag = (e,d) => {
		/*const {x,y} = deltaXyPos;

		setDeltaXyPos({
			x: x+d.deltaX,
			y: y +d.deltaY
		});		*/

	};

	const handleStopRelationships = (dragEvent, dragData) => {
		console.log(dragEvent.target.id); //THIS CONTAINS THE ELEMENT INDEX THAT WAS DRAGGED
		let tempPosition = [...relationshipPositions];

		//NOTE: this has weird behavior with grid columns and does not work fully with them
		//NOTE dragEvent holds data about x and y positions off the whole screen while dragData holds x and y info relative to individual element
		tempPosition[dragEvent.target.id] = {"x":dragData.x , "y":dragData.y  };

		setRelationshipPositions(tempPosition);
	};

	const handleStopServices = (dragEvent, dragData) => {
		console.log(dragEvent.target.id); //THIS CONTAINS THE ELEMENT INDEX THAT WAS DRAGGED
		console.log(dragEvent);
		console.log(dragData);

		let tempPosition = [...servicePositions];

		//NOTE: this has weird behavior with grid columns and does not work fully with them
		//NOTE dragEvent holds data about x and y positions off the whole screen while dragData holds x and y info relative to individual element
		if(dragEvent.x > 500 || dragEvent.y < 200){
			tempPosition[dragEvent.target.id] = {"x":0, "y":0 }
		}
		else{
			tempPosition[dragEvent.target.id] = {"x":dragData.x , "y":dragData.y  }
		}

		setServicePositions(tempPosition);
	};


	const renderedRelationships =
	relationships.length > 0 ? (
		relationships.map((r, index) => {
			return (
			<Draggable
			position={relationshipPositions[index]}
			nodeRef={nodeRef}
			onStop={handleStopRelationships}
			onDrag={handleDrag}
			bounds="body">
			<div id={index} className="drag-wrapperR" ref={nodeRef}>
			  <p id={index}>{r.name}</p>
			</div>
		  </Draggable>
			);//MUST SET ID AS INDEX ON ALL INNER ELEMENTS SO THAT NO MATTER WHERE IT IS DRAGGED FROM, IT WILL SHOW THE SAME ID
		})
	) : (
		<></>
	);


	const renderedServices =
		services.length > 0 ? (
			services.map((c, index) =>  {
				return (

					<Draggable
					position={servicePositions[index]}
					nodeRef={nodeRef}
					onDrag={handleDrag}
					onStop={handleStopServices}
					bounds="body">
						<div id={index} className="drag-wrapper" ref={nodeRef} >
						  <p id={index}>{c.name}</p>
						</div>
				  </Draggable>
				);//MUST SET ID AS INDEX ON ALL INNER ELEMENTS SO THAT NO MATTER WHERE IT IS DRAGGED FROM, IT WILL SHOW THE SAME ID
			})
		) : (
			<></>
		);

	return (
		<div >
				<Row className="show-Grid">
					<Col md={3} lg={3} xl={3} style={{background: "red"}}>
						<button onClick={getServices} >Get New Services</button>
						<div className="ui relaxed divided list" >{renderedServices}</div>
					</Col>
					<Col md={6} lg={6} xl={6} style={{background: "green"}}>
						<label >Middle Column</label>
					</Col>
					<Col md={3} lg={3} xl={3} style={{background: "blue"}}>
						<button onClick={getRelationships} >Get New Relationships</button>
						<div className="ui relaxed divided list">{renderedRelationships}</div>
					</Col>
				</Row>
		</div>
	);
};

export default Recipe;
