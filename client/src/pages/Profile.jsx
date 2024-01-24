import { Link } from "react-router-dom";
import classes from "../components/layout/Header.module.css";
import Card from "../components/ui/Card";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Card>
      <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile Page.</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          className="h-24 w-24 mt-2 self-center cursor-pointer rounded-full object-cover"
          alt="display picture"
        />
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" />
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-80">Update</button>
        <div className="flex flex-row mx-20">
          <button className="h-10 uppercase text-zinc-50 w-52 hover:opacity-75 rounded-md m-5 bg-lime-800">
            <Link to="/new-post">Start a Post</Link>
          </button>
          <button className="h-10 w-52 uppercase text-white hover:opacity-75 rounded-md m-5 bg-lime-800">
            <Link to="/favorites">Liked Posts</Link>
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      </div>
    </Card>
  );
}

export default Profile;
