'use client';

import { loadingUserAtom, userProfileAtom } from '@/atoms/user.profile';
import NavbarGuru from '@/components/NavbarGuru';
import Cookies from 'js-cookie';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function DashboardLayout({ children }) {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const setIsLoading = useSetRecoilState(loadingUserAtom);

  useEffect(() => {
    setIsLoading(true);
    const profile = JSON.parse(Cookies.get('user_profile') || null);
    setUserProfile(profile);
    setIsLoading(false);
  }, []);

  return (
    <div className={`min-w-screen min-h-screen overflow-x-hidden flex ${jakartaSans.className}`}>
      <NavbarGuru profile={userProfile} />
      {children}
    </div>
  );
}
