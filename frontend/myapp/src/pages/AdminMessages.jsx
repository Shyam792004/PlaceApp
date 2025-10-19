import React, { useEffect, useRef, useState } from 'react';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(stored);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleReply = () => {
    if (!reply.trim()) return;

    const newMessage = {
      from: 'admin',
      text: reply,
      time: new Date().toLocaleString(),
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem('messages', JSON.stringify(updated));
    setReply('');
  };

  const handleClearMessages = () => {
    if (window.confirm('Are you sure you want to clear all messages? This will clear messages for both admin and user.')) {
      setMessages([]);
      localStorage.removeItem('messages');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleReply();
    }
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto h-[85vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-violet-700">User Messages</h2>
        {messages.length > 0 && (
          <button
            onClick={handleClearMessages}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          >
            Clear All Messages
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 border rounded-lg px-4 py-2 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No messages yet. Waiting for user messages...
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow text-sm ${
                  msg.from === 'admin'
                    ? 'bg-green-100 text-right'
                    : 'bg-violet-100 text-left'
                }`}
              >
                <p className="text-base font-medium">{msg.text}</p>
                <span className="text-gray-500 text-xs block mt-1">{msg.time}</span>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef}></div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your reply..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={handleReply}
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default AdminMessages;