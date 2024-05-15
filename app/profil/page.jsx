'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
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
            <div className='w-3/5 h-full bg-white flex-col py-[2vh] px-[3vw] gap-5'>
                <div className='flex justify-end items-center my-5'>
                    <Image 
                        src="closeBtn.svg"
                        alt="close button"
                        width={42}
                        height={42}
                        onClick={handleBack}
                        className="cursor-pointer"
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='relative'>
                        <Image 
                            src={profileImage}
                            alt="foto profil diri"
                            width={114}
                            height={114}
                            onClick={handleImageClick}
                            className='cursor-pointer rounded-full'
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
                    <p className='font-assistant text-4xl font-bold mt-1.5 mb-1'>Mail Ismail</p>
                    <p className='font-assistant text-xl mb-1'>mail@mail.com</p>
                    <p className='font-assistant font-semibold text-xl'>Anggota Kelas A-1</p>
                </div>
                <div className='flex gap-10 my-[8vh] justify-center'>
                    <div className='relative'>
                        <Image 
                            src="ellipse.svg"
                            alt="diagram nilai"
                            width={86}
                            height={91}
                            className='z-[0] relative'
                        />
                        <p className='font-assistant font-semibold text-xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]'>0%</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <Image 
                            src="check.svg"
                            alt="tanda centang"
                            width={36}
                            height={38}
                        />
                        <p className='font-assistant font-semibold text-xl'>7/10</p>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <p className='font-assistant font-bold text-xl'>Catatan Guru:</p>
                    <div className='w-2/3 rounded-[10px] bg-[#F5F5F5] px-4 py-2'>
                        <p className='font-assistant text-[#000000ED] text-justify'>Lanjutkan Nak Mail! Itu baca materinya tinggal dikit,  untuk persiapan Ujian UTS ke depan. Semangat.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
