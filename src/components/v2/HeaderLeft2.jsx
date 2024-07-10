import React from "react";
const HeaderLeft2 = () => {
  return (
    <div className="flex p-3 justify-between bg-[#202C33]">
      <img
        src="https://pps.whatsapp.net/v/t61.24694-24/414745925_344055648531278_8730573416145111208_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIHEc6DJUSTx46d5kqUIO0UFH1lWjCvl2uNOrEl26OOSW&oe=6697D2BC&_nc_sid=e6ed6c&_nc_cat=109"
        className="w-10 rounded-full"
      />
      <div className="flex items-center gap-x-4">
        <img src="../../images/community.png" className="h-7 w-7" />
        <img src="../../images/status.png" className="h-6 w-6" />
        <img src="../../images/newsletter.png" className="h-6 w-6" />
        <img src="../../images/new-message.png" className="h-6 w-6" />
        <img src="../../images/menu.png" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default HeaderLeft2;
