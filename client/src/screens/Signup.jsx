import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import exodus from '../EXODUS_symbol_colour.png'

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {
  const { handleGoogle, loading, error } = useFetch(
   "https://autoreporter.onrender.com/signup"

  );
  // "http://localhost:3000/signup" "https://autoreporter.onrender.com/signup"

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
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
        <h1>Register with Exodus Account to Continue</h1>
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
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
       <br/>
      <img className="signedIn" src={exodus} alt="Exodus logo"></img>
      <footer></footer>
    </>
  );
};

export default SignUp;