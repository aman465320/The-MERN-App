import React, { useEffect, useState, useContext } from "react";
import ContactItem from "../components/Items/ContactItems";
import { UserContext } from "../App";
import "bootstrap/dist/css/bootstrap.css";
const Contact = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [mssg, setMssg] = useState("");

  const loadContactPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData(data);
      dispatch({ type: "USER", payload: true });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadContactPage();
  },[]);

  // data storage from the form to db
  const handleChange = (event) => {
    setMssg(event.target.value);
  };


  // sending data to backend
  const submitForm = async (event) => {
    event.preventDefault();
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mssg,
      }),
    });
    const data = await res.json();
    console.log(res);
    if (!data) {
      console.log("message not sent");
    } else {
      window.alert("message sent");
      setMssg("");
    }
  };

  return (
    <>
      <div className="contact-info mt-5">
        <div className="container-fluid contact-row-container d-grid">
          <div className="row justify-content-evenly">
            <ContactItem
              text="Phone"
              description="+9876543210"
              icon="fa-solid fa-phone"
            />
            <ContactItem
              text="Email"
              description="abcd@gmail.com"
              icon="fa-solid fa-envelope"
            />
            <ContactItem
              text="Address"
              description="New Delhi , India"
              icon="fa-solid fa-location-dot"
            />
          </div>
        </div>
      </div>

      <div className="contact-form mt-5 d-flex justify-content-center align-items-center">
        <div className="container row ">
          <div className="container col-lg-8 col-md-12 col-sm-12 px-5 py-4 contact-form-content shadow">
            <form method="POST" id="contact_form">
              <h3 className="contact-form-title mb-5">Get In Touch</h3>
              <div className="row g-3">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <input
                    type="text"
                    name="name"
                    id=""
                    value={userData.name}
                    placeholder="Name"
                    className="form-control"
                    required="true"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <input
                    type="email"
                    name="email"
                    id=""
                    value={userData.email}
                    placeholder="Email"
                    className="form-control"
                    required="true"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <input
                    type="number"
                    name="phone"
                    id=""
                    value={userData.phone}
                    placeholder="Phone"
                    className="form-control"
                    required="true"
                  />
                </div>
              </div>

              <div className="row ">
                <div class="mb-3 mt-4">
                  <textarea
                    class="form-control"
                    id="textarea"
                    name="message"
                    rows="6"
                    value={mssg}
                    onChange={handleChange}
                    placeholder="Message"
                    required="true"
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-3 btn"
                    onClick={submitForm}
                    style={{
                      backgroundColor: "rgb(62, 119, 241)",
                      color: "white",
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
