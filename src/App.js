import React, { useState } from 'react';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

import Services from './components/Services';
import Things from './components/Things';
import Relationships from './components/Relationships';
import Recipe from './components/Recipe';
import Apps from './components/Apps';
import AppManager from './components/AppManager';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	const [apps, setApps] = useState([]);

	const addApp = (newApp) => {
		setApps((apps) => [...apps, newApp]);
	};

	return (
		<BrowserRouter>
			<div className="App">
				<header
					className="App-header"
					style={{ color: 'deepskyblue', paddingBottom: '10px' }}
				>
					IoT App Builder
				</header>
				<div
					className="ui six item menu"
					style={{ height: '50px', marginBottom: '40px' }}
				>
					<Link to="/" className="item">
						Things
					</Link>
					<Link to="/services" className="item">
						Services
					</Link>
					<Link to="/relationships" className="item">
						Relationships
					</Link>
					<Link to="/recipe" className="item">
						Recipes
					</Link>
					<Link to="/apps" className="item">
						Apps
					</Link>
					<Link to="/appmanager" className="item">
						Application Manager
					</Link>
				</div>
				<Switch>
					<Route exact path="/" component={Things} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/relationships" component={Relationships} />
					<Route
						exact
						path="/recipe"
						component={() => <Recipe apps={apps} addApp={addApp} />}
					/>
					<Route exact path="/apps" component={() => <Apps apps={apps} />} />
					<Route
						exact
						path="/appmanager"
						component={() => <AppManager apps={apps} />}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
