// better login/register experience -- check username and email on update, before signup button becomes available
// host live
// do CI, dev staging prod
// minor improvements all over, minor features

import { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import axios from 'axios';

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
	const { logout, isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			setIsLoggedIn(true);
			axios.post('http://localhost:5000/api/verify', {
				token
			}, {
			headers: {
				'Content-Type': 'application/json'
			}
			})
			.then(response => {
				const { email, username, bio } = response.data;
				setUser({username, email, bio})
				navigate('/dashboard')
			})
			.catch(error => {
				console.error(error);
			});

			setIsLoggedIn(!!token)	
		}

	}, [setUser, setIsLoggedIn, navigate]);

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