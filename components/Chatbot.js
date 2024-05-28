'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import enums from '@/enums/enum';
import { ChatbotServices } from '@/services/chatbot.services';
import toast from 'react-hot-toast';

const cleanResponseData = (input) => {
  const text = input.replace(/```html\s([\s\S]*?)```/, '$1');
  return text;
};

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [waitingChatbotResponse, setWaitingChatbotResponse] = useState(false);

  const askChatbot = async () => {
    try {
      const response = await ChatbotServices.requestChatbot(message);
      const textResponse = response.data.candidates[0].content.parts[0].text;
      const chatHistory = JSON.parse(localStorage.getItem('chatbot_edudisaster')) || [];
      const newChatHistory = [...chatHistory, { type: enums.PERSON.BOT, message: textResponse }];

      setChatHistory(newChatHistory);
      localStorage.setItem('chatbot_edudisaster', JSON.stringify(newChatHistory));
    } catch (error) {
      toast.error('Chatbot tidak merespons');
    } finally {
      setWaitingChatbotResponse(false);
    }
  };

  const handleSend = () => {
    if (waitingChatbotResponse) return;

    setWaitingChatbotResponse(true);

    if (message.trim()) {
      setMessage('');
      const chatHistory = JSON.parse(localStorage.getItem('chatbot_edudisaster')) || [];
      const newChatHistory = [...chatHistory, { type: enums.PERSON.USER, message }];

      setChatHistory(newChatHistory);
      localStorage.setItem('chatbot_edudisaster', JSON.stringify(newChatHistory));

      askChatbot();
    }
  };

  useEffect(() => {
    const histories = localStorage.getItem('chatbot_edudisaster');
    if (histories) {
      setChatHistory(JSON.parse(histories));
    }
  }, []);

  return (
    <div className="mt-[5vh] fixed inset-0 bg-black bg-opacity-75 flex justify-end z-50">
      <div className="w-2/4 h-full bg-[#253333] flex flex-col gap-5 px-4 py-4 relative">
        <div className="w-full h-4/5 flex flex-col gap-8 text-white overflow-y-auto px-4">
          {chatHistory.map((item, index) => (
            <div
              key={index}
              className={
                item.type === enums.PERSON.BOT
                  ? 'w-5/6 self-start text-left'
                  : 'w-3/4 self-end text-right'
              }
            >
              {item.type === enums.PERSON.BOT && (
                <>
                  <span className="font-bold">Jawaban: </span>
                  <br />
                </>
              )}
              <div dangerouslySetInnerHTML={{ __html: cleanResponseData(item.message) }} />
            </div>
          ))}
          {waitingChatbotResponse && (
            <div className="w-5/6 self-start text-left animate-pulse">
              <div className="h-16 bg-gray-500 rounded-md mb-2"></div>
            </div>
          )}
        </div>
        <div className="w-full h-1/5 border border-[#999999] rounded-lg text-white relative p-2 bg-black">
          <textarea
            className="w-[90%] h-full bg-transparent border-none outline-none resize-none text-white p-2"
            placeholder="Type your message here..."
            value={message}
            onInput={(e) => setMessage(e.target.value)}
            disabled={waitingChatbotResponse}
          />
          <Image
            src={'/send.svg'}
            alt="send button"
            width={20}
            height={20}
            className="absolute right-4 top-4 cursor-pointer"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
