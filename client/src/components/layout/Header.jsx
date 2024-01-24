import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector } from 'react-redux';

function Header()
{
    const { currentUser } = useSelector(state => state.user);
    return(
        // <div className="bg-slate-200">
        //     <div className="flex justify-between items-center max-w-6xl mx-auto p-6">
        //         <Link to='/'><h1 className="font-bold text-2xl">Reflect</h1></Link>
        //         <ul className="flex gap-4">
        //             <Link to='/'><li className="text-2xl">Home</li></Link>
        //             <Link to='/about'><li className="text-2xl">About</li></Link>
        //             <Link to='/sign-in'><li className="text-2xl">Sign-In</li></Link>
        //         </ul>
        //     </div>
        // </div>
        <header className={classes.header}>
            <div className={classes.logo}>EchoHub</div>
            <nav>
                <ul>
                    <Link to='/'><li className="text-2xl">Home</li></Link>
                    <Link to='/about'><li className="text-2xl">About</li></Link>
                    <Link to='/profile'>{currentUser ? (
                        <img className="h-9 w-9 rounded-full object-cover" src={currentUser.profilePicture} alt="Display Picture" />
                    ) : (<li className="text-2xl">Sign-In</li>)}</Link>
                </ul>
            </nav>
        
        </header>

    );
}

export default Header;