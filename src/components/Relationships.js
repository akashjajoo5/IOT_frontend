import React, { useState, useEffect } from 'react';
import ReactDOM  from 'react-dom'
import axios from 'axios';
import './relationships.css';


const Relationships = () => {
	const [relationships, setRelationships] = useState([]);

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
		getRelationships();
	}, []);

//relationship interfere lists-------------------------------------------------------------------------------------------------------

	
		
			 

				
			//dropbox - select option generator from relationships
	
			const dropBox=()=>{
				//clear all options in dropbox
				document.getElementById("mySelect").options.length = 0;
				
				//set defalut option - All things
				var x = document.getElementById("mySelect");
				var def = document.createElement("option");
				def.text = "All Things"; 
				x.add(def); 

				//remove all dupilicates
				var arr = relationships.map(a=> {return a.thingID});
				var unique =arr.filter(function(item, pos) {
					return arr.indexOf(item) === pos;
				});
				//generate options for dropbox
				for(var i=0;i<unique.length;i++){
					var option = document.createElement("option");
					option.text = unique[i]; 
					x.add(option); 
				}
			
			};
				
			
				//Upload pictures-- has error
			const getPics=(i)=>{
				var image = document.getElementById("picture");
				/* switch(i){
				case 1:
					image.src="Drive.png";
				case 2:
					image.src="Control.png";
				case 3:
					image.src="Support.png";
				case 4:
					image.src="Extend.png";
				case 5:
					image.src="Contest.png";
				case 1:
					image.src="Interfere.png";
										

					} */
				};
				
			// filtering thing ID	
			const selectedThing =()=>{
				var x = document.getElementById("mySelect");
				var i = x.options[x.selectedIndex].text;
				if(i!="All Things"){
				var tamp = relationships.filter(b => b.thingID === i).map((a) => { 
				return (
					<tr class="row100 body" key={a.name}>
					<td class="cell100 column2">{a.thingID}</td>
					<td class="cell100 column3">{a.type}</td>
					<td class="cell100 column4">{a.firstService}</td>
					<td class="cell100 column5">{a.secondService}</td>									
				</tr>
				);
				});
				//var t1 = document.getElementById("selected-relationships");
				console.log(tamp.length);
				ReactDOM.render(tamp,document.getElementById("tamp-relationships"));
			}else{
				var tamp1=relationships.map((c) => {
					return (
						<tr class="row100 body" key={c.name}>
										<td class="cell100 column2">{c.thingID}</td>
										<td class="cell100 column3">{c.type}</td>
										<td class="cell100 column4">{c.firstService}</td>
										<td class="cell100 column5">{c.secondService}</td>									
									</tr>
					);
				});
				console.log(tamp1.length);
				ReactDOM.render(tamp1,document.getElementById("tamp-relationships"));
				}
				//testelement=test(i);
				//document.getElementById("selected-relationships")=t1;
			    //alert(t1);
			};
			
               





	return (
<div className="main">
		<div className="headline">		
		{/* <div className="hline1">Hoverable Table</div> */}
		<div className="click" onClick={dropBox}>Clik-Filter Drop Box </div>
		<div class="menu">					
			<select class="select" id="mySelect" onChange={selectedThing}>
			</select>
		</div>
		<div className="right-align">
			<div className="righ-a" onClick={getPics(1)}>Drive</div>
			<div className="righ-a" onClick={getPics(2)}>Control</div>
			<div className="righ-a" onClick={getPics(3)}>Support</div>
			<div className="righ-a" onClick={getPics(4)}>Extend</div>
			<div className="righ-a" onClick={getPics(5)}>Contest</div>
			<div className="righ-a" onClick={getPics(6)}>Interfere</div>
		</div>
	</div>
		<div className="table">
		<table className="tables">
		<tr>
			<th>Thing ID</th>
			<th>Relationship</th>
			<th>First Service</th>
			<th>Second Service</th>

		</tr>
		<tbody  id="tamp-relationships" >
									
		</tbody>
		
		
		</table>
		</div>

		<div className="type-display">
			<div className="type-element">
				<div className="type-element-relation">relation-name</div>
				<div className="type-element-picture">
					<img src="/img/Control.png" className="pics" id="picture" alt="My Pic"/> pictures</div>
			</div>
		</div>
</div>		
	
	
	

	);
};

export default Relationships;

