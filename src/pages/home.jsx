import React from "react";
import '../styles/home.css';
import HeaderLeft from "../components/HeaderLeft";
import Search from "../components/search";
import Content from "../components/content";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto flex">
            <div className="border border-gray-300 leftbar">
                <HeaderLeft/>
                <Search/>
                <div className="under translate-y-6"></div>
                <div className="content cursor-pointer">
                    <Content/>
                </div>
                <div className="under translate-y-6"></div>
            </div>
            <div className="border border-gray-300 rightbar">
                
            </div>
      </div>
    </div>
  );
}
