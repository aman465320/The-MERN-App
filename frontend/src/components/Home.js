import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setLogin] = useState(false);
  const loadHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "USER", payload: true });
      setUserName(data.name);
      setLogin(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHomePage();
  });

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="home-page-title">WELCOME</p>
          <h1>{userName}</h1>
          <h1 className="home-page-info">
            {" "}
            {isLoggedIn ? "Glad you are back" : "This is the MERN website"}
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
