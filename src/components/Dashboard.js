import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext)

    console.log(user)

    return <div>
        dashboard<br />
        Welcome {user.username}
    </div>
}

export default Dashboard;