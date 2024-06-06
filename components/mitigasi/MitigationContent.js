import { useEffect, useMemo, useState } from 'react';

import { activityState } from '@/atoms/user.activity';
import enums from '@/enums/enum';

import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetRecoilState } from 'recoil';

import BMKG from '../../public/lembaga/bmkg.webp';
import BNPB from '../../public/lembaga/bnpb.png';
import Mitigasi1 from '../../public/menu/mitigasi/orang-mitigasi-1.webp';
import Mitigasi2 from '../../public/menu/mitigasi/orang-mitigasi-2.webp';
import Mitigasi3 from '../../public/menu/mitigasi/orang-mitigasi-3.webp';
import Mitigasi4 from '../../public/menu/mitigasi/orang-mitigasi-4.webp';

import Link from 'next/link';
import BackButton from '../button/BackButton';
import NextButton from '../button/NextButton';
import StudentServices from '@/services/student.services';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function MitigationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setActivity = useSetRecoilState(activityState);
  const [showMenu, setShowMenu] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    if (index) {
      setActiveIndex(parseInt(index));
    } else {
      setActiveIndex(0);
    }
  }, [searchParams]);

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.MITIGATION);
    params.set('index', activeIndex + 1);

    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const handleBack = () => {
    if (activeIndex == 0) {
      setActivity(enums.ACTIVITY.IDLE);
      router.replace('/');
      return;
    }

    if (activeIndex == 1 || activeIndex > 5) {
      setActiveIndex((prev) => prev - 1);

      const params = new URLSearchParams(searchParams.toString());
      params.set('activity', enums.ACTIVITY.MITIGATION);
      params.set('index', activeIndex - 1);

      window.history.pushState({}, '', `?${params.toString()}`);
      return;
    }

    setActiveIndex(1);

    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.MITIGATION);
    params.set('index', 1);

    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const actionClickAddURLParams = (index) => {
    setActiveIndex(index);

    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.MITIGATION);
    params.set('index', index);

    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const element = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return (
          <div className="flex justify-center h-full pt-[24vh] pb-[20vh]">
            <div className="relative ">
              <p
                className={`${caesarDressing.className} text-2xl text-center lg:text-5xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Mitigasi
              </p>
              <Image
                src={Mitigasi1}
                alt="people helps each other"
                className="absolute w-[60%] top-[9vh] -left-[1vw] lg:-left-[2vw]"
                priority={true}
              />
              <Image
                src={Mitigasi2}
                alt="people helps each other"
                className="absolute w-[60%] top-[9vh] left-[8vw] sm:left-[7vw] md:left-[5vw] lg:left-[6vw]"
                priority={true}
              />
              <Image
                src={Mitigasi3}
                alt="people helps each other"
                className="absolute w-[70%] -left-[10vw] sm:-left-[9vw] lg:-left-[11vw] -top-[2vh]"
                priority={true}
              />
              <Image
                src={Mitigasi4}
                alt="people helps each other"
                className="absolute w-[65%] -right-[10vw] sm:-right-[8vw] lg:-right-[10vw] -top-[2vh]"
                priority={true}
              />
            </div>
            <BackButton back={handleBack} />
            <NextButton next={handleNext} />
          </div>
        );
      case 1:
        return (
          <div>
            <div
              className={`flex flex-col pt-2 md:pt-3 lg:pt-10 px-5 md:px-10 ${caesarDressing.className}`}
            >
              <p className="text-center text-3xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent">
                Pilih Topik
              </p>
              <div className="grid grid-cols-3 gap-x-3 md:gap-x-7 lg:gap-x-10 mt-2 lg:mt-10 text-white">
                <div
                  onClick={() => setShowMenu((prev) => !prev)}
                  className={`h-[50vh] bg-[#253333] rounded-xl grid place-content-center gap-y-5 text-center px-5 cursor-pointer`}
                >
                  {showMenu ? (
                    <>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          await StudentServices.updateStudentProgress(
                            enums.MODULES.TSUNAMIMITIGATION
                          );
                          actionClickAddURLParams(2);
                        }}
                        className="py-1 px-5 text-xs sm:py-2 md:text-base lg:min-w-[200px] bg-[#2A6B6D] hover:bg-[#2A6B6D]/50 rounded-2xl"
                      >
                        TSUNAMI
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          await StudentServices.updateStudentProgress(
                            enums.MODULES.EARTHQUAKEMITIGATION
                          );
                          actionClickAddURLParams(3);
                        }}
                        className="py-1 px-5 text-xs sm:py-2 md:text-base lg:min-w-[200px] bg-[#2A6B6D] hover:bg-[#2A6B6D]/50 rounded-2xl"
                      >
                        GEMPA BUMI
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          actionClickAddURLParams(4);
                          await StudentServices.updateStudentProgress(
                            enums.MODULES.ERUPTIONMITIGATION
                          );
                        }}
                        className="py-1 px-5 text-xs sm:py-2 md:text-base lg:min-w-[200px] bg-[#2A6B6D] hover:bg-[#2A6B6D]/50 rounded-2xl"
                      >
                        ERUPSI
                      </button>
                    </>
                  ) : (
                    <span>Langkah-langkah Mitigasi</span>
                  )}
                </div>
                <div
                  onClick={() => {
                    actionClickAddURLParams(5);
                    setShowMenu(false);
                  }}
                  className="h-[50vh] bg-[#253333] rounded-xl grid place-content-center text-center px-5 cursor-pointer"
                >
                  Jenis Mitigasi
                </div>
                <div
                  onClick={() => {
                    actionClickAddURLParams(6);
                    setShowMenu(false);
                  }}
                  className="h-[50vh] bg-[#253333] rounded-xl grid place-content-center text-center px-5 cursor-pointer"
                >
                  Lembaga Kebencanaan
                </div>
              </div>
            </div>
            <BackButton back={handleBack} />
          </div>
        );
      case 2:
        return (
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col pt-2 md:pt-3 lg:pt-10 px-5 md:px-10">
              <p
                className={`${caesarDressing.className} text-2xl text-center lg:text-5xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Mitigasi dan Adaptasi Bencana Tsunami
              </p>
              <div className="text-xs lg:text-base mt-2 md:mt-5 lg:mt-10 max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto">
                <p>
                  Kegiatan mitigasi bencana tsunami dilakukan untuk dapat meminimalisir
                  risiko/dampak bencana tsunami. Kegiatan mitigasi bencana tsunami sebagai berikut:
                </p>
                <ol className="list-decimal mt-5 flex flex-col gap-y-2">
                  <li>
                    Penanaman mangrove (bakau) di sepanjang pantai untuk menghambat gelombang
                    tsunami
                  </li>
                  <li>
                    Pembekalan pengetahuan terkait data gempa yang berpotensi mengakibatkan tsunami.
                    Data ini seperti gempa dengan pusat getaran di laut dangkal (0-30 km) hingga
                    laut tengah, kekuatan paling rendah 6,5 SR, dan pola sesar yang turun atau naik
                  </li>
                  <li>
                    Terdapat sistem peringatan dini tsunami dalam skala regional dan internasional
                  </li>
                  <li>Pengadaan pemantauan berkala</li>
                  <li>
                    Sistem pendeteksi tsunami dirancang dua bagian. Pertama jaringan komunikasi dan
                    infrastruktur untuk menyampaikan informasi adanya bahaya tsunami sebagai
                    peringatan dini. Kedua, jaringan sensor pendeteksi tsunami akan terjadi
                  </li>
                </ol>
                <p className="mt-[3vh]">
                  Upaya adaptasi dalam menghadapi bencana tsunami diantaranya:
                </p>
                <ol className="list-decimal mt-5 flex flex-col gap-y-2">
                  <li>
                    Mengaktifkan partisipasi masyarakat wilayah pesisir yang mempunyai pengalaman
                    dan pengetahuan terkait bencana gempa yang berpotensi tsunami
                  </li>
                  <li>Melakukan pembangunan tembok pemecah gelombang atau breakwater</li>
                  <li>Pemasangan papan penunjuk jalur evakuasi</li>
                  <li>Rambu-rambu penunjuk keterdapat arus balik di pantai</li>
                  <li>Pembangunan tanggul laut atau seawall</li>
                  <li>
                    Rambu-rambu penunjuk jalur evakuasi yang memberikan arahan pada pengunjung
                    maupun masyarakat ketika terjadi tsunami
                  </li>
                </ol>
              </div>
            </div>
            <BackButton back={handleBack} />
          </div>
        );
      case 3:
        return (
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col pt-2 md:pt-3 lg:pt-10 px-5 md:px-10">
              <p
                className={`${caesarDressing.className} text-2xl text-center lg:text-5xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Mitigasi dan Adaptasi Bencana Gempa Bumi
              </p>
              <div className="text-xs lg:text-base mt-2 md:mt-5 lg:mt-10 max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto">
                <p>
                  Kegiatan mitigasi bencana gempa bumi dilakukan untuk meminimalisir risiko/dampak
                  bencana. Kegiatan mitigasi bencana gempa bumi sebagai berikut:
                </p>
                <ol className="list-decimal mt-5 flex flex-col gap-y-2">
                  <li>Identifikasi sumber bahaya dan ancaman bencana</li>
                  <li>Mendirikan bangunan sesuai aturan baku (tahan gempa)</li>
                  <li>
                    Memahami lokasi bangunan tempat tinggal dan menempatkan perabotan pada tempat
                    yang proporsional
                  </li>
                  <li>Menyiapkan peralatan seperti senter, P3K, makanan instan, dll</li>
                  <li>Memeriksa penggunaan listrik dan gas</li>
                  <li>Mencatat nomor telepon penting dalam penanganan kebencanaan gempa bumi</li>
                  <li>
                    Memahami jalur evakuasi dan mengikuti kegiatan simulasi mitigasi bencana gempa
                  </li>
                  <li>Pemantauan penggunaan teknologi yang dilakukan secara tiba-tiba</li>
                </ol>
                <p className="mt-[3vh]">
                  Perubahan bentuk dan konstruksi bangunan permukiman masyarakat sesuai dengan
                  syarat dan standar kelayakan hunian di wilayah yang mereka tempati. Perubahan
                  konstruksi rumah sebagai bentuk adaptasi terhadap bencana gempa bumi merupakan
                  wujud strategi adaptasi fisik (Jauhari, 2018). Selain itu, adaptasi masyarakat
                  juga dapat dilakukan dengan membangun aktivitas yang dapat menjaga ketahanan
                  pangan mereka, seperti aktivitas living food bank yaitu menanam tanaman palawija,
                  kelapa, jengkol, rambutan, pisang, ubi kayu, ubi jalar, dan sebagainya. Upaya
                  tersebut dimaksudkan apabila suatu saat terjadi gempa, masyarakat tetap mempunyai
                  persediaan pangan
                </p>
              </div>
            </div>
            <BackButton back={handleBack} />
          </div>
        );
      case 4:
        return (
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col pt-2 md:pt-3 lg:pt-10 px-5 md:px-10">
              <p
                className={`${caesarDressing.className} text-2xl text-center lg:text-5xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Mitigasi dan Adaptasi Bencana Erupsi
              </p>
              <div className="text-xs lg:text-base mt-2 md:mt-5 lg:mt-10 max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto">
                <p>
                  Kegiatan mitigasi bencana letusan gunung berapi dilakukan untuk meminimalisir
                  risiko/dampak bencana. Kegiatan mitigasi bencana letusan gunung berapi sebagai
                  berikut:
                </p>
                <ol className="list-decimal mt-5 flex flex-col gap-y-2">
                  <li>
                    Pembangunan tanggul untuk menahan lahar agar tidak masuk ke wilayah pemukiman
                  </li>
                  <li>Pengadaan pemantauan berkala</li>
                  <li>
                    Pengiriman data pemantauan ke Direktorat Vulkanologi dan Mitigasi Bencana
                    Geologi (DVMBG) di Bandung dengan radio komunikasi SSB, d. kegiatan tanggap
                    darurat. Tindakan yang dilakukan ketika terjadi peningkatan aktivitas gunung api
                    yaitu melakukan pemeriksaan berkala dan terpadu, mengevaluasi laporan dan data
                    aktivitas vulkanik, mengirimkan tim lokasi, dan membentuk tim tanggap darurat
                  </li>
                  <li>
                    Pemetaan, peta kawasan rawan bencana gunung berapi dapat menjelaskan jenis dan
                    sifat bahaya, daerah rawan bencana, arah penyelamatan diri, pengungsian, dan pos
                    penanggulangan bencana gunung berap
                  </li>
                  <li>
                    Penyelidikan gunung berapi menggunakan metode geologi, geofisika, dan geokimia
                  </li>
                  <li>Sosialisasi yang dilakukan pada pemerintah daerah dan masyarakat</li>
                </ol>
                <p className="mt-[3vh]">
                  Masyarakat dapat beradaptasi dengan beberapa upaya. Upaya adaptasi dari bencana
                  gunung meletus diantaranya pembuatan rumah yang kokoh, dinding rumah yang tebal
                  dan atap rumah yang tahan terhadap hujan air dan hujan abu. Masyarakat dapat
                  menggunakan masker dan menggunakan pakaian tebal supaya dapat terhindar dari
                  dinginnya udara pegunungan dan letusan abu vulkanik (Yulisar et al., 2019).
                </p>
              </div>
            </div>
            <BackButton back={handleBack} />
          </div>
        );
      case 5:
        return (
          <div>
            <div className="flex flex-col pt-2 md:pt-3 lg:pt-10 px-5 lg:px-10">
              <p
                className={`${caesarDressing.className} text-2xl text-center lg:text-5xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Jenis Mitigasi
              </p>
              <div className="text-xs lg:text-base mt-2 md:mt-5 lg:mt-10 max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto">
                <ol className="list-decimal mt-5 flex flex-col gap-y-1 lg:gap-y-5">
                  <li>
                    <span className="font-bold">Mitigasi Struktural</span>
                    <br />
                    {/* Pencegahan bencana yang berfokus pada&nbsp;
                    <span className="bg-yellow-200 font-bold">
                      pembangunan dan penggunaan struktur fisik
                    </span>
                    &nbsp; untuk mengurangi dampak bencana
                    <br />
                    Contoh: pembangunan tanggul laut raksasa di Jakarta yang bertujuan mencegah
                    luapan air laut yang dapat merusak infrastruktur dan rumah penduduk di
                    sekitarnya */}
                    Upaya meminimalkan bencana yang dilakukan melalui pembangunan berbagai prasarana
                    fisik dan menggunakan pendekatan teknologi tahan bencana yang tersedia
                    <br />
                    Contoh: Alat pendeteksi aktivitas gunung berapi, bangungan yang bersifat tahan
                    gempa, ataupun Early System Warning yang digunakan untuk memprediksi terjadinya
                    gelombang tsunami
                  </li>
                  <li>
                    <span className="font-bold">Mitigasi Non-Struktural</span>
                    <br />
                    Pencegahan bencana yang melibatkan upaya mengurangi dampak bencana&nbsp;
                    <span className="bg-yellow-200 font-bold">tanpa pembangunan fisik</span>&nbsp;
                    <br />
                    Contoh: penyuluhan dan sosialisasi tentang risiko bencana alam kepada masyarakat
                  </li>
                </ol>
              </div>
            </div>
            <BackButton back={handleBack} />
          </div>
        );
      case 6:
        return (
          <div>
            <div className="flex flex-col pt-3 lg:pt-10 px-5 md:px-10">
              <p
                className={`${caesarDressing.className} text-xl sm:text-2xl text-center lg:text-4xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Badan Nasional Penanggulangan Bencana (BNPB)
              </p>
              <div className="grid grid-cols-2 justify-center items-start lg:items-center text-xs lg:text-base mt-5   lg:mt-10 ">
                <Image
                  src={BNPB}
                  alt="logo bnpb"
                  className="w-[50%] translate-x-1/2 lg:translate-x-0 lg:place-self-center "
                />
                <div className="max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto -ml-5">
                  Fakta menarik tentang BNPB:
                  <ul className="list-disc">
                    <li>BNPB didirikan pada tahun 2008</li>
                    <li>BNPB memiliki 34 kantor di provinsi se-Indonesia</li>
                    <li>BNPB telah membantu menanggulangi berbagai bencana alam di Indonesia</li>
                    <li>
                      BNPB memiliki website dan media sosial yang dapat diakses oleh masyarakat
                      untuk mendapatkan informasi tentang kebencanaan.
                    </li>
                  </ul>
                  <br />
                  Ingin tahu lebih banyak tentang BNPB? Kunjungi website BNPB di
                  <br />
                  <Link href="https://www.bnpb.go.id" className="underline text-blue-800">
                    https://www.bnpb.go.id
                  </Link>
                  <br />
                  <br />
                  Bersama BNPB, kita jaga Indonesia dari bencana!
                </div>
              </div>
            </div>
            <BackButton back={handleBack} />
            <NextButton next={handleNext} />
          </div>
        );
      case 7:
        return (
          <div>
            <div className="flex flex-col pt-3 lg:pt-10 px-5 md:px-10">
              <p
                className={`${caesarDressing.className} text-xl sm:text-2xl text-center lg:text-4xl bg-gradient-to-b from-[#000000] to-[#999999] bg-clip-text text-transparent`}
              >
                Badan Meteorologi Klimatologi dan Geofisika (BMKG)
              </p>
              <div className="grid grid-cols-2 justify-center items-start lg:items-center text-xs lg:text-base mt-5   lg:mt-10 ">
                <Image
                  src={BMKG}
                  alt="logo bmkg"
                  className="w-[50%] translate-x-1/2 lg:translate-x-0 lg:place-self-center "
                />
                <div className="max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto -ml-5">
                  Fakta menarik tentang BMKG:
                  <ul className="list-disc">
                    <li>BMKG didirikan pada tahun 1966</li>
                    <li>BMKG memiliki 34 kantor di seluruh Indonesia</li>
                    <li>
                      BMKG bertanggung jawab dalam memberikan informasi cuaca, iklim, dan gempa bumi
                    </li>
                    <li>BMKG memiliki peran penting dalam mitigasi bencana alam di Indonesia.</li>
                  </ul>
                  <br />
                  Ingin tahu lebih banyak tentang BMKG? Kunjungi website BMKG di
                  <br />
                  <Link href="https://www.bmkg.go.id" className="underline text-blue-800">
                    https://www.bmkg.go.id
                  </Link>
                  <br />
                  <br />
                  Bersama BMKG, kita jaga Indonesia dari bencana!
                </div>
              </div>
            </div>
            <BackButton back={handleBack} />
            {/* <NextButton next={handleNext} /> */}
          </div>
        );
      default:
        return null;
    }
  }, [activeIndex, showMenu]);

  return element;
}
