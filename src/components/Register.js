import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
		console.log('handleSubmit firing, onto axios post')
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
          console.log(response.data);
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" username="username" placeholder="username" onChange={e => onChangeUsername(e)} /> <br />
            <input type="text" password="password" placeholder="password" onChange={e => onChangePassword(e)} /> <br />
            <input type="text" password="email" placeholder="email" onChange={e => onChangeEmail(e)} /> <br />
            <input type="submit" value="register" />
        </form>
    </div>
}

export default Register;