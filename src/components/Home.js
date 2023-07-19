import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return <div>
        home
        <button onClick={() => navigate('/login', { replace: true })}>login</button>
    </div>
}

export default Home;