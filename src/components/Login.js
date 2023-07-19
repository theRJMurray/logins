import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    };

    return <div>
        <button onClick={() => navigate('/register', { replace: true })}>register page</button>
        <form onSubmit={handleSubmit}>
            <input type="text" username="username" placeholder="username" onChange={e => onChangeUsername(e)} /> <br />
            <input type="text" password="password" placeholder="password" onChange={e => onChangePassword(e)} /> <br />
            <input type="submit" value="Login" />
        </form>
    </div>
}

export default Login;

