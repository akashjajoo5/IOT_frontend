import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

import Services from './components/Services';
import Things from './components/Things';

function App() {

	return (
		<BrowserRouter>
			<div className="App">
				<header className="App-header">IoT App Builder</header>
				<div className="ui three item menu">
					<Link to="/services" className="item">Services</Link>
					<Link to="/" className="item">Things</Link>
					<Link to="/" className="item">App Builder</Link>
				</div>
				<Switch>
					<Route exact path="/" component={Things}/>
					<Route exact path="/services" component={Services}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
