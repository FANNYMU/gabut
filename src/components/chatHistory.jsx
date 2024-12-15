import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";

const ChatHistory = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = (chatId) => {
    setShowConfirm(true); // Tampilkan modal konfirmasi
    setShowOptions(null); // Sembunyikan dropdown
  };

  // Fetch current username from cookie
  const currentUsername = Cookies.get("username");

  // Fungsi untuk mengambil pesan dari server
  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:3000/chats");
      const data = await response.json();
      // console.log(data); // Log the entire chat data fetched from the server
      setChats(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSendMessage = async (event) => {
    const message = event.target.innerHTML;
    if (message.trim()) {
      try {
        const response = await fetch("http://localhost:3000/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, username: user.username }),
        });

        const data = await response.json();
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await fetch(`http://localhost:3000/chat/${chatId}`, {
        method: "DELETE",
      });
      setShowConfirm(false); // Tutup modal
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId)); // Update UI
    } catch (error) {
      console.error("Error deleting chat:", error);
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
            const isFirstMessage =
              index === 0 || chats[index - 1].username !== chat.username;
            const isLastMessage =
              index === chats.length - 1 ||
              chats[index + 1].username !== chat.username;
            const isMyMessage = chat.username === currentUsername;

            return (
              <div
                key={index}
                className={`flex ${
                  isMyMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    relative max-w-[65%] px-3 py-2 
                    ${isMyMessage ? "bg-[#005C4B] ml-1" : "bg-[#202C33] mr-1"}
                    ${isFirstMessage ? "rounded-t-md" : ""}
                    ${isLastMessage ? "rounded-b-md" : ""}
                    ${!isFirstMessage && !isLastMessage ? "rounded-none" : ""}
                    ${isFirstMessage && isLastMessage ? "rounded-md" : ""}
                  `}
                >
                  {!isMyMessage && (
                    <>
                      {chat.username === "admin" ? (
                        <span className="block text-[#F00] text-xs leading-5 font-medium">
                          {`[ADMIN]`}
                        </span>
                      ) : chat.username === "owner" ? (
                        <span className="block text-[#89CFF0] text-xs leading-5 font-medium">
                          {`[👑OWNER👑]`}
                        </span>
                      ) : (
                        <span className="block text-[#00A884] text-xs leading-5 font-medium">
                          {chat.username}
                        </span>
                      )}
                    </>
                  )}
                  <div className="text-[#E9EDEF] text-sm leading-5 font-normal break-words">
                    {chat.message}
                    <span className="inline-block text-[#8696A0] text-xs ml-1 leading-4 min-w-[50px] text-right align-bottom">
                      {chat.created_at
                        ? new Date(chat.created_at).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                  {/* delete */}
                  <div className="relative group translate-x-[-3rem]">
                    {/* Tombol menu */}
                    <button
                      onClick={() =>
                        setShowOptions((prev) =>
                          prev === chat.chat_id ? null : chat.chat_id
                        )
                      }
                      className="text-[#8696A0] hover:text-[#00A884] p-2 rounded-full transition-all duration-200 flex items-center"
                    >
                      {/* Ikon panah ke bawah */}
                      <span
                        className={`ml-1 text-sm transition-transform duration-300 ${
                          showOptions === chat.chat_id
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Dropdown menu */}
                    {showOptions === chat.chat_id && (
                      <div className="absolute right-0 top-10 bg-[#111B21] text-[#D9DEE0] text-sm rounded-md shadow-lg z-50">
                        <button
                          onClick={() => confirmDelete(chat.chat_id)}
                          className="block w-full text-left px-4 py-2 hover:bg-[#202C33] hover:text-white rounded-md transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {/* Modal Konfirmasi */}
                    {showConfirm && (
                      <div className="fixed flex items-center justify-center bg-black bg-opacity-60 z-50 translate-x-[-30rem]">
                        <div className="bg-[#1c1e21] text-white p-8 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 scale-100 hover:scale-105">
                          <p className="text-lg font-semibold text-center mb-6">
                            Are you sure you want to delete this chat?
                          </p>
                          <div className="flex justify-around">
                            <button
                              onClick={() => handleDeleteChat(chat.chat_id)}
                              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 w-full mr-2"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowConfirm(false)}
                              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 w-full"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* delete */}
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
