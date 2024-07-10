import React, { useState } from "react";
import '../styles/chatInput.css';

const InputChat = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) {
      return; // Jangan mengirim pesan kosong
    }

    try {
      const response = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log(data.message); // Untuk memeriksa pesan balasan dari server
      setMessage(''); // Setel ulang pesan setelah dikirim
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="">
      <div>
        <label htmlFor="ChatInput" className="sr-only">
          Chat input
        </label>

        <div className="chat overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700">
          <textarea
            id="ChatInput"
            className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm dark:bg-gray-800 dark:text-white"
            rows={4}
            placeholder="Enter your message..."
            value={message}
            onChange={handleChange}
          />
        </div>
        <div>
            <img className="send cursor-pointer" src="../../images/send.png" width={30} alt="Send" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default InputChat;
