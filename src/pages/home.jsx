import React, { useRef } from "react";
import $ from "jquery";
import '../styles/home.css';
import HeaderLeft from "../components/HeaderLeft";
import Search from "../components/search";
import Content from "../components/content";
import ContentRight from "../components/ContentRight";
import InputChat from "../components/inputChat";

function ReloadChat(ref) {
  $(ref.current).removeClass("RemoveThisClass");
}
export default function Home() {
  const removeRef = useRef(null);
  return (
    <div>
      <div className="container mx-auto flex">
            <div className="border border-gray-300 leftbar">
                <HeaderLeft/>
                <Search/>
                <div className="under translate-y-6"></div>
                <div className="content cursor-pointer" onClick={() => ReloadChat(removeRef)}>
                    <Content/>
                </div>
                <div className="under translate-y-6"></div>
            </div>
            <div  className="border border-gray-300 rightbar">
                <div id="Remove" ref={removeRef} className="RemoveThisClass">
                  <ContentRight/>
                  <div>
                    <InputChat/>
                  </div>
                </div>
            </div>
      </div>
    </div>
  );
}

