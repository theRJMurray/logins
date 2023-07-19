//**SET UP PRIVATE ROUTE */

import { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';


const button_styles = {
    border: 0,
    borderRadius: '0.25rem',
    background: '#1E88E5',
    color: 'white',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
  }

const App = () => {
	const { logout, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the token exists in local storage
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token)	
		}, [isLoggedIn, setIsLoggedIn]);

	//   const logout = () => {
	// 	// Send a request to the server to invalidate the token
	// 	axios.post('http://localhost:5000/api/logout')
	// 	  .then((response) => {
	// 		// Clear the token from local storage or other client-side storage
			
	// 		// Perform any other necessary actions upon successful logout
	// 		// For example, you might redirect the user to the login page or reset the state.
	// 		// ...
	// 	  })
	// 	  .catch((error) => {
	// 		// Handle error during logout, if needed
	// 		console.error('Error during logout:', error);
	// 	  });
	//   };

	return <div>
		<div style={{width: '100%', height: 80, background: '#519171'}}>
			
			{isLoggedIn ? <button style={button_styles} onClick={() => logout()} >Logout</button> : 
			<div>
				<button style={button_styles} onClick={() => navigate("/login")} >Login</button>
				<button style={button_styles} onClick={() => navigate("/register")} >Register</button>
			</div>}
		</div>
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
			<Route path="/register" element={<Register/>} />
			{isLoggedIn ? <Route path="/dashboard" element={<Dashboard />} /> : <Route exact path="/" element={<Home />} />}
			<Route element={<NotFound/>} />
		</Routes>
	</div>
}

export default App;