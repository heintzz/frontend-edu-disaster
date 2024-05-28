import Image from 'next/image';

import { Caesar_Dressing } from 'next/font/google';

import enums from '@/enums/enum';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import eruptionImage from '../../public/display/erupsi.png';
import qrErupsi from '../../public/qr/qr-erupsi.png';
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

export default function MateriErupsi({ handleBack }) {
  const [showImage, setShowImage] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('Proses Terjadinya Erupsi');
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
    { id: 'breakPoint1', title: 'Proses Terjadinya Erupsi' },
    { id: 'breakPoint2', title: 'Karakteristik & dampak Erupsi' },
    { id: 'breakPoint3', title: 'Tingkat isyarat gunung berapi' },
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
                src={eruptionImage}
                alt="gambar erupsi gunung"
                className="w-3/4 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setShowImage(false)}
              />
            ) : (
              <Image
                src={qrErupsi}
                alt="kode qr"
                className="w-3/4 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setShowImage(true)}
              />
            )}
          </div>
          <p
            className={`${caesarDressing.className} text-[9px] md:text-xs lg:text-xl text-center bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
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
              Letusan gunung api merupakan bagian dari aktivitas vulkanik yang dikenal dengan
              istilah erupsi. Bahaya letusan gunung api dapat berupa awan panas, lontaran material
              (pijar), hujan abu lebat, lava, gas racun, tsunami, dan banjir lahar. Negara kita yang
              terletak pada cincin api pasifik mengakibatkan sering terjadi bencana gunung meletus.
              Aktivitas tektonik merupakan fenomena yang berkaitan dengan aktivitas gunung berapi.
              Aktivitas tersebut mengakibatkan adanya deretan gunung api (volcanic arc) yang
              membentang dari barat hingga timur mulai dari sepanjang pulau Sumatra, Jawa-Bali-Nusa
              Tenggara, utara Sulawesi-Maluku, hingga Papua. Kondisi tersebut menyebabkan negara
              kita rentan terdampak bencana gempa bumi dan erupsi gunung api. Fenomena proses
              keluarnya magma dari dalam bumi berupa material cair dan padat ke permukaan bumi
              disebut bencana letusan gunung berapi. Material-material tersebut meliputi lahar, bom,
              awan panas, debu vulkanik, dan lapili. Fenomena ini ditandai adanya getaran gempa
              kecil, perubahan suhu yang meningkat, layunya tumbuhan di lereng gunung, bermigrasinya
              binatang, keringnya mata air, dan suara gemuruh yang sering terdengar (Sinartejo,
              2019).
            </p>
            <div id="breakPoint2" />
            <div className="w-full h-0.5 bg-slate-300 my-[3vh]" />
            <p className="font-bold">Karakteristik letusan gunung api:</p>
            <ul>
              <li>a. Biasanya ada tanda peringatan dan dapat diprediksi</li>
              <li>b. Dapat merusak struktur bangunan</li>
              <li>c. Aliran lava dapat mengakibatkan kebakaran</li>
              <li>d. Sebaran debu vulkanik dapat menjangkau areal yang luas</li>
              <li>e. Banjir lava dapat terjadi jika disertai hujan</li>
            </ul>
            <br />
            <p className="font-bold">Dampak negatif:</p>
            <ul>
              <li>
                a. Tercemarnya udara dari abu vulkanik. Gas di dalamnya seperti sulfur dioksida,
                nitrogen dioksida, hidrogen sulfida, dan partikel debu lain yang dapat membunuh
                makhluk hidup.
              </li>
              <li>
                b. Lumpuhnya berbagai kegiatan atau aktivitas manusia, rusaknya ekosistem, dan
                hancurnya berbagai bangunan.
              </li>
              <li>
                c. Material letusan gunung berapi berpotensi menyebabkan penyakit seperti ISPA
                (Infeksi Saluran Pernapasan Akut).
              </li>
            </ul>
            <br />
            <p className="font-bold">Dampak positif:</p>
            <ul>
              <li>
                a. Tanah menjadi subur dikarenakan telah dilalui abu vulkanik gunung berapi. Abu
                vulkanik mengandung mineral primer yang memiliki kandungan nutrisi yang melimpah dan
                baik bagi tanah.
              </li>
              <li>b. Tercipta mata pencaharian baru, yaitu penambang pasir dan bebatuan.</li>
              <li>
                c. Terdapat geyser (sumber mata air panas) yang sangat baik untuk kesehatan kulit
                manusia.
              </li>
            </ul>
            <div id="breakPoint3" />
            <div className="w-full h-0.5 bg-slate-300 my-[3vh]" />
            <p className="font-bold">Awas:</p>
            <ul>
              <li>
                a. Menandakan gunung berapi yang segera atau sedang meletus atau ada keadaan kritis
                yang menimbulkan bencana.
              </li>
              <li>b. Letusan pembukaan dimulai dengan abu dan asap.</li>
              <li>c. Letusan berpeluang terjadi dalam waktu 24 jam.</li>
              <li>d. Wilayah yang terancam bahaya direkomendasikan untuk dikosongkan.</li>
              <li>e. Koordinasi dilakukan secara harian.</li>
              <li>f. Piket penuh.</li>
            </ul>
            <br />
            <p className="font-bold">Siaga:</p>
            <ul>
              <li>
                a. Menandakan gunung berapi yang sedang bergerak ke arah letusan atau menimbulkan
                bencana.
              </li>
              <li>b. Peningkatan intensif kegiatan seismik.</li>
              <li>
                c. Semua data menunjukkan bahwa aktivitas dapat segera berlanjut ke letusan atau
                menuju pada keadaan yang dapat menimbulkan bencana.
              </li>
              <li>
                d. Jika tren peningkatan berlanjut, letusan dapat terjadi dalam waktu 2 minggu.
              </li>
              <li>e. Sosialisasi di wilayah terancam.</li>
              <li>f. Penyiapan sarana darurat.</li>
              <li>g. Koordinasi harian.</li>
              <li>h. Piket penuh.</li>
            </ul>
            <br />
            <p className="font-bold">Waspada:</p>
            <ul>
              <li>a. Ada aktivitas apa pun bentuknya.</li>
              <li>b. Terdapat kenaikan aktivitas di atas level normal.</li>
              <li>c. Peningkatan aktivitas seismik dan kejadian vulkanis lainnya.</li>
              <li>
                d. Sedikit perubahan aktivitas yang diakibatkan oleh aktivitas magma, tektonik dan
                hidrotermal.
              </li>
              <li>e. Penyuluhan/sosialisasi.</li>
              <li>f. Penilaian bahaya.</li>
              <li>g. Pengecekan sarana.</li>
              <li>h. Pelaksanaan piket terbatas.</li>
            </ul>
            <br />
            <p className="font-bold">Normal:</p>
            <ul>
              <li>a. Tidak ada gejala aktivitas tekanan magma.</li>
              <li>b. Level aktivitas dasar.</li>
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
          <audio ref={audioRef} src="/audio/audio-erupsi.mp3"></audio>
        </div>
        <ExploreMapButtonMateri disaster={enums.ACTIVITY.ERUPTION} />
      </div>
    </div>
  );
}
