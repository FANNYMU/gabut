import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ChatHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  // Fungsi untuk mengambil pesan dari server
  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:3000/chats');
      const data = await response.json();
      console.log('Fetched chats:', data);
      setChats(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Menggunakan useEffect untuk menjalankan polling
  useEffect(() => {
    const interval = setInterval(fetchChats, 2000); // Setel interval polling di sini (contoh: setiap 2 detik)
    return () => clearInterval(interval); // Bersihkan interval pada unmount atau perubahan deps
  }, []); // [] berarti useEffect hanya dijalankan sekali setelah mount

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
          body: JSON.stringify({ message, username: currentUser.username }), // Menggunakan currentUser dari useContext
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Message sent:', data.message); // Untuk memeriksa pesan balasan dari server
        } else {
          console.error('Error from server:', data.error);
        }
      } catch (err) {
        console.error('Failed to send message:', err);
        // Handle error
      }
    }
  };

  return (
    <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }} ref={chatContainerRef}>
      <div className="chat-history p-4 space-y-2">
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <div key={index} className={`flex ${chat.sentByMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`bg-gray-100 p-2 rounded-lg ${chat.sentByMe ? 'bg-blue-200 self-end' : 'bg-gray-200'}`}>
                <strong className="font-bold">{chat.sentByMe ? currentUser.username : chat.username}: </strong>{chat.message}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No chats available</div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
