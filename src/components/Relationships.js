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
const interferelist=relationships.length > 0 ? (
	relationships.filter(b => b.type === "interfere").map((a) => {
		   return (
			   <div key={a.name} className="item">
				   <div className="content" style={{ fontSize: '20px' }}>
				   <div style={{ display: 'inline-block' }}> {a.type} </div>
					   <div style={{ display: 'inline-block' }}>
						   First Service - {a.firstService}
					   </div>
					   <div style={{ display: 'inline-block' }}>
						   &emsp;Second Service - {a.secondService}
					   </div>
					   <div className="description">
						   Description -{' '}
						   {a.description === ''
							   ? 'No description provided.'
							   : a.description}
					   </div>
				   </div>
			   </div>
		   );
	   })
   ) : (
	   <></>
   );
//interfere list appears when click the button
const getInterfere=(e)=>{
   e.preventDefault();
   var ta = document.getElementById("all-list");
	if (ta.style.display === "block") {
		ta.style.display = "none";
	  } 
	var td = document.getElementById("drive-list");
	if (td.style.display === "block") {
		td.style.display = "none";
	} 
	var tc = document.getElementById("control-list");
	if (tc.style.display === "block") {
		tc.style.display = "none";
		} 
	var ts = document.getElementById("support-list");
	if (ts.style.display === "block") {
		ts.style.display = "none";
		} 
	var te = document.getElementById("extend-list");
	if (te.style.display === "block") {
		te.style.display = "none";
		} 
	var tcc = document.getElementById("contest-list");
	if (tcc.style.display === "block") {
		tcc.style.display = "none";
		} 
	var mustshow = document.getElementById("interfere-list");
	if (mustshow.style.display === "none") {
		mustshow.style.display = "block";
	} 
	
};


//relationship contest lists-------------------------------------------------------------------------------------------------------
const contestlist=relationships.length > 0 ? (
	relationships.filter(b => b.type === "contest").map((a) => {
		   return (
			   <div key={a.name} className="item">
				   <div className="content" style={{ fontSize: '20px' }}>
				   <div style={{ display: 'inline-block' }}> {a.type} </div>
					   <div style={{ display: 'inline-block' }}>
						   First Service - {a.firstService}
					   </div>
					   <div style={{ display: 'inline-block' }}>
						   &emsp;Second Service - {a.secondService}
					   </div>
					   <div className="description">
						   Description -{' '}
						   {a.description === ''
							   ? 'No description provided.'
							   : a.description}
					   </div>
				   </div>
			   </div>
		   );
	   })
   ) : (
	   <></>
   );
//contest list appears when click the button
const getContest=(e)=>{
   e.preventDefault();
   var ta = document.getElementById("all-list");
	if (ta.style.display === "block") {
		ta.style.display = "none";
	  } 
	var td = document.getElementById("drive-list");
	if (td.style.display === "block") {
		td.style.display = "none";
	} 
	var tc = document.getElementById("control-list");
	if (tc.style.display === "block") {
		tc.style.display = "none";
		} 
	var ts = document.getElementById("support-list");
	if (ts.style.display === "block") {
		ts.style.display = "none";
	    }	 
	var te = document.getElementById("extend-list");
	if (te.style.display === "block") {
		te.style.display = "none";
		} 
	var ti = document.getElementById("interfere-list");
	if (ti.style.display === "block") {
		ti.style.display = "none";
		} 
	var mustshow = document.getElementById("contest-list");
	if (mustshow.style.display === "none") {
		mustshow.style.display = "block";
	} 
	
};
//relationship extend lists-------------------------------------------------------------------------------------------------------
const extendlist=relationships.length > 0 ? (
	relationships.filter(b => b.type === "extend").map((a) => {
		   return (
			   <div key={a.name} className="item">
				   <div className="content" style={{ fontSize: '20px' }}>
				   <div style={{ display: 'inline-block' }}> {a.type} </div>
					   <div style={{ display: 'inline-block' }}>
						   First Service - {a.firstService}
					   </div>
					   <div style={{ display: 'inline-block' }}>
						   &emsp;Second Service - {a.secondService}
					   </div>
					   <div className="description">
						   Description -{' '}
						   {a.description === ''
							   ? 'No description provided.'
							   : a.description}
					   </div>
				   </div>
			   </div>
		   );
	   })
   ) : (
	   <></>
   );
