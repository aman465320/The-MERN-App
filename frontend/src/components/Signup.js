import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import signpic from "../images/singnup.jpg";
// import axios from "axios";
const Signup = () => {
  const history = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  function handleChange(event) {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
  }

  const postData = async (event) => {
    event.preventDefault();
    const { name, email, phone, work, password, cpassword } = userData;
    const res = await fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    // const res = await axios.post("/register", {
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    // });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Registeration Failed");
      console.log("Failed registeration");
    } else {
      window.alert("Registeration Success ");
      console.log(" Success registeration");
      history("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5 signup-container">
          <div className="signup-content d-grid p-5">
            <div className="row">
              <div className="col-md-6 col-sm-12 signup-form">
                <h3 className="form-title mb-3">Sign up</h3>

                <form
                  className="register-form"
                  id="register-form"
                  method="post"
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <i class="zmdi zmdi-account e"></i>
                    </label>
                    <input
                      className="form-input m-2 p-1"
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      onChange={handleChange}
                      value={userData.name}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i class="zmdi zmdi-email "></i>
                    </label>
                    <input
                      className="form-input m-2 p-1"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      onChange={handleChange}
                      value={userData.email}
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <i class="zmdi zmdi-phone"></i>
                    </label>
                    <input
                      className="form-input m-2 p-1"
                      type="number"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      onChange={handleChange}
                      value={userData.phone}
                      placeholder="Your Phone Number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work">
                      <i class="zmdi zmdi-slideshow"></i>
                    </label>
                    <input
                      className="form-input m-2 p-1"
                      type="text"
                      name="work"
                      id="work"
                      autoComplete="off"
                      onChange={handleChange}
                      value={userData.work}
                      placeholder="Your Profession"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <i class="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      className="form-input m-2 p-1"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      onChange={handleChange}
                      value={userData.password}
                      placeholder="Your Password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <i class="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      className="form-input m-2 p-1"
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      onChange={handleChange}
                      value={userData.cpassword}
                      placeholder="Confirm password"
                    />
                  </div>
                  <div className="form-group form-button d-flex justify-content-start">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit m-3 "
                      value="Register"
                      onClick={postData}
                    />
                  </div>
                </form>

                {/* <SignupForm /> */}
              </div>
              <div className="col-md-6 col-sm-12 signup-image">
                <figure>
                  <img
                    src={signpic}
                    alt="registeration-image"
                    className="img-responsive img-fluid"
                  />
                </figure>
                <span className="signup-image-link ">
                  Already Registered ?{" "}
                  <NavLink to="/login" className="signup-image-link ">
                    <br />
                    <span className="login-redirect">Login</span>
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
