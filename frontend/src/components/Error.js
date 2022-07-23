import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
const Error = () => {
  return (
    <>
      <div id="not-found">
        <div className="not-found">
          <div className="notfound-inner">
            <h1>404</h1>
            <h2>Page not found !</h2>
            <p className="mb-5">
              The page you are looking for might have been removed , had its
              name changed or is temporarily unavailable
            </p>
            <NavLink to="/" className="return-to-homepage p-2 ">
              Return To Homepage
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
