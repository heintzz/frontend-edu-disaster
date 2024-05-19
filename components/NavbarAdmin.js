'use client';

import Cookies from 'js-cookie';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';

import avatar from '@/public/profile.svg';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const NavbarAdmin = ({ profile }) => {
  const router = useRouter();

  const [isSiswaClicked, setIsSiswaClicked] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsSiswaClicked(false);
  }, []);

  const handleSiswaClick = () => {
    setIsSiswaClicked(true);
  };

  const handleGuruClicked = () => {
    setIsSiswaClicked(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should be less than 2MB');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('user_profile');
    router.push('/login');
  };

  return (
    <div
      className={`w-1/5 h-screen bg-[#253333] flex flex-col items-center ${jakartaSans.className}`}
    >
      <div className="h-1/4 w-full flex flex-col items-center justify-center gap-6 border-b-[1px] border-[#BDBDBD]">
        <div className="relative">
          <Image
            src={profileImage ? profileImage : avatar}
            alt="foto profil diri"
            width={66}
            height={66}
            onClick={handleImageClick}
            className="cursor-pointer rounded-full"
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <p className="font-semibold text-sm text-white">{profile?.name}</p>
      </div>
      <div className="h-4/5 w-full flex flex-col items-center justify-between py-[4vh] px-[3vw]">
        <div className="w-full flex flex-col gap-6">
          <button
            className={`w-full flex justify-between items-center p-3 rounded ${
              !isSiswaClicked ? 'bg-[#29ADB2]' : ''
            }`}
            onClick={handleGuruClicked}
          >
            <div className="flex gap-3 items-center">
              <Image 
                src={"/toga.svg"}
                alt="toga"
                width={16}
                height={16}
                color='white'
              />
              <p className="font-semibold text-sm text-white">Guru</p>
            </div>
            {!isSiswaClicked && (
              <MdKeyboardArrowRight
                size={16}
                color={!isSiswaClicked ? 'white' : 'transparent'}
              />
            )}
          </button>
          <button
            className={`w-full flex justify-between items-center p-3 rounded ${
              isSiswaClicked ? 'bg-[#29ADB2]' : ''
            }`}
            onClick={handleSiswaClick}
          >
            <div className="flex gap-3 items-center">
              <Image 
                src={"/toga.svg"}
                alt="toga"
                width={16}
                height={16}
                color='white'
              />
              <p className="font-semibold text-sm text-white">Siswa</p>
            </div>
            {isSiswaClicked && (
              <MdKeyboardArrowRight
                size={16}
                color={isSiswaClicked ? 'white' : 'transparent'}
              />
            )}
          </button>
        </div>
        <button className="px-8 py-4" onClick={handleLogout}>
          <p className="font-semibold text-sm text-center text-white">Log out</p>
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
