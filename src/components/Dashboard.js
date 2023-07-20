import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";

const Dashboard = () => {
    const { user, updateBio } = useContext(AuthContext)
    const [bio, setBio] = useState('')

    return <div>
        dashboard<br />
        Welcome {user && user.username} <br />
        Bio: {user && user.bio}

        <form onSubmit={(e) => {e.preventDefault()
            updateBio(bio)}}>
            <input type="text" bio="bio" placeholder="bio" onChange={e => setBio(e.target.value)} /> <br />
            <input type="submit" value="Update Bio" />
        </form>
    </div>
}

export default Dashboard;