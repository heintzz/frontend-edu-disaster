import Image from 'next/image';

import { Caesar_Dressing } from 'next/font/google';

import enums from '@/enums/enum';
import { useState } from 'react';
import dummyQR from '../../public/display/dummyQR.png';
import eruptionImage from '../../public/display/erupsi.png';
import BackButton from '../button/BackButton';
import ExploreMapButton from '../button/ExploreMapButton';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function MateriTsunami({ handleBack }) {
  const [showImage, setShowImage] = useState(true);

  return (
    <div className="grid grid-cols-2 h-full pl-4 pr-2 pt-4 lg:px-0 lg:pt-20">
      <div className="flex flex-col w-full gap-y-5 items-center">
        {showImage ? (
          <Image
            src={eruptionImage}
            alt="gambar erupsi gunung"
            className="w-[50%] lg:w-[70%] cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setShowImage(false)}
          />
        ) : (
          <Image
            src={dummyQR}
            alt="kode qr"
            className="w-[50%] lg:w-[70%] cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setShowImage(true)}
          />
        )}
        <p className={`${caesarDressing.className} text-[9px] md:text-xs lg:text-base`}>
          Tip: klik pada gambar dan pindai untuk lihat animasi AR!
        </p>
      </div>
      <div className="flex flex-col gap-y-2 lg:gap-y-10 lg:-ml-10 pr-10">
        <p className={`${caesarDressing.className} lg:text-4xl`}>Proses Terjadinya Tsunami</p>
        <div className="max-h-[50%] lg:max-h-[100%] overflow-y-auto text-[10px] md:text-xs lg:text-base">
          <p>
            Tsunami terdiri dari rangkaian gelombang laut yang mampu menjalar dengan kecepatan
            mencapai lebih dari 900 km/jam atau lebih. Jenis bencana ini disebabkan oleh beberapa
            faktor,antara lain gempa bumi yang terjadi di dasar laut, runtuhan di pantai, atau
            karena letusan gunungapi di laut.
          </p>
          <br />
          <p>
            Saat mencapai pantai yang dangkal, teluk, atau muara sungai, kecepatan gelombang tsunami
            akan menurun, namun ketinggian gelombang akan meningkat puluhan meter dan bersifat
            merusak.
          </p>
        </div>
      </div>
      <BackButton back={handleBack} />
      <ExploreMapButton disaster={enums.ACTIVITY.TSUNAMI} />
    </div>
  );
}
