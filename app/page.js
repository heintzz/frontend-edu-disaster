'use client';

import { Caesar_Dressing } from 'next/font/google';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import DisasterCard from '@/components/DisasterCard';

const caesar_dressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#253333] p-10">
      <div className="h-[calc(100%-58px)] relative flex flex-col gap-y-10 items-center justify-center mt-10">
        <p className={`${caesar_dressing.className} text-white text-5xl text-center`}>
          PILIH KARTU UNTUK MEMULAI
        </p>
        <div className="max-w-[1580px]">
          {/* BUG: waktu init stretching -> coba ulang prosesnya dari awal, amati keganjilannya */}
          <Swiper slidesPerView={3} spaceBetween={60} loop={true} initialSlide={0}>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <SwiperSlide className="py-16 px-4" key={index}>
                  <DisasterCard
                    index={index + 1}
                    imageSrc="https://images.unsplash.com/photo-1714733710199-ce4532b6a3b2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="Erupsi"
                    description="Pelajari kronologi erupsi secara interaktif dan visual yang menarik
                          melalui simulasi AR yang imersif dan realistis."
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}
