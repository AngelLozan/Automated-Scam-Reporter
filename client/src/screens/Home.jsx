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
        Instructions on use for various reporting pages will go here and pages will appear in the nav bar. The output of all these forms is an image of the browser window immediately after submitting the report. If the form has additional parameters outside of the URL, they influence the wording used to fill text areas in the form to describe the contents of a website. 
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