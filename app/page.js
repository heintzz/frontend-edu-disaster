'use client';

import { Caesar_Dressing } from 'next/font/google';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { activityState } from '@/atoms/user.activity';
import DisasterCard from '@/components/DisasterCard';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import closeBtn from '../public/closeBtn.svg';

import enums from '@/enums/enum';

const caesar_dressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

const Container = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col bg-[#253333]">
      <Navigation />
      {children}
    </div>
  );
};

export default function Home() {
  const [activity, setActivity] = useRecoilState(activityState);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activityParam = urlParams.get('activity');
    if (activityParam) {
      setActivity(activityParam);
    } else {
      setActivity(enums.ACTIVITY.IDLE);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('activity', activity);
  }, [activity]);

  switch (activity) {
    case enums.ACTIVITY.IDLE:
      return (
        <Container>
          <div className="h-full relative flex flex-col lg:gap-y-2 items-center justify-center lg:pt-10">
            <p
              className={`${caesar_dressing.className} text-white text-lg lg:text-5xl text-center`}
            >
              PILIH KARTU UNTUK MEMULAI
            </p>
            <div className="max-w-[600px] lg:max-w-[1080px]">
              {/* BUG: waktu init stretching -> coba ulang prosesnya dari awal, amati keganjilannya */}
              <Swiper slidesPerView={3} spaceBetween={30} loop={true} initialSlide={0}>
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <SwiperSlide className="py-7 px-2 lg:py-16" key={index}>
                      <DisasterCard
                        index={index + 1}
                        imageSrc="https://images.unsplash.com/photo-1714733710199-ce4532b6a3b2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        title="Erupsi"
                        description="Pelajari kronologi erupsi secara interaktif dan visual yang menarik
                            melalui simulasi AR yang imersif dan realistis."
                        onClick={() => {
                          setActivity('eruption');
                        }}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </Container>
      );
    case enums.ACTIVITY.ERUPTION:
      return (
        <Container>
          <div className="h-full p-5 lg:p-20">
            <div className="h-full bg-white rounded-3xl relative">
              <Image
                src={closeBtn}
                alt="close button"
                className="absolute w-8 h-8 -right-3 -top-3 lg:-right-4 lg:-top-4"
                onClick={() => setActivity('idle')}
                role="button"
              />
              <div>isi disini yhh</div>
            </div>
          </div>
        </Container>
      );
    default:
      return <Container></Container>;
  }
}
