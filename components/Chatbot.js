'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const Chatbot = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Pesan terkirim:', message);
      setMessage('');
    }
  };

  return (
    <div className='mt-[5vh] fixed inset-0 bg-black bg-opacity-75 flex justify-end z-50'>
      <div className='w-1/4 h-full bg-[#253333] flex flex-col gap-5 px-4 py-4 relative'>
        <div className="w-full h-4/5 flex flex-col gap-8 text-white overflow-y-auto">
          {/* {chatHistory.map((item, index) => (
            <p key={index} className={item.type === 'bot' ? "w-5/6 self-start text-left" : "w-3/4 self-end text-right"}>
              {item.message}
            </p>
          ))} */}
          <p className="w-3/4 self-end text-right">Apa itu patahan dalam konteks gempa bumi</p>
          <p className="w-5/6 self-start text-left">
            <span className='font-bold'>Jawaban: </span>
            <br />
            Dalam konteks gempa bumi, patahan atau sesar adalah bidang rekahan di kerak bumi di mana terjadi pergeseran atau pergerakan relatif antar blok batuan.
          </p>
        </div>
        <div className="w-full h-1/5 border border-[#999999] rounded-lg text-white relative p-2 bg-black">
          <textarea
            className="w-[90%] h-full bg-transparent border-none outline-none resize-none text-white p-2"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Image 
            src={"/send.svg"}
            alt='send button'
            width={20}
            height={20}
            className='absolute right-4 top-4 cursor-pointer'
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
