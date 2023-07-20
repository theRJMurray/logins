import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Login from './Login'

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return <div>
        <h1 style={{textAlign: 'center'}}>Dashboard</h1>
        <div>
        	<Login />
        </div>
        
    </div>
}

export default Home;