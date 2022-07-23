import React from "react";

const ContactItems = (props) => {
  return (
    <>
      <div className="col-lg-3 col-md-10 col-sm-10 contact-info-item p-4">
        <div className="contact-info-icon">
          {" "}
          <i class={props.icon}></i>
        </div>
        <div className="contact-info-more mx-4">
          {props.text}
          <div className="contact-info-description">{props.description}</div>
        </div>
      </div>
    </>
  );
};

export default ContactItems;
