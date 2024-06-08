'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { activityState } from '@/atoms/user.activity';
import { userProfileAtom } from '@/atoms/user.profile';
import DisasterCard from '@/components/DisasterCard';
import Modal from '@/components/Modal';
import Navigation from '@/components/Navigation';
import EruptionContent from '@/components/erupsi/EruptionContent';
import EvaluationContent from '@/components/evaluasi/EvaluationContent';
import MitigationContent from '@/components/mitigasi/MitigationContent';
import TsunamiContent from '@/components/tsunami/TsunamiContent';
import GempaContent from '@/components/gempa/GempaContent';
import enums from '@/enums/enum';
import Cookies from 'js-cookie';
import { Caesar_Dressing } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import eruptionImage from '../public/menu/erupsi.png';
import evaluationImage from '../public/menu/evaluasi.png';
import earthquakeImage from '../public/menu/gempa.png';
import mitigationImage from '../public/menu/mitigasi.png';
import tsunamiImage from '../public/menu/tsunami.png';
import utils from '@/lib/utils';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

const Container = ({ children }) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    const profile = JSON.parse(Cookies.get('user_profile') || null);
    setUserProfile(profile);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#253333]">
      <Navigation existedUser={userProfile} />
      {children}
    </div>
  );
};

const activitiesMenu = [
  {
    order: 5,
    title: 'Evaluasi',
    imageSrc: evaluationImage,
    description: 'Uji pemahamanmu terkait materi yang sudah dipelajari sebelumnya.',
    state: enums.ACTIVITY.EVALUATION,
  },
  {
    order: 1,
    title: 'Erupsi',
    imageSrc: eruptionImage,
    description:
      'Pelajari kronologi erupsi secara interaktif dan visual yang menarik melalui simulasi AR yang imersif dan realistis',
    state: enums.ACTIVITY.ERUPTION,
  },
  {
    order: 2,
    title: 'Tsunami',
    imageSrc: tsunamiImage,
    description:
      'Pelajari kronologi tsunami secara interaktif dan visual yang menarik melalui simulasi AR yang imersif dan realistis',
    state: enums.ACTIVITY.TSUNAMI,
  },
  {
    order: 3,
    title: 'Gempa Bumi',
    imageSrc: earthquakeImage,
    description:
      'Pelajari kronologi gempa bumi secara interaktif dan visual yang menarik melalui simulasi AR yang imersif dan realistis',
    state: enums.ACTIVITY.EARTHQUAKE,
  },
  {
    order: 4,
    title: 'Mitigasi',
    imageSrc: mitigationImage,
    description:
      'Pelajari terkait mitigasi secara interaktif dan visual yang menarik melalui simulasi AR yang imersif dan realistis.',
    state: enums.ACTIVITY.MITIGATION,
  },
];

const SuspenseHome = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activity, setActivity] = useRecoilState(activityState);
  const [realIndex, setRealIndex] = useState(0);
  const [evaluationStarted, setEvaluationStarted] = useState();

  useEffect(() => {
    const evalState = localStorage.getItem('edudisaster_eval') || null;
    setEvaluationStarted(evalState);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activityParam = urlParams.get('activity');
    if (activityParam) {
      setActivity(activityParam);
    } else {
      setActivity(enums.ACTIVITY.IDLE);
    }
  }, [searchParams]);

  const element = useMemo(() => {
    switch (activity) {
      case enums.ACTIVITY.IDLE:
        return (
          <Container>
            <div className="h-full relative flex flex-col lg:gap-y-2 items-center justify-center lg:pt-10">
              <p
                className={`${caesarDressing.className} text-white text-lg lg:text-5xl text-center`}
              >
                PILIH KARTU UNTUK MEMULAI
              </p>
              <div className="max-w-[600px] lg:max-w-[1080px]">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  loop={true}
                  keyboard={{
                    enabled: true,
                  }}
                  initialSlide={0}
                  modules={[Keyboard]}
                  onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
                >
                  {activitiesMenu.map((activity, index) => {
                    const activitySearchParams = new URLSearchParams(searchParams.toString());
                    activitySearchParams.set('activity', activity.state);
                    activitySearchParams.set('index', 0);
                    const activityURL = utils.createUrl(pathname, activitySearchParams);

                    let realOrder = activity.order - 1;

                    return (
                      <SwiperSlide className="py-7 px-2 lg:py-16" key={index}>
                        <Link
                          href={
                            activity.state === enums.ACTIVITY.EVALUATION
                              ? evaluationStarted
                                ? '/evaluasi'
                                : activityURL
                              : activityURL
                          }
                          onClick={() => {
                            if (activity.state === enums.ACTIVITY.EVALUATION && evaluationStarted) {
                              return;
                            }
                            setActivity(activity.state);
                          }}
                        >
                          <DisasterCard
                            index={activity.order}
                            isActive={realIndex === realOrder}
                            imageSrc={activity.imageSrc}
                            title={activity.title}
                            description={activity.description}
                          />
                        </Link>
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
            <Modal>
              <EruptionContent />
            </Modal>
          </Container>
        );
      case enums.ACTIVITY.TSUNAMI:
        return (
          <Container>
            <Modal>
              <TsunamiContent />
            </Modal>
          </Container>
        );
      case enums.ACTIVITY.EARTHQUAKE:
        return (
          <Container>
            <Modal>
              <GempaContent />
            </Modal>
          </Container>
        );
      case enums.ACTIVITY.MITIGATION:
        return (
          <Container>
            <Modal>
              <MitigationContent />
            </Modal>
          </Container>
        );
      case enums.ACTIVITY.EVALUATION:
        return (
          <Container>
            <Modal>
              <EvaluationContent />
            </Modal>
          </Container>
        );
      default:
        return <Container></Container>;
    }
  }, [activity, realIndex, evaluationStarted]);

  return element;
}

export default SuspenseHome;
