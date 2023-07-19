import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
	const { register } = useContext(AuthContext);

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
        register(username, password, email);
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