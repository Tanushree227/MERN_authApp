import { Link } from "react-router-dom";

function Profile() 
{
    return(
        <div>Profile Page.
        <button><Link to='/new-post'>Start a Post</Link></button>
        <button><Link to='/favorites'>Favorites</Link></button>
        </div>
    );
}

export default Profile;