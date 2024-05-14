import { useEffect, useMemo, useState } from 'react';

import { Assistant, Caesar_Dressing } from 'next/font/google';

import Image from 'next/image';
import arrowBack from '../public/arrowBack.svg';
import arrowNext from '../public/arrowNext.svg';

import eruptionImage from '../public/display/erupsi.png';
import Link from 'next/link';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });
const assistant = Assistant({ subsets: ['latin'], weight: '400' });

export default function EruptionContent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const element = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return (
          <>
            <iframe
              className="w-full h-full rounded-3xl"
              src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className={`absolute bottom-3 lg:bottom-9 right-4 flex items-center gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold p-1 lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl`}
            >
              <span onClick={handleNext}>Lanjut</span>
              <Image src={arrowNext} alt="back icon" className="w-6 h-6" />
            </button>
          </>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 h-full px-4 pt-5 lg:px-0 lg:pt-20">
            <div className="flex flex-col w-full gap-y-3 items-center">
              <Image src={eruptionImage} alt="gambar erupsi gunung" className="w-[50%]" />
              <p
                className={`${caesarDressing.className} text-[10px] md:text-xs text-xs lg:text-base`}
              >
                Tip: klik pada gambar dan pindai untuk lihat animasi AR!
              </p>
            </div>
            <div className="flex flex-col gap-y-2 lg:gap-y-10 lg:-ml-10 pr-10">
              <p className={`${caesarDressing.className} lg:text-4xl`}>Proses Terjadinya Erupsi</p>
              <div className={`${assistant.className} text-[10px] md:text-xs lg:text-base`}>
                <p>
                  Erupsi gunung berapi merupakan proses kompleks yang melibatkan interaksi berbagai
                  lapisan bumi. Magma yang terkumpul di dapur magma, terletak di kerak bumi,
                  bergerak ke atas melalui saluran magma. Tekanan gas yang tinggi dan perbedaan
                  massa jenis antara magma dan batuan di sekitarnya mendorong magma ke permukaan.
                </p>
                <br />
                <p>
                  Saat magma mencapai permukaan, terjadilah erupsi. Jenis erupsi tergantung pada
                  berbagai faktor, seperti komposisi magma, viskositas, dan keberadaan air. Erupsi
                  dapat menghasilkan berbagai macam produk, seperti lava, abu vulkanik, dan gas
                  beracun.
                </p>
              </div>
            </div>
            <button
              className={`absolute bottom-3 lg:bottom-9 left-4 flex items-center gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold p-1 lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl`}
            >
              <span onClick={handleBack}>Kembali</span>
              <Image src={arrowBack} alt="back icon" className="w-6 h-6" />
            </button>
            <Link href="/peta?bencana=erupsi">
              <button
                className={`absolute bottom-3 lg:bottom-9 right-4 flex items-center gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold p-1 lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl`}
              >
                <span>Jelajahi peta interaktif</span>
                <Image src={arrowNext} alt="next icon" className="w-6 h-6" />
              </button>
            </Link>
          </div>
        );
      default:
        return null;
    }
  }, [activeIndex]);

  return element;
}
