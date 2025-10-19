import React, { useEffect, useRef, useState } from 'react';

function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(stored);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      from: 'user',
      text: input,
      time: new Date().toLocaleString(),
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem('messages', JSON.stringify(updated));
    setInput('');
  };

  const handleClearMessages = () => {
    if (alert('Are you sure you want to clear all messages?')) {
      setMessages([]);
      localStorage.removeItem('messages');
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto h-[85vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-violet-700">Your Messages</h2>
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg shadow text-sm ${
                msg.from === 'user'
                  ? 'bg-violet-100 text-right'
                  : 'bg-green-100 text-left'
              }`}
            >
              <p className="text-base font-medium">{msg.text}</p>
              <span className="text-gray-500 text-xs block mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={handleSend}
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default UserMessages;