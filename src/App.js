//**SET UP PRIVATE ROUTE */
//**SET UP NAVIGATION BAR THAT WORKS AND SHOWS REGARDLESS OF WHAT PAGE IM ON */

import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return <div>
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
			<Route path="/register" element={<Register/>} />
			<Route path="/dashboard" element={<PrivateRoute path="/dashboard" element={<Dashboard/>} isLoggedIn={isLoggedIn} />} />
			<Route element={<NotFound/>} />
		</Routes>
	</div>
}

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
		isLoggedIn ? (
			<Component {...props} />
		) : (
			<Navigate  to="/login" />
		)
		}
	/>
);

export default App;