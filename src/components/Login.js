import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" username="username" placeholder="username" onChange={e => onChangeUsername(e)} /> <br />
            <input type="text" password="password" placeholder="password" onChange={e => onChangePassword(e)} /> <br />
            <input type="submit" value="Login" />
        </form>
    </div>
}

export default Login;

