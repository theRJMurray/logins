import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);


    return <div>
        home
        you are <span>{isLoggedIn ? 'logged in' : 'not logged in'}</span>
    </div>
}

export default Home;