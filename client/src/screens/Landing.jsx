import React from "react";
import { Link } from "react-router-dom";
import logo from '../ban.png';
import '../App.css';


const Landing = () => {
  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Sign In to Ban Scammers</h1>
        <p>Initial session user please choose 👉 Sign up</p>
      </header>

      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Link
          to="/signup"
        >
        <button className='button5'>
          Sign Up
          </button>
        </Link>
        <Link
          to="/login"
        >
         <button className='button4'>
          Login
           </button>
        </Link>
      </main>
      <img src={logo} style={{ display: "block",  marginRight: "auto", marginLeft: "auto", marginTop:'5%', width: "40%" }} alt="logo" />
    </>
  );
};

export default Landing;