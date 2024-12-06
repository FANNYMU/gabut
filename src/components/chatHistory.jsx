import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../context/authContext';

const ChatHistory = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);

  // Fetch current username from cookie
  const currentUsername = Cookies.get('username');

  // Fungsi untuk mengambil pesan dari server
  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:3000/chats');
      const data = await response.json();
      // console.log(data); // Log the entire chat data fetched from the server
      setChats(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Menggunakan useEffect untuk menjalankan polling
  useEffect(() => {
    const interval = setInterval(fetchChats, 2000);
    return () => clearInterval(interval);
  }, []);

  const chatContainerRef = useRef(null);

  // Otomatis scroll ke bawah saat ada pesan baru
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSendMessage = async (event) => {
    const message = event.target.innerHTML;
    if (message.trim()) {
      try {
        const response = await fetch('http://localhost:3000/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, username: user.username }),
        });

        const data = await response.json();
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    }
  };

  return (
    <div 
      className="h-[calc(100vh-120px)] overflow-y-auto"
      ref={chatContainerRef}
    >
      <div className="p-4 space-y-1">
        {chats.length > 0 ? (
          chats.map((chat, index) => {
            const isFirstMessage = index === 0 || chats[index - 1].username !== chat.username;
            const isLastMessage = index === chats.length - 1 || chats[index + 1].username !== chat.username;
            const isMyMessage = chat.username === currentUsername;
            
            return (
              <div key={index} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}> 
                <div 
                  className={`
                    relative max-w-[65%] px-3 py-2 
                    ${isMyMessage ? 'bg-[#005C4B] ml-1' : 'bg-[#202C33] mr-1'}
                    ${isFirstMessage ? 'rounded-t-md' : ''}
                    ${isLastMessage ? 'rounded-b-md' : ''}
                    ${!isFirstMessage && !isLastMessage ? 'rounded-none' : ''}
                    ${isFirstMessage && isLastMessage ? 'rounded-md' : ''}
                  `}
                >
                  {!isMyMessage && (
                    <span className="block text-[#00A884] text-xs leading-5 font-medium">
                      {chat.username}
                    </span>
                  )}
                  <div className="text-[#E9EDEF] text-sm leading-5 font-normal break-words">
                    {chat.message}
                    <span className="inline-block text-[#8696A0] text-xs ml-1 leading-4 min-w-[50px] text-right align-bottom">
                    {chat.created_at ? new Date(chat.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    }) : 'N/A'}
                  </span>
                  </div>
                  {/*  */}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-[#8696A0] text-sm">No messages yet</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
