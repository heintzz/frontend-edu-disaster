import React from 'react';
import { Assistant } from 'next/font/google';

const assistant = Assistant({ subsets: ['latin'], weight: '400' });

export default function DisasterCard({ index, imageSrc, title, description, onClick }) {
  return (
    <div className="relative h-[720px] cursor-pointer" onClick={onClick}>
      <div className="h-full bg-black flex flex-col rounded-3xl relative z-[3]">
        <div
          className="h-[60%] w-full z-[3] bg-red-200 rounded-3xl relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        >
          <div className="h-12 w-12 bg-[#D9D9D9] absolute left-1/2 -translate-x-1/2 grid place-content-center rotate-45 -bottom-6">
            <span className="-rotate-45 font-otomanopee text-[#A65526] text-3xl font-semibold">
              {index}
            </span>
          </div>
        </div>
        <div className="h-[40%] flex flex-col gap-y-10 items-center justify-center w-full relative z-[2] bg-black text-white rounded-b-3xl text-center px-6 py-2">
          <p className="font-otomanopee text-5xl font-semibold">{title}</p>
          <p className={`${assistant.className} text-[22px]`}>{description}</p>
        </div>
      </div>
      <div className="h-full w-full bg-[#29ADB2] blur-md rounded-3xl absolute top-0 z-[2]"></div>
    </div>
  );
}
