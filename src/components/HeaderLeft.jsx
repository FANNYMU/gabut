import React from "react";
import "../styles/header.css";

const HeaderLeft = () => {
  return (
    <div className=" header flex">
      <div className="nothing">
        <img
          className="profile"
          src="https://pps.whatsapp.net/v/t61.24694-24/414745925_344055648531278_8730573416145111208_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIHEc6DJUSTx46d5kqUIO0UFH1lWjCvl2uNOrEl26OOSW&oe=6697D2BC&_nc_sid=e6ed6c&_nc_cat=109"
          width={41}
          alt=""
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="">
        <img className="community" src="../../images/community.png" alt="" width={35} />
      </div>
      <div>
        <img className="status" src="../../images/status.png" alt="" />
      </div>
      <div>
        <img className="news" src="../../images/newsletter.png" alt=""  width={30}/>
      </div>
      <div>
        <img className="message" src="../../images/new-message.png" alt=""  />
      </div>
      <div>
        <img className="menu" src="../../images/menu.png" alt="" />
      </div>
    </div>
  );
};

export default HeaderLeft;
