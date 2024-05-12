'use client';

import dynamic from 'next/dynamic';
import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import arrow from '../../public/arrowBack.svg';

import { BsChatRightDots } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';
import Link from 'next/link';

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

const caesar_dressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

const BackToHomeButton = ({ onClick }) => {
  return (
    <button
      className={`flex items-center gap-x-2 ${caesar_dressing.className} bg-[#29ADB2] text-white font-bold py-2 px-4 rounded-[10px] text-2xl`}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '100px',
        left: '60px',
        zIndex: 1000,
      }}
    >
      <Image src={arrow} alt="back icon" className="w-6 h-6" />
      <span>Ke Halaman Utama</span>
    </button>
  );
};

const BackButton = () => {
  return (
    <button
      className={`flex items-center gap-x-2 ${caesar_dressing.className} bg-[#29ADB2] text-white font-bold py-2 px-4 rounded-[10px] text-2xl`}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '60px',
        zIndex: 1000,
      }}
    >
      <Image src={arrow} alt="back icon" className="w-6 h-6" />
      <span>Kembali</span>
    </button>
  );
};

const Navigation = () => {
  return (
    <div
      className="fixed w-full h-20 items-center z-[1000] flex justify-between px-5"
      style={{
        backgroundImage: 'linear-gradient(to right, #29ADB2, #2C2C2C)',
      }}
    >
      <FaRegCircleUser color="white" size={32} />
      <BsChatRightDots color="white" size={32} />
    </div>
  );
};

export default function HalamanPeta() {
  return (
    <main>
      <Navigation />
      <DynamicMap />
      <Link href="/">
        <BackToHomeButton />
      </Link>
      <Link href="/">
        <BackButton />
      </Link>
    </main>
  );
}
