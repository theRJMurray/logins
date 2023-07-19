import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

  
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
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        navigate('/')
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
    };
  
    return (
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, user, setUser, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  };