import Image from 'next/image';

import { Caesar_Dressing } from 'next/font/google';

import enums from '@/enums/enum';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import tsunamiImage from '../../public/display/tsunami.jpg';
import qrTsunami from '../../public/qr/qr-erupsi.png';
import BackButtonMateri from '../button/BackButtonMateri';
import ExploreMapButtonMateri from '../button/ExploreMapButtonMateri';

const caesarDressing = Caesar_Dressing({
  subsets: ['latin'],
  weight: '400',
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function MateriTsunami({ handleBack }) {
  const [showImage, setShowImage] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('Proses Terjadinya Tsunami');
  const audioRef = useRef(null);
  const contentRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const breakPoints = [
    { id: 'breakPoint1', title: 'Proses Terjadinya Tsunami' },
    { id: 'breakPoint2', title: 'Karakteristik & Dampak Tsunami' },
  ];

  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      const contentRect = content.getBoundingClientRect();
      for (let i = breakPoints.length - 1; i >= 0; i--) {
        const breakPoint = document.getElementById(breakPoints[i].id);
        if (breakPoint) {
          const breakPointRect = breakPoint.getBoundingClientRect();
          if (breakPointRect.top <= contentRect.bottom) {
            setTitle(breakPoints[i].title);
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-5 px-[3vw]">
      <div className="w-full h-5/6 flex items-center justify-between gap-3">
        <div className="w-1/2 h-full flex flex-col justify-center gap-5">
          <div className="w-full flex items-center justify-center">
            {showImage ? (
              <Image
                src={tsunamiImage}
                alt="gambar erupsi gunung"
                className="w-3/4 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setShowImage(false)}
              />
            ) : (
              <Image
                src={qrTsunami}
                alt="kode qr"
                className="w-3/4 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setShowImage(true)}
              />
            )}
          </div>
          <p
            className={`${caesarDressing.className} md:px-5 text-[9px] md:text-xs lg:text-xl text-center bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
          >
            Tip: klik pada gambar dan pindai untuk lihat animasi AR!
          </p>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center gap-3 py-[3vh]">
          <div
            className={`${caesarDressing.className} h-1/5 flex items-center justify-center text-4xl text-center bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
          >
            {title}
          </div>
          <div
            ref={contentRef}
            className={`${jakartaSans.className} h-4/5 overflow-y-auto mb-5 pr-3`}
          >
            <div id="breakPoint1" />
            <p className="text-justify">
              Tsunami berasal dari bahasa jepang yaitu tsu = pelabuhan, nami = gelombang, secara
              harafiah berarti "ombak besar di pelabuhan". Tsunami dapat diartikan sebagai gelombang
              ombak lautan. Jadi, tsunami adalah serangkaian gelombang ombak laut raksasa yang
              timbul karena adanya pergeseran di dasar laut akibat gempa bumi. Wilayah-wilayah di
              negara kita yang dikelilingi laut dan berada pada perbatasan lempeng berpotensi
              mengakibatkan tsunami. Seperti beberapa waktu lalu, Palu dan Aceh dilanda bencana
              tsunami. Keduanya dipicu oleh gempa bumi di dasar laut dan mengakibatkan kerusakan
              yang besar. Gelombang dari tengah laut yang menghantam wilayah pesisir dengan
              kecepatan lebih dari 900 km/jam disebut tsunami. Bencana ini diakibatkan oleh beberapa
              hal seperti letusan gunung api di laut, runtuhan di dasar laut, atau gempa bumi akibat
              pergerakan lempeng di dasar laut. Ketika gelombang laut tiba di muara sungai, pantai
              yang dangkal, atau teluk, maka kecepatannya akan menurun. Sedangkan kekuatan merusak
              dan ketinggiannya meningkat hingga puluhan meter (BNPB, 2017).
              <br />
              Gelombang tsunami bermula dari gerakan hebat lempeng bumi yang berpusat dangkal di
              dasar samudera. Pergerakan lempeng tersebut kemudian menunjam masuk ke dalam perut
              bumi, dan menyebabkan air laut surut dari bibir pantai, kemudian air laut yang
              terhempas masuk ke dalam patahan samudera tersebut akan menyeruak dan menggulung hebat
              menjadi gelombang raksasa setinggi belasan meter. Gelombang inilah yang ketika
              mencapai daratan dan menghempas apapun yang dilaluinya disebut sebagai gelombang
              tsunami.
            </p>
            <div id="breakPoint2" />
            <div className="w-full h-0.5 bg-slate-300 my-[3vh]" />
            <p className="font-bold">Karakteristik tsunami:</p>
            <ul>
              <li>
                a. Kecepatan tsunami tergantung pada kedalaman laut dan percepatan gravitasi di
                tempat tersebut.
              </li>
              <li>
                b. Ketinggian gelombang tsunami berbanding terbalik dengan kecepatan artinya jika
                kecepatan tsunami besar, maka ketinggian gelombang tsunami hanya beberapa puluh
                centimeter saja, sebaliknya untuk di daerah pantai, kecepatan tsunaminya kecil
                sedangkan ketinggian gelombangnya cukup tinggi bisa mencapai puluhan meter.
              </li>
            </ul>
            <br />
            <p className="font-bold">Dampak negatif:</p>
            <ul>
              <li>
                a. Tsunami merusak apa saja yang dilaluinya, seperti sarana prasarana,
                tumbuh-tumbuhan, dan menimbulkan korban jiwa.
              </li>
              <li>
                b. Tsunami menyebabkan gagal panen, menimbulkan genangan air, dan pencemaran air
                asin pada tanah maupun air bersih.
              </li>
            </ul>
            <br />
            <p className="font-bold">Dampak positif:</p>
            <ul>
              <li>
                a. Kita dapat mengetahui kekuatan konstruksi bangunan serta kelemahannya, dan
                melakukan perbaikan dalam konstruksi bangunan agar lebih kuat.
              </li>
              <li>
                b. Dapat memberikan gambaran tentang apa yang terjadi di bawah laut dan aktivitas
                vulkanik di dalamnya.
              </li>
              <li>
                c. Motivasi dan penelitian oleh ahli geologi tentang aktivitas vulkanik dan
                hubungannya dengan kebencanaan tsunami.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mx-[1vw]">
        <BackButtonMateri back={handleBack} />
        <div className="w-1/3 flex items-center px-4 py-2.5 rounded-lg border border-[#29ADB2]">
          <button className="rounded-full flex items-center mr-4" onClick={togglePlayPause}>
            {isPlaying ? (
              <Image src="/pauseButton.svg" alt="pause button" width={32} height={32} />
            ) : (
              <Image src="/playButton.svg" alt="play button" width={32} height={32} />
            )}
          </button>
          <div className="w-full bg-teal-100 rounded-full h-2 flex items-center">
            <div
              className="h-2 bg-teal-500 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
          <audio ref={audioRef} src="/audio/audio_tsunami.mp3"></audio>
        </div>
        <ExploreMapButtonMateri disaster={enums.ACTIVITY.TSUNAMI} />
      </div>
    </div>
  );
}