//extend list appears when click the button
const getExtend=(e)=>{
   e.preventDefault();
   var ta = document.getElementById("all-list");
	if (ta.style.display === "block") {
		ta.style.display = "none";
	  } 
	var td = document.getElementById("drive-list");
	if (td.style.display === "block") {
		td.style.display = "none";
	} 
	var tc = document.getElementById("control-list");
	if (tc.style.display === "block") {
		tc.style.display = "none";
		} 
	var ts = document.getElementById("support-list");
	if (ts.style.display === "block") {
		ts.style.display = "none";
		} 
	var tcc = document.getElementById("contest-list");
	if (tcc.style.display === "block") {
		tcc.style.display = "none";
		} 
	var ti = document.getElementById("interfere-list");
	if (ti.style.display === "block") {
		ti.style.display = "none";
		} 
	var mustshow = document.getElementById("extend-list");
	if (mustshow.style.display === "none") {
		mustshow.style.display = "block";
	} 
	
};


//relationship support lists-------------------------------------------------------------------------------------------------------
const supportlist=relationships.length > 0 ? (
	relationships.filter(b => b.type === "support").map((a) => {
		   return (
			   <div key={a.name} className="item">
				   <div className="content" style={{ fontSize: '20px' }}>
				   <div style={{ display: 'inline-block' }}> {a.type} </div>
					   <div style={{ display: 'inline-block' }}>
						   First Service - {a.firstService}
					   </div>
					   <div style={{ display: 'inline-block' }}>
						   &emsp;Second Service - {a.secondService}
					   </div>
					   <div className="description">
						   Description -{' '}
						   {a.description === ''
							   ? 'No description provided.'
							   : a.description}
					   </div>
				   </div>
			   </div>
		   );
	   })
   ) : (
	   <></>
   );
//support list appears when click the button
const getSupport=(e)=>{
   e.preventDefault();
   var ta = document.getElementById("all-list");
	if (ta.style.display === "block") {
		ta.style.display = "none";
	  } 
	var td = document.getElementById("drive-list");
	if (td.style.display === "block") {
		td.style.display = "none";
	} 
	var tc = document.getElementById("control-list");
	if (tc.style.display === "block") {
		tc.style.display = "none";
		} 
	var te = document.getElementById("extend-list");
	if (te.style.display === "block") {
		te.style.display = "none";
		}
	var tcc = document.getElementById("contest-list");
	if (tcc.style.display === "block") {
		tcc.style.display = "none";
		} 
	var ti = document.getElementById("interfere-list");
	if (ti.style.display === "block") {
		ti.style.display = "none";
		} 
	var mustshow = document.getElementById("support-list");
	if (mustshow.style.display === "none") {
		mustshow.style.display = "block";
	} 
	
};
	
//relationship control lists-------------------------------------------------------------------------------------------------------
	const controllist=relationships.length > 0 ? (
		relationships.filter(b => b.type === "control").map((a) => {
			   return (
				   <div key={a.name} className="item">
					   <div className="content" style={{ fontSize: '20px' }}>
					   <div style={{ display: 'inline-block' }}> {a.type} </div>
						   <div style={{ display: 'inline-block' }}>
							   First Service - {a.firstService}
						   </div>
						   <div style={{ display: 'inline-block' }}>
							   &emsp;Second Service - {a.secondService}
						   </div>
						   <div className="description">
							   Description -{' '}
							   {a.description === ''
								   ? 'No description provided.'
								   : a.description}
						   </div>
					   </div>
				   </div>
			   );
		   })
	   ) : (
		   <></>
	   );
   //control list appears when click the button
   const getControl=(e)=>{
	   e.preventDefault();
	   var ta = document.getElementById("all-list");
		if (ta.style.display === "block") {
			ta.style.display = "none";
		  } 
		var td = document.getElementById("drive-list");
		if (td.style.display === "block") {
			td.style.display = "none";
		} 
		var ts = document.getElementById("support-list");
		if (ts.style.display === "block") {
			ts.style.display = "none";
			}
		var te = document.getElementById("extend-list");
		if (te.style.display === "block") {
			te.style.display = "none";
			} 
		var tcc = document.getElementById("contest-list");
		if (tcc.style.display === "block") {
			tcc.style.display = "none";
			} 
		var ti = document.getElementById("interfere-list");
		if (ti.style.display === "block") {
			ti.style.display = "none";
			} 
		var mustshow = document.getElementById("control-list");
		if (mustshow.style.display === "none") {
			mustshow.style.display = "block";
		} 
	   
   };

   
	
