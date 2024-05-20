'use client';

import dynamic from 'next/dynamic';
import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import arrow from '../../public/arrowBack.svg';

import Navigation from '@/components/Navigation';
import enums from '@/enums/enum';
import StudentServices from '@/services/student.services';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userProfileAtom } from '@/atoms/user.profile';
import Cookies from 'js-cookie';

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

const BackToHomeButton = ({ onClick }) => {
  return (
    <button
      className={`flex items-center absolute top-14 left-14 z-[1000] gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold rounded-[10px] p-1 text-sm lg:py-2 lg:px-4 lg:text-2xl`}
      onClick={onClick}
    >
      <Image src={arrow} alt="back icon" className="w-6 h-6" />
      <span>Ke Halaman Utama</span>
    </button>
  );
};

const BackButton = () => {
  return (
    <button
      className={`flex items-center absolute bottom-4 left-14 z-[1000] gap-x-2 ${caesarDressing.className} bg-[#29ADB2] text-white font-bold rounded-[10px] p-1 text-sm lg:py-2 lg:px-4 lg:text-2xl`}
      onClick={() => window.history.back()}
    >
      <Image src={arrow} alt="back icon" className="w-6 h-6" />
      <span>Kembali</span>
    </button>
  );
};

export default function HalamanPeta() {
  const searchParams = useSearchParams();
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    const profile = JSON.parse(Cookies.get('user_profile') || null);
    setUserProfile(profile);
  }, []);

  const updateStudentProgress = async (module) => {
    try {
      await StudentServices.updateStudentProgress(enums.DISASTER_TO_MODULES[module]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const module = searchParams.get('bencana');
    if (module) {
      updateStudentProgress(module);
    }
  }, [searchParams]);

  return (
    <main>
      <Navigation existedUser={userProfile} />
      <DynamicMap />
      <Link href="/">
        <BackToHomeButton />
      </Link>
      <BackButton />
    </main>
  );
}
