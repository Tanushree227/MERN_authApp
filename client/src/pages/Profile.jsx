import { Link } from "react-router-dom";
import classes from '../components/layout/Header.module.css';
import Card from "../components/ui/Card";

function Profile() 
{
    return(
        <Card>
        <h1>Profile Page.</h1>
        <button className={classes.badge}><Link to='/new-post'>Start a Post</Link></button>
        <button className={classes.badge}><Link to='/favorites'>Favorites</Link></button>
        </Card>
    );
}

export default Profile;