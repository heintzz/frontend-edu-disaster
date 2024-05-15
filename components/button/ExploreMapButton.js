import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import arrowNext from '../../public/arrowNext.svg';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function ExploreMapButton({ disaster }) {
  return (
    <Link href={`/peta?bencana=${disaster}`}>
      <button
        className={`absolute bottom-3 lg:bottom-9 right-4 flex items-center gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl`}
      >
        <span>Jelajahi peta interaktif</span>
        <Image src={arrowNext} alt="next icon" className="w-6 h-6" />
      </button>
    </Link>
  );
}