//relationship drive lists---------------------------------------------------------------------------------------
	 const drivelist=relationships.length > 0 ? (
		 relationships.filter(b => b.type === "drive").map((a) => {
				return (
					<div key={a.name} className="item">
						<div className="content" style={{ fontSize: '20px' }}>
						<div style={{ display: 'inline-block' }}> {a.type} </div>
							<div style={{ display: 'inline-block' }}>
								First Service - {a.firstService}
							</div>
							<div style={{ display: 'inline-block' }}>
								&emsp;Second Service - {a.secondService}
							</div>
							<div className="description">
								Description -{' '}
								{a.description === ''
									? 'No description provided.'
									: a.description}
							</div>
						</div>
					</div>
				);
			})
		) : (
			<></>
		);
	//drive list appears when click the button
	const getDrive=(e)=>{
		e.preventDefault();
		var ta = document.getElementById("all-list");
		if (ta.style.display === "block") {
			ta.style.display = "none";
		  } 
		var tc = document.getElementById("control-list");
		if (tc.style.display === "block") {
			tc.style.display = "none";
		} 
		var ts = document.getElementById("support-list");
		if (ts.style.display === "block") {
			ts.style.display = "none";
			} 
		var te = document.getElementById("extend-list");
		if (te.style.display === "block") {
			te.style.display = "none";
			}
		var tcc = document.getElementById("contest-list");
		if (tcc.style.display === "block") {
			tcc.style.display = "none";
			} 
		var ti = document.getElementById("interfere-list");
		if (ti.style.display === "block") {
			ti.style.display = "none";
			} 
		var mustshow = document.getElementById("drive-list");
		if (mustshow.style.display === "none") {
			mustshow.style.display = "block";
		} 
	
		
	};





	//show all lists
	const renderedRelationships =
		relationships.length > 0 ? (
			relationships.map((c) => {
				return (
					<div key={c.name} className="item">
						<div className="content" style={{ fontSize: '20px' }}>
						<div className="titles"> id: {c.thingID}   type: {c.type} </div>
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
		//alllist appears and disapears when it clicks
		const toggle_visibility=(e)=>{
			e.preventDefault();
			var t1 = document.getElementById("all-list");
			
			if (t1.style.display === "none") {
				t1.style.display = "block";
			  } else {
				t1.style.display = "none";
			  }
			};

			//filtering for each ID

			
	
		
			 

				
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
				
				
			const testing=(e)=>{
				e.preventDefault();
				var t1 = document.getElementById("selected-relationships");
				
				if (t1.style.display === "none") {
					t1.style.display = "block";
				  } else {
					t1.style.display = "none";
				  }
				};
				
			
			var testelement=null;
			
			//global.i="43565";
			function test(i){relationships.length > 0 ? (
				relationships.filter(b => b.thingID === i).map((a) => { 
					   return (
						   <div key={a.name} className="item">
							   <div className="content" style={{ fontSize: '20px' }}>
							   <div style={{ display: 'inline-block' }}> {a.thingID} here {a.type} </div>
								   <div style={{ display: 'inline-block' }}>
									   First Service - {a.firstService}
								   </div>
								   <div style={{ display: 'inline-block' }}>
									   &emsp;Second Service - {a.secondService}
								   </div>
								   <div className="description">
									   Description -{' '}
									   {a.description === ''
										   ? 'No description provided.'
										   : a.description}
								   </div>
							   </div>
						   </div>
					   );
				   })
			   ) : (
				   <></>
			   );
			   }
				// const test=(i)=>relationships.length > 0 ? (
				// 	relationships.filter(b => b.thingID === i).map((a) => { 
				// 		   return (
				// 			   <div key={a.name} className="item">
				// 				   <div className="content" style={{ fontSize: '20px' }}>
				// 				   <div style={{ display: 'inline-block' }}> {a.type} </div>
				// 					   <div style={{ display: 'inline-block' }}>
				// 						   First Service - {a.firstService}
				// 					   </div>
				// 					   <div style={{ display: 'inline-block' }}>
				// 						   &emsp;Second Service - {a.secondService}
				// 					   </div>
				// 					   <div className="description">
				// 						   Description -{' '}
				// 						   {a.description === ''
				// 							   ? 'No description provided.'
				// 							   : a.description}
				// 					   </div>
				// 				   </div>
				// 			   </div>
				// 		   );
				// 	   })
				//    ) : (
				// 	   <></>
				//    );
				
				
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
			<div className="righ-a" onClick="">Drive</div>
			<div className="righ-a" onClick="">Control</div>
			<div className="righ-a" onClick="">Support</div>
			<div className="righ-a" onClick="">Extend</div>
			<div className="righ-a" onClick="">Contest</div>
			<div className="righ-a" onClick="">Interfere</div>
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
			<div className="type-element-picture">pictures</div>
		</div>
		</div>
</div>		
	
	
	

	);
};

export default Relationships;

