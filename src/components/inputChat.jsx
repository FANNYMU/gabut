import React, { useState } from 'react';

const InputChat = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.log('Message is empty');
      return; // Jangan mengirim pesan kosong
    }

    try {
      const response = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, user_id: 1 }), // Tambahkan user_id yang sesuai
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Message sent:', data.message); // Untuk memeriksa pesan balasan dari server
        setMessage(''); // Setel ulang pesan setelah dikirim
      } else {
        console.error('Error from server:', data.error);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-lg mx-auto flex items-center">
        <textarea
          className="flex-1 resize-none border-none focus:ring-0 p-3 text-sm dark:text-white dark:bg-gray-800"
          rows={1}
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mr-2" onClick={handleSendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputChat;
