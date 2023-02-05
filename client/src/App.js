import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GeneralGoogle, Landing, Login, Signup } from "./screens";

const App = () => {
    const [user, setUser] = useState({});


  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      console.log(theUser)
      setUser(JSON.parse(theUser));
    }
  }, []);

    return (

      <BrowserRouter>
      <Routes>

      <Route
      path="/"
      element={user?.email ? <Navigate to="/generalgoogle" /> : <Landing />}
      />
      <Route
        path="/signup"
        element={user?.email ? <Navigate to="/generalgoogle" /> : <Signup />}
      />
      <Route
        path="/login"
        element={user?.email ? <Navigate to="/generalgoogle" /> : <Login />}
      />
      <Route
        path="/generalgoogle"
        element={user?.email ? <GeneralGoogle user={user} /> : <Navigate to="/" />}
      />

      </Routes>
    </BrowserRouter>

    );
};

export default App;