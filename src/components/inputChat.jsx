import React from "react";
import '../styles/chatInput.css'

const InputChat = () => {
  return (
    <div className="">
      <div>
        <label htmlFor="OrderNotes" className="sr-only">
          Order notes
        </label>

        <div className="chat overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700">
          <textarea
            id="OrderNotes"
            className=" w-full resize-none border-none align-top focus:ring-0 sm:text-sm dark:bg-gray-800 dark:text-white"
            rows={4} 
            placeholder="Enter any..."
          />
        </div>
        <div>
            <img className="send cursor-pointer" src="../../images/send.png" width={30} alt="" />
        </div>
      </div>
    </div>
  );
};

export default InputChat;

