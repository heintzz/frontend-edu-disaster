import Image from 'next/image';

import { Caesar_Dressing } from 'next/font/google';

import enums from '@/enums/enum';
import { useState, useRef, useEffect } from 'react';
import dummyQR from '../../public/display/dummyQR.png';
import gempaImage from '../../public/display/earthquake.jpg';
import { Plus_Jakarta_Sans } from 'next/font/google';
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

export default function MateriGempa({ handleBack }) {
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
    { id: 'breakPoint1', title: 'Pengertian Gempa Bumi' },
    { id: 'breakPoint2', title: 'Karakteristik & Dampak Gempa Bumi' },
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
                src={gempaImage}
                alt="gambar gempa bumi"
                className="w-3/4 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setShowImage(false)}
              />
            ) : (
              <Image
                src={dummyQR}
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
              Gempa bumi adalah getaran atau guncangan yang terjadi di permukaan bumi yang
              disebabkan oleh tumbukan antar lempeng bumi, patahan aktif, aktivitas gunung api atau
              runtuhan batuan. Fenomena tersebut memiliki sifat merusak, periode waktu yang singkat,
              dan terjadi kapan saja. Gempa bumi dapat merusak rumah dan fasilitas umum seperti
              jembatan, jalan, rumah sakit, sekolah, dan lain sebagainya (BNPB, 2017). Terjadinya gempa
              bumi tidak dapat diprediksi dan tidak dapat dicegah, namun dampak yang ditimbulkan
              dapat dikurangi.
              <br />
              Indonesia yang rentan terhadap gempa bumi disebabkan karena letak indonesia
              yang berada di antara tiga lempeng besar yaitu lempeng Eurasia, Pasifik, dan Indo-Australia.
              Zona lempeng Pasifik dicirikan dengan adanya palung yang dalam. Lempeng ini berada di
              Halmahera dan bagian utara Papua. Selanjutnya zona lempeng Indo-Australia dan Eurasia
              berada di lepas pantai selatan Nusa Tenggara, selatan Jawa, dan barat Sumatera. Pada
              tanggal 26 Desember 2004, terjadi gempa bumi di Aceh yang pusat gempanya berada 250
              km di tenggara Banda Aceh. Dampak gempa ini sangat dahsyat karena diikuti dengan
              tsunami yang mengakibatkan korban jiwa sebanyak 227.900 orang.
            </p>
            <div id="breakPoint2" />
            <div className="w-full h-0.5 bg-slate-300 my-[3vh]" />
            <p className="font-bold">Karakteristik gempa bumi:</p>
            <ul>
              <li>
                a. Berlangsung dalam waktu yang singkat
              </li>
              <li>
                b. Berpotensi terulang kembali
              </li>
              <li>
                c. Lokasi kejadian tertentu
              </li>
              <li>
                d. Akibatnya dapat menimbulkan bencana
              </li>
              <li>
                e. Tidak dapat diprediksi, namun dampaknya dapat dikurangi
              </li>
            </ul>
            <br />
            <p className="font-bold">Dampak negatif:</p>
            <ul>
              <li>
                a. Jaringan transportasi dan komunikasi terganggu, serta banyak bangunan dan fasilitas umum
                menjadi rusak.
              </li>
              <li>
                b. Munculnya rekahan (patahan), longsoran, dan luncuran tanah yang dapat terjadi bersamaan
                dengan gempa.
              </li>
              <li>
                c. Air bawah tanah dapat mengalami perubahan disebabkan oleh sesar atau guncangan.
              </li>
              <li>
                d. Memicu timbulnya tsunami apabila gempa bumi berkekuatan besar dan berasal dari laut
                dangkal.
              </li>
            </ul>
            <br />
            <p className="font-bold">Dampak positif:</p>
            <ul>
              <li>
                a. Dapat memberikan gambaran tentang apa yang terjadi di bawah tanah, sehingga dapat
                membuat ekstraksi minyak dan gas lebih efisien.
              </li>
              <li>
                b. Dapat memberikan informasi tentang struktur bumi misalnya, ruang magma yang
                memungkinkan ilmuwan untuk memonitor aktivitas gunung berapi.
              </li>
              <li>
                c. Memberikan informasi tentang struktur internal Bumi. Dengan mengukur waktu yang
                diperlukan gelombang seismik untuk melintasi bumi maka dapat memetakan struktur bumi.
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
          <audio ref={audioRef} src="/audio/audio.mp3"></audio>
        </div>
        <ExploreMapButtonMateri disaster={enums.ACTIVITY.EARTHQUAKE} />
      </div>
    </div>
  );
}
