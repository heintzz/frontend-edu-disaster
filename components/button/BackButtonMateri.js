import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import arrowBack from '../../public/arrowBack.svg';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function BackButtonMateri({ back }) {
  return (
    <button
      onClick={back}
      className="w-fit h-fit flex items-center gap-x-2 bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl"
    >
      <Image src={arrowBack} alt="back icon" className="w-6 h-6" />
      <span className={caesarDressing.className}>Kembali</span>
    </button>
  );
}
