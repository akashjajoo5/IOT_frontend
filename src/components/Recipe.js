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

const Recipe = props => {
	const [services, setServices] = useState([]);
	const [relationships, setRelationships] = useState([]);
	const [servicePositions, setServicePositions] = useState([]);
	const [relationshipPositions, setRelationshipPositions] = useState([]);
	const [renderedServiceSpots, setRenderedServiceSpots] = useState([]);

	const [isDragSpotOccupied, setIsDragSpotOccupied] = useState([]);
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const [draggedIndex, setDraggedIndex] = useState(0); //THIS CONTAINS THE ELEMENT INDEX THAT WAS DRAGGED


	const nodeRef = React.useRef(null);
	const getServices = () => {
		axios
			.get('http://54.87.4.154:5000/getservices/')
			.then((res) => {
			//	console.log(res.data);
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
				//console.log(res.data);
				setRelationships([...res.data]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getServices();
		getRelationships();

		//Add initial drag spot
		setRenderedServiceSpots([
			<div className="dragSpot" id="dragSpot0" >
				Drag Spot 0
			</div>]
		);

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
		setIsDragSpotOccupied([]);
		//then set them all back to zero
		for(let k = 0; k < services.length; k++){
			setServicePositions(servicePositions => [...servicePositions, {"x": 0, "y": 0} ]);
			setIsDragSpotOccupied(isDragSpotOccupied => [...isDragSpotOccupied, false ]);
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

	const addSpot = () => {
		let newIndex = renderedServiceSpots.length;
		let newID= "dragSpot" + newIndex;

		setRenderedServiceSpots(renderedServiceSpots => [...renderedServiceSpots,
			<div className="dragSpot" id={newID} >
				Drag Spot {newIndex}
				<br/>
			</div>
		]);
	};


	const clearEditor = () => {
		setRenderedServiceSpots([
			<div className="dragSpot" id="dragSpot0" >
				Drag Spot 0
			</div>]
		);

		//clear all positions
		setIsDragSpotOccupied([]);
		setServicePositions([]);
		setRelationshipPositions([]);
		//set defaults for services and occupied spots
		for(let k = 0; k < services.length; k++){
			setServicePositions(servicePositions => [...servicePositions, {"x": 0, "y": 0} ]);
			setIsDragSpotOccupied(isDragSpotOccupied => [...isDragSpotOccupied, false ]);
		}

		//set defaults for relationships
		for(let i = 0; i < relationships.length; i++){
			setRelationshipPositions(relationshipPositions => [...relationshipPositions, {"x": 0, "y": 0} ]);
		}

	};

	const createApp = (e) => {
		e.preventDefault();
		let tempApp = [];
		//slow but it works I guess :/
		isDragSpotOccupied.forEach((value, index) => {
			if(value){ //checks if there is something other than false in array
				services.forEach((service, serviceIndex)=> {
					if(service.name === value){
						tempApp.push(service);
					}
				})
			}
		});

		props.addApp(tempApp);

		clearEditor();
	};



	const handleStopRelationships = (dragEvent, dragData) => {
		console.log(dragEvent.target.id); //THIS CONTAINS THE ELEMENT INDEX THAT WAS DRAGGED
		let tempPosition = [...relationshipPositions];

		//NOTE: this has weird behavior with grid columns and does not work fully with them
		//NOTE dragEvent holds data about x and y positions off the whole screen while dragData holds x and y info relative to individual element
		tempPosition[dragEvent.target.id] = {"x":dragData.x , "y":dragData.y  };

		setRelationshipPositions(tempPosition);
	};

	/*const isSpotOccupied = (x, y)  => {
		let isOccupied = false;

		servicePositions.forEach((position, index) => {
			if(position.x === x && position.y === y){
				isOccupied = true;
			}
		});

		relationshipPositions.forEach((position, index) => {
			if(position.x === x && position.y === y){
				isOccupied = true;
			}
		});

		return isOccupied;
	}; */

	const getAbsolutePosition = (element)  => {
		let top = 0, left = 0;
		do {
			top += element.offsetTop  || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while(element);

		return {"x": left,"y": top}
	};


	const handleStartServices = (dragEvent, dragData) => {
		//When dragging starts, use this to get the index of the dragged element so it can be used to set the elements position
		//console.log(dragEvent);
		setDraggedIndex(dragEvent.target.id);
	};


	const handleStopServices = (dragEvent, dragData) => {
		//console.log(dragEvent);
		//console.log(dragData);

		//if the hovered element ID is a number (meaning one of the set spots was not hovered) return
		if(!isNaN(dragEvent.target.id)){
			return;
		}

		//gets the element that was hovered over
		//console.log(dragEvent.target);
		console.log(dragEvent.target.id);
		let hoveredElement = document.getElementById(dragEvent.target.id);
		let domRect = hoveredElement.getBoundingClientRect();
		let hoveredPositions  = getAbsolutePosition(hoveredElement);


		hoveredElement = document.getElementById(dragEvent.target.id);

		let tempPosition = [...servicePositions];
		//NOTE: this has weird behavior with grid columns and does not work fully with them
		//NOTE dragEvent holds data about x and y positions off the whole screen while dragData holds x and y info relative to individual element
		//check if service was dragged into spot
		if((dragEvent.x > domRect.left && dragEvent.x < domRect.right)  &&  (dragEvent.y > domRect.top && dragEvent.y < domRect.bottom)){
			//gets element that was dragged
			let selectedElement = document.getElementById(draggedIndex);
			let selectedPositions  = getAbsolutePosition(selectedElement);

			//set the position of the draggable to be equal to the difference between the absolute positions of the spot and the service
			let calculatedPosition = {"x": Math.trunc(hoveredPositions.x - selectedPositions.x) , "y":  Math.trunc(hoveredPositions.y - selectedPositions.y)  };

			//Gets the index from the hoveredElements ID
			let elementIndex = dragEvent.target.id.replace('dragSpot','');
			//console.log(elementIndex);

			//check if service or relationship occupies this spot already
			if(isDragSpotOccupied[elementIndex]){
				return;
			}

			//hoveredElement.style.display = 'none';	//hides desired spot
			tempPosition[draggedIndex] = calculatedPosition; //set new position of service

			//update occupied array to show spot as occupied
			let tempOccupiedArray = [...isDragSpotOccupied];
			tempOccupiedArray[elementIndex] = services[draggedIndex].name;  //set occupied array slot equal to name of service for use in creation of App
			setIsDragSpotOccupied(tempOccupiedArray);

			//console.table(isDragSpotOccupied);
		}


		//console.table(tempPosition);
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
			>
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
					onStart={handleStartServices}
					onStop={handleStopServices}
					>
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
					<Col md={6} lg={6} xl={6} style={{background: "none"}}>
						<button onClick={addSpot} >Add New Spot</button>
						<button onClick={clearEditor} >Clear Editor</button>
						<button onClick={(e) => createApp(e)} >Finalize App</button>

						<div className="ui relaxed divided list">{renderedServiceSpots}</div>

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
