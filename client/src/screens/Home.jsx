import React from "react";
import '../App.css';

const Home = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    //window.location.reload();
    window.location.href = "https://scamreporterfront.onrender.com"
  };
  return (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h1>Logged in as {user?.email}</h1>

      <p>
        Instructions on use for various reporting pages will go here and pages will appear in the nav bar. 
      </p>

      <div>
      <img className="signedInPic" src={user?.picture} alt="User profile pic"></img>
      <br/>
        <button
          onClick={logout}
          className="logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;