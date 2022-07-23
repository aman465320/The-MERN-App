import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import defaultPic from "../images/deafault_profile.jpg";

import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "../App";

const About = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
  });

  const loadAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      dispatch({ type: "USER", payload: true });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history("/login");
    }
  };

  useEffect(() => {
    loadAboutPage();
  });

  return (
    <>
      <div className="container user-profile d-flex justify-content-center align-items-center">
        <form method="GET" className="profile-form px-5 pt-3">
          <div className="row">
            <div className="col-md-4 col-sm-12 profile-pic mb-2">
              <img
                src={defaultPic}
                alt="profile pic"
                className="img-fluid img-responsive profile-img "
              />
            </div>

            <div className="col-md-8 col-sm-12">
              <div className="profile-head">
                <h5 className="mb-3">{userData.name}</h5>
                <h6 style={{ color: "#3E77F1" }}>{userData.work}</h6>

                <NavLink to="/edit">
                  <input
                    type="submit"
                    className="profile-edit-btn"
                    value="Edit Profile"
                    name="btnAddMore"
                  />
                </NavLink>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            {/* left side url*/}
            <div className="col-md-5 col-sm-12">
              <div className="profile-work">
                <p>WORK LINK</p>
                <NavLink to="/linking">Youtube </NavLink> <br />
                <NavLink to="/linking">Instagram </NavLink> <br />
                <NavLink to="/linking">Facebook </NavLink> <br />
                <NavLink to="/linking">Twitter </NavLink> <br />
                <NavLink to="/linking">Github </NavLink> <br />
                <NavLink to="/linking">LinkedIn </NavLink> <br />
                <br />
              </div>
            </div>

            {/*right side data toggle  */}
            <div className="col-md-7 col-sm-12">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                    href="#home"
                  >
                    About
                  </a>
                </li>
                {/* 
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    id="profile-tab"
                    data-toggle="tab"
                    role="tab"
                    href="#profile"
                  >
                    Timeline
                  </a>
                </li> */}
              </ul>

              <div className="pl-5 my-3 about-info">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label className="label-1">User ID</label>
                      </div>
                      <div className="col-md-6">
                        <label className="label-2">{userData._id}</label>
                      </div>
                    </div>

                    <div className="row mt-1">
                      <div className="col-md-6">
                        <label className="label-1">Name</label>
                      </div>
                      <div className="col-md-6">
                        <label className="label-2">{userData.name}</label>
                      </div>
                    </div>

                    <div className="row mt-1">
                      <div className="col-md-6">
                        <label className="label-1">Email</label>
                      </div>
                      <div className="col-md-6">
                        <label className="label-2">{userData.email}</label>
                      </div>
                    </div>

                    <div className="row mt-1">
                      <div className="col-md-6">
                        <label className="label-1">Phone</label>
                      </div>
                      <div className="col-md-6">
                        <label className="label-2">{userData.phone}</label>
                      </div>
                    </div>

                    <div className="row mt-1">
                      <div className="col-md-6">
                        <label className="label-1">Profession</label>
                      </div>
                      <div className="col-md-6">
                        <label className="label-2">{userData.work}</label>
                      </div>
                    </div>
                  </div>

                  {/* <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>Beginner</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>105/hr</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Total projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>10</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Spoken English</label>
                      </div>
                      <div className="col-md-6">
                        <p>Intermediate</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Avalability</label>
                      </div>
                      <div className="col-md-6">
                        <p>12 Months</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
