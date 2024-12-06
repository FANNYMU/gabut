import React from "react";
const HeaderLeft2 = () => {
  return (
    <div className="flex p-3 justify-between bg-[#202C33]">
      <img
        src="../../images/profile.jfif"
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