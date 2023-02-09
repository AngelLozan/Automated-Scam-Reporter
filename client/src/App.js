import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GeneralGoogle, Landing, Login, Signup, Home, TikTok, CloudFlare, Youtube } from "./screens";
import Navbar from './components/Navbar.js';

const App = () => {
    const [user, setUser] = useState({});
    const [showNav, setShowNav] = useState(false);


  useEffect(() => {
    const theUser = localStorage.getItem("user");
    console.log(theUser)

    if (theUser && !theUser.includes("undefined")) {
      console.log(theUser)
      setUser(JSON.parse(theUser));
      setShowNav(true)
    }
  }, []);

    return (

      <BrowserRouter>

      { showNav && 

      <Navbar />

      }
      

      <Routes>

      <Route
      path="/"
      element={user?.email ? <Navigate to="/home" /> : <Landing />}
      />
      <Route
        path="/signup"
        element={user?.email ? <Navigate to="/home" /> : <Signup />}
      />
      <Route
        path="/login"
        element={user?.email ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/home"
        element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
      />
      <Route
        path="/generalgoogle"
        element={user?.email ? <GeneralGoogle user={user} /> : <Navigate to="/generalgoogle" />}
      />
      <Route
        path="/youtube"
        element={user?.email ? <Youtube user={user} /> : <Navigate to="/youtube" />}
      />
      <Route
        path="/cloudflare"
        element={user?.email ? <CloudFlare user={user} /> : <Navigate to="/cloudflare" />}
      />

      </Routes>
    </BrowserRouter>

    );
};

export default App;