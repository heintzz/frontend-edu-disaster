import { Caesar_Dressing } from 'next/font/google';

import Image from 'next/image';
import arrowNext from '../../public/arrowNext.svg';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function NextButton({ next }) {
  return (
    <button
      onClick={next}
      className="absolute bottom-3 lg:bottom-9 right-4 flex items-center gap-x-2 bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl"
    >
      <span className={caesarDressing.className}>Lanjut</span>
      <Image src={arrowNext} alt="back icon" className="w-6 h-6" />
    </button>
  );
}
