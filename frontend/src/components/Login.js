import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import loginpic from "../images/login.jpg";
import { UserContext } from "../App";
import "bootstrap/dist/css/bootstrap.css";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  let name, value;

  function handleChange(event) {
    name = event.target.name;
    value = event.target.value;
    setuserData({ ...userData, [name]: value });
  }

  const postData = async (event) => {
    event.preventDefault();
    const { email, password } = userData;
    const res = await fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status === 400 || res.status === 422 || !data) {
      window.alert("Login Failed");
      console.log("Login Failed");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Succes");
      console.log("Login Succes");
      history("/");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="container mt-5 signup-container">
          <div className="signup-content d-grid p-5" style={{ width: "70%" }}>
            <div className="row">
              <div className="col-md-6 col-sm-12 signup-form">
                <div className="form-container">
                  <h3 className="form-title mb-5">Sign in</h3>

                  <form
                    method="post"
                    className="register-form"
                    id="register-form"
                  >
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
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
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
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group form-button d-flex justify-content-start">
                      <input
                        type="submit"
                        name="signin"
                        id="signin"
                        className="form-submit m-3 "
                        value="Login"
                        onClick={postData}
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-6 col-sm-12 signup-image">
                <figure>
                  <img
                    src={loginpic}
                    alt="registeration-image"
                    className="img-responsive img-fluid"
                  />
                </figure>
                <span className="signup-image-link ">
                  Not Registered ?{" "}
                  <NavLink to="/signup" className="signup-image-link ">
                    <br />
                    <span className="login-redirect">Sign up</span>
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

export default Login;
