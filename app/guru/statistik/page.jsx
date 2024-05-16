'use client'

import NavbarGuru from '@/components/NavbarGuru';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/guru/dashboard');
    };

    return (
        <div className='w-screen h-screen flex'>
            <NavbarGuru />
            <div className='w-4/5 px-[5vh] py-[4vh] flex flex-col gap-8'>
                <div className='flex gap-4 items-center'>
                    <IoArrowBackOutline 
                        size={24}
                        color='black'
                    />
                    <button className='font-kumbh font-semibold text-xl' onClick={handleDashboard}>Statistik Siswa</button>
                    </div>
            </div>
        </div>
    );
}

export default Page;
