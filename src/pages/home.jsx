import React, { useRef } from "react";
import { useAuth } from "../context/authContext";
import "../styles/home.css";
import Content from "../components/content";
import InputChat from "../components/inputChat";
import ChatHistory from "../components/chatHistory";
import HeaderLeft from "../components/HeaderLeft";
import Search from "../components/search";
import ContentRight from "../components/ContentRight";

function ReloadChat(ref) {
  ref.current.classList.remove("RemoveThisClass");
  ref.current.classList.add("AddThisClass");
}

function AddClassToRemoveI(addRef) {
  addRef.current.classList.add("ds");
}

export default function Home() {
  const removeRef = useRef(null);
  const addRef = useRef(null);
  const { user, logout } = useAuth();

  const handleRemoveClick = () => {
    ReloadChat(removeRef);
    AddClassToRemoveI(addRef);
  };

  return (
    <div>
      <div className="container mx-auto flex">
        <div className="border border-gray-300 leftbar max-w-[30%] bg-[#111B21]">
          {/* <div className="flex justify-between items-center p-4 bg-[#202C33]">
            <button 
              onClick={logout}
              className="px-4 py-2 text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm"
            >
              Logout
            </button>
          </div> */}
          <HeaderLeft />
          <Search />
          <div className="under translate-y-6"></div>
          <div className="content cursor-pointer" onClick={handleRemoveClick}>
            <Content />
          </div>
          <div className="under translate-y-6"></div>
        </div>
        <div className="border border-gray-300 rightbar ">
          <div id="Remove" ref={removeRef} className="RemoveThisClass">
            <ContentRight />
            <div className="history">
              <ChatHistory />
            </div>
            <div>
              <InputChat />
            </div>
          </div>
          <div id="RemoveI" ref={addRef} className="">
            <div className="flex flex-col items-center justify-center p-4 flex-grow translate-y-80">
              <img
                src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png"
                alt="WhatsApp"
                className="w-40"
              />
              <h2 className="text-2xl mt-6 font-light text-slate-300 text-center">
                Unduh WhatsApp untuk Windows
              </h2>
              <h4 className="text-sm mt-4 max-w-md text-slate-400 text-center">
                Buat panggilan, bagikan layar, dan dapatkan pengalaman lebih
                cepat dengan mengunduh WhatsApp untuk Windows.
              </h4>
              <button className="mt-4 py-2 px-4 bg-[#00a884] rounded-full text-sm font-medium text-white">
                Dapatkan dari Microsoft Store
              </button>
              <p className="mt-4 text-sm text-slate-500 text-center">
                Pesan pribadi Anda terenkripsi secara end-to-end
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
