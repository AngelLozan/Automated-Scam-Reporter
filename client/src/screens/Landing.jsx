import React from "react";
import { Link } from "react-router-dom";
import logo from '../ban.png';
import '../App.css';


const Landing = () => {
  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Sign In to Ban Scammers</h1>
        <p>Initial session user please choose [Sign up]</p>
      </header>

      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            border: "1px solid gray",
            padding: "0.5rem 1rem",
            backgroundColor: "lightgreen",
            color: "#333",
            borderRadius:'3px',
          }}
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            border: "1px solid gray",
            padding: "0.5rem 1rem",
            backgroundColor: "whitesmoke",
            color: "#333",
            borderRadius: '3px',
          }}
        >
          Login
        </Link>
      </main>
      <img src={logo} style={{ display: "block",  marginRight: "auto", marginLeft: "auto", marginTop:'10%', width: "40%" }} alt="logo" />
    </>
  );
};

export default Landing;