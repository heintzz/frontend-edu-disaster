import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import arrowNext from '../../public/arrowNext.svg';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function VideoErupsi({ handleNext }) {
  return (
    <>
      <iframe
        className="w-full h-full rounded-3xl"
        src="https://www.youtube.com/embed/b4xlo58FgqY?si=3wo9VkfdUkYo3lvf"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <button
        className={`absolute bottom-3 lg:bottom-9 right-4 flex items-center gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl`}
      >
        <span onClick={handleNext}>Lanjut</span>
        <Image src={arrowNext} alt="back icon" className="w-6 h-6" />
      </button>
    </>
  );
}
