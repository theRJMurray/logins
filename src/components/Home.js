import { useState } from 'react';
// import { AuthContext } from '../AuthContext';
// import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Home = () => {
    const [status, setStatus] = useState('login');

    return <div>
        <h1 style={{textAlign: 'center'}}>Dashboard</h1>
        <div style={{margin: '0px auto', width: 300}}>
			{status === 'login' ? 
			<div>
				<Login />
				<span>not a member? <span onClick={() => setStatus('register')}>Register</span> </span>
			</div> :
			<div>
				<Register />
				<span>already a member? <span onClick={() => setStatus('login')}>Login</span></span>
			</div>
			}
        	
        </div>
    </div>
}

export default Home;