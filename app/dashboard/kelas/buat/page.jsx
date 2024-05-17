'use client'

import NavbarGuru from '@/components/NavbarGuru';
import React, { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaRandom } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [inputValue, setInputValue] = useState('');

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    const handleRandomString = () => {
        const randomString = generateRandomString();
        setInputValue(randomString);
    };

    const router = useRouter();

    const handleDashboard = () => {
        router.push('/dashboard/kelas');
    };

    return (
        <div className='w-screen h-screen flex'>
            <NavbarGuru />
            <div className='w-4/5 px-[5vh] py-[4vh] flex flex-col justify-between'>
                <div className='flex flex-col gap-12'>
                    <div className='flex gap-4 items-center cursor-pointer' onClick={handleDashboard}>
                        <IoArrowBackOutline 
                            size={24}
                            color='black'
                        />
                        <button className='font-kumbh font-semibold text-xl'>Buat Kelas</button>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-kumbh font-medium'>Nama</p>
                            <input
                                className='w-2/5 border border-[#BBB1B1] rounded-lg px-[14px] py-[10px] text-[#BBB1B1] font-kumbh font-medium focus:outline-none'
                                type="text"
                                placeholder="Masukkan Nama Kelas"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-kumbh font-medium'>Kode Kelas</p>
                            <div className='relative w-2/5'>
                                <input
                                    className='w-full relative z-[0] border border-[#BBB1B1] rounded-lg px-[14px] py-[10px] text-[#BBB1B1] font-kumbh font-medium focus:outline-none pr-10'
                                    type="text"
                                    placeholder="XSADSA"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <FaRandom 
                                    size={24} 
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' 
                                    onClick={handleRandomString} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-kumbh font-medium'>Tahun Ajar</p>
                            <div className='relative w-2/5'>
                                <input
                                    className='w-full relative z-[0] border border-[#BBB1B1] rounded-lg px-[14px] py-[10px] text-[#BBB1B1] font-kumbh font-medium focus:outline-none pr-10'
                                    type="text"
                                    placeholder="Masukkan tahun ajar (yyyy/yyyy)"
                                />
                                <MdDateRange size={24} className='absolute right-3 top-1/2 transform -translate-y-1/2' />
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-1/12 rounded px-[8px] py-[10px] bg-[#29ADB2]'>
                    <p className='font-kumbh font-semibold text-sm text-center text-white'>Buat</p>
                </button>
            </div>
        </div>
    );
}

export default Page;
