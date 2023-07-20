import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const register = (username, password, email) => {
        axios.post('http://localhost:5000/api/register', {
			username: username,
			password: password,
			email: email
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
			// Handle success
			login(username, password);
			console.log(response.data);
        })
        .catch(error => {
			// Handle error
			console.error(error);
        });
    }
  
    const login = (username, password) => {
      axios.post('http://localhost:5000/api/login', {
			username: username,
			password: password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          	// Handle success
		  	const { email, username } = response.data.user;
			console.log(response.data);
			const token = response.data.token;
			localStorage.setItem('token', token);
			setIsLoggedIn(true);
			setUser({username, email})
			// localStorage.setItem('user', JSON.stringify(user));
			console.log(email, username);
			navigate('/dashboard')
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    };
  
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        console.log('token removed')
		setUser({})
		navigate('/')
    };

	const VARIABLES = { isLoggedIn, setIsLoggedIn, 
		user, setUser, login, logout, register }
  
    return (
      <AuthContext.Provider
        value={VARIABLES}
      >
        {children}
      </AuthContext.Provider>
    );
  };