'use client';

import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineLineChart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const NavbarGuru = () => {
  const [isStatistikClicked, setIsStatistikClicked] = useState(false);
  const [profileImage, setProfileImage] = useState('profile.svg');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsStatistikClicked(false);
  }, []);

  const handleStatistikClick = () => {
    setIsStatistikClicked(true);
  };

  const handleKelasClick = () => {
    setIsStatistikClicked(false);
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

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('access_token', { path: '/' });
    // Cookies.remove('user_profile');
    // router.push('/login');
  };

  return (
    <div className="w-1/5 h-screen bg-[#253333] flex flex-col items-center">
      <div className="h-1/4 w-full flex flex-col items-center justify-center gap-6 border-b-[1px] border-[#BDBDBD]">
        <div className="relative">
          <img
            src={profileImage}
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
        <p className="font-kumbh font-semibold text-sm text-white">Emilia Rusdiana, S.Pd</p>
      </div>
      <div className="h-4/5 w-full flex flex-col items-center justify-between py-[4vh] px-[3vw]">
        <div className="w-full flex flex-col gap-6">
          <button
            className={`w-full flex justify-between items-center p-3 rounded ${
              !isStatistikClicked ? 'bg-[#29ADB2]' : ''
            }`}
            onClick={handleKelasClick}
          >
            <div className="flex gap-3 items-center">
              <FaHome size={16} color={'white'} />
              <p className="font-kumbh font-semibold text-sm text-white">Kelas</p>
            </div>
            {!isStatistikClicked && (
              <MdKeyboardArrowRight
                size={16}
                color={!isStatistikClicked ? 'white' : 'transparent'}
              />
            )}
          </button>
          <button
            className={`w-full flex justify-between items-center p-3 rounded ${
              isStatistikClicked ? 'bg-[#29ADB2]' : ''
            }`}
            onClick={handleStatistikClick}
          >
            <div className="flex gap-3 items-center">
              <AiOutlineLineChart size={16} color={'white'} />
              <p className="font-kumbh font-semibold text-sm text-white">Statistik</p>
            </div>
            {isStatistikClicked && (
              <MdKeyboardArrowRight
                size={16}
                color={isStatistikClicked ? 'white' : 'transparent'}
              />
            )}
          </button>
        </div>
        <button className="px-8 py-4" onClick={handleLogout}>
          <p className="font-kumbh font-semibold text-sm text-center text-white">Log out</p>
        </button>
      </div>
    </div>
  );
};

export default NavbarGuru;
