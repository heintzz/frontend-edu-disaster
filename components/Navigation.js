'use client'

import React, { useState } from 'react';
import enums from '@/enums/enum';
import Link from 'next/link';
import { BsChatRightDots } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';
import Chatbot from '@/components/Chatbot';

const Navigation = ({ existedUser }) => {
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  const closeChatbot = () => {
    setChatbotVisible(false);
  };

  return (
    <div className='flex flex-col items-end'>
      <div
        className="w-full h-[5vh] flex items-center justify-between px-5 py-2 fixed z-[100]"
        style={{
          backgroundImage: 'linear-gradient(to right, #29ADB2, #2C2C2C)',
        }}
      >
        {existedUser ? (
          <Link href={existedUser.role === enums.ROLE.TEACHER ? '/dashboard/kelas' : '/profil'}>
            <FaRegCircleUser color="white" className="w-6 h-6" />
          </Link>
        ) : (
          <Link href="/login" className="text-white rounded-lg text-md font-semibold ">
            Login
          </Link>
        )}
        <BsChatRightDots color="white" className="w-6 h-6 cursor-pointer" onClick={toggleChatbot} />
      </div>
      {chatbotVisible && <Chatbot onClose={closeChatbot} />}
    </div>
  );
};

export default Navigation;
