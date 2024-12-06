import React, { useState } from 'react';

const InputChat = () => {
  const [message, setMessage] = useState('');

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  async function fetchUserID(username) {
    try {
      const response = await fetch(`http://localhost:3000/api/get-user-id?username=${username}`);
      const data = await response.json();
      if (response.ok) {
        return data.user_id;
      } else {
        console.error('Error fetching user ID:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
    }
    return null;
  }

  const handleSendMessage = async () => {
    const username = getCookie('username');
    if (!username) {
      console.error('Username not found');
      return;
    }

    const userID = await fetchUserID(username);
    if (!userID) {
      console.error('User ID could not be retrieved');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, user_id: userID }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('');
      } else {
        console.error('Error from server:', data.error);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-lg mx-auto flex items-center p-2 gap-2">
        {/* Emoji Button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Attachment Button */}
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Message Input */}
        <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-lg focus:outline-none"
            placeholder="Type a message"
            value={message}
            onChange={handleChange}
          />
        </div>

        {/* Microphone/Send Button */}
        <button 
          className="p-2 text-white bg-teal-500 rounded-full hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
          onClick={handleSendMessage}
        >
          {message ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputChat;
