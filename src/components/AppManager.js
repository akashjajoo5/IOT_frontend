import React, { useState } from 'react';
import axios from 'axios';
import ModalPopUp from './ModalPopUp';

const AppManager = ({ apps, addApp, removeApp }) => {
	console.log(apps);

	const [runningServices, setRunningServices] = useState([]);
	const [show, setShow] = useState(false);
	const [logOutput, setLogOutput] = useState([]);
	const handleClose = () => setShow(false);

	const generateServicesUI = (app) => {
		let services = [];
		app.forEach((service, index) => {
			services.push(<div className="header">{service.name}</div>);
		});

		return services;
	};

	const startServices = async (id, status) => {
		//console.log(apps[id]);
		let newStr = [];
		if (apps[id].length > 0) {
			let temp = runningServices;
			temp = temp.concat(id);
			setRunningServices(temp);
			newStr.push('Executing Services...');
			setLogOutput(newStr);
			for (let i = 0; i < apps[id].length; i++) {
				//console.log('here');
				//console.log(apps[id][i]);
				if (status === 1) {
					newStr.push('Executing Service ' + i);
					setLogOutput(newStr);
					const res = await axios
						.post('http://54.87.4.154:5000/runservice/', {
							tweet: apps[id][i],
						})
						.then((res) => {
							let output = JSON.parse(res.data);
							console.log(output);
							newStr.push(
								'Successfully executed Service ' +
									i +
									' (' +
									output['Service Name'] +
									')'
							);
							if (output['Service Result'] !== 'No Output') {
								newStr.push('Output is ' + output['Service Result']);
							} else {
								newStr.push('Service has no output');
							}
							setLogOutput(newStr);
							return 'completed';
						})
						.catch((err) => {
							newStr.push('Error occured while executing Service ' + i);
							setLogOutput(newStr);
							return 'Error occured';
						});
					if (res === 'Error occured') {
						newStr.push('Stopping execution...');
						setLogOutput(newStr);
						setTimeout(function () {
							setLogOutput([]);
							handleClose();
						}, 3000);
						temp = runningServices.filter((item) => item !== id);
						setRunningServices(temp);
						return;
					}
				} else {
					break;
				}
			}
			newStr.push('Finished executing');
			setLogOutput(newStr);
			setTimeout(function () {
				setLogOutput([]);
				handleClose();
			}, 3000);
			temp = runningServices.filter((item) => item !== id);
			setRunningServices(temp);
		}
	};

	const handleFileUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => {
			//console.log(e.target.result);
			addApp(JSON.parse(e.target.result));
		};
	};

	const renderedApps =
		apps.length > 0 ? (
			apps.map((app, index) => {
				return (
					<div key={index} className="item">
						<div>{generateServicesUI(app)}</div>
						<div className="ui icon buttons">
							<button
								onClick={() => {
									startServices(index, 1);
									setShow(true);
								}}
								className="ui button"
							>
								<i className="play icon"></i>
							</button>
							<button
								className="ui button"
								onClick={() => startServices(index, 0)}
							>
								<i className="stop icon"></i>
							</button>
							<a
								className="ui button"
								download="data.json"
								href={
									`data: text/json;charset=utf-8,` +
									encodeURIComponent(JSON.stringify(apps[index]))
								}
							>
								<i className="save icon"></i>
							</a>
							<button
								className="ui button"
								onClick={() => {
									removeApp(app);
								}}
							>
								<i className="delete icon"></i>
							</button>
						</div>
						<div>
							Status = {runningServices.includes(index) ? 'Active' : 'Inactive'}
						</div>
					</div>
				);
			})
		) : (
			<></>
		);

	return (
		<div style={{ display: 'grid' }}>
			<div>
				<label
					for="file-upload"
					style={{
						border: '1px solid #ccc',
						padding: '6px 12px',
						cursor: 'pointer',
						float: 'right',
						marginRight: '10px',
					}}
				>
					<i className="cloud upload icon"></i>
					Upload
				</label>
				<input
					id="file-upload"
					className="ui button"
					style={{ display: 'none' }}
					type="file"
					accept="json"
					onChange={handleFileUpload}
				/>
			</div>
			<ModalPopUp s={show} handleClose={handleClose} logOutput={logOutput} />
			<div className="ui relaxed divided list">{renderedApps}</div>
		</div>
	);
};

export default AppManager;
