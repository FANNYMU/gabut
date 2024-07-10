import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatHistory = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/chats'); // Ganti URL dengan endpoint yang sesuai
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Chat History</h2>
      <div className="overflow-y-auto max-h-96">
        {chats.map(chat => (
          <div key={chat.id} className={`mb-4 ${chat.username === 'myusername' ? 'myChat' : 'otherChat'}`}>
            <div className="flex items-center mb-1">
              <div className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center text-white mr-2">
                {chat.username.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold">{chat.username}</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-2">
              <p className="text-sm">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
