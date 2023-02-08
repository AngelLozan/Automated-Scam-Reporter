import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import exodus from '../EXODUS_symbol_colour.png'

// https://developers.google.com/identity/gsi/web/reference/js-reference



const Login = () => {
  const { handleGoogle, loading, error } = useFetch(
   "https://autoreporter.onrender.com/login"
  );
  // "https://autoreporter.onrender.com/login"  "http://localhost:3000/login"

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

       //google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">
        <button className='button4'>
        Go Back
        </button>
        </Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Login with Exodus Account to Continue</h1>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <br/>
      <img className="signedIn" src={exodus} alt="Exodus logo"></img>
      <footer></footer>
    </>
  );
};

export default Login;