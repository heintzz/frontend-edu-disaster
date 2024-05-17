'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [profileImage, setProfileImage] = useState('profile.svg');
    const [error, setError] = useState('');

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

    const handleBack = () => {
        router.push('/')
    }

    return (
        <div className='w-screen h-screen bg-[#29ADB280] flex justify-center'>
            <div className='w-5/6 sm:w-4/5 lg:w-3/5 h-full bg-white flex-col py-[2vh] px-[5vw] sm:px-[3vw] gap-5'>
                <div className='flex justify-end items-center my-5'>
                    <img 
                        src="closeBtn.svg"
                        alt="close button"
                        onClick={handleBack}
                        className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='relative'>
                        <img 
                            src={profileImage}
                            alt="foto profil diri"
                            onClick={handleImageClick}
                            className='cursor-pointer rounded-full w-[95px] h-[95px] sm:w-[105px] sm:h-[105px] lg:w-[114px] lg:h-[114px]'
                        />
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                    {error && <p className='text-red-500'>{error}</p>}
                    <p className='font-assistant text-2xl sm:text-3xl lg:text-4xl font-bold mt-1.5 mb-1'>Mail Ismail</p>
                    <p className='font-assistant text-base sm:text-lg lg:text-xl mb-1'>mail@mail.com</p>
                    <p className='font-assistant font-semibold text-base sm:text-lg lg:text-xl'>Anggota Kelas A-1</p>
                </div>
                <div className='flex gap-6 sm:gap-10 my-[8vh] justify-center'>
                    <div className='relative'>
                        <img 
                            src="ellipse.svg"
                            alt="diagram nilai"
                            className='z-[0] relative w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-[86px] lg:h-[86px]'
                        />
                        <p className='font-assistant font-semibold text-base sm:text-lg lg:text-xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]'>0%</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <img 
                            src="check.svg"
                            alt="tanda centang"
                            className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
                        />
                        <p className='font-assistant font-semibold text-base sm:text-lg lg:text-xl'>7/10</p>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <p className='font-assistant font-bold text-base sm:text-lg lg:text-xl'>Catatan Guru:</p>
                    <div className='w-5/6 sm:w-3/4 lg:w-2/3 rounded-[10px] bg-[#F5F5F5] px-4 py-2'>
                        <p className='font-assistant text-[#000000ED] text-sm lg:text-base text-justify'>Lanjutkan Nak Mail! Itu baca materinya tinggal dikit,  untuk persiapan Ujian UTS ke depan. Semangat.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
