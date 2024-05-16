'use client'

import NavbarGuru from '@/components/NavbarGuru';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

const Page = () => {
    const router = useRouter();

    const handleBuatKelas = () => {
        router.push('/guru/dashboard/buatKelas');
    };

    return (
        <div className='w-screen h-screen flex'>
            <NavbarGuru />
            <div className='w-4/5 px-[5vh] py-[4vh] flex flex-col gap-12'>
                <button className='w-[10%] rounded px-[8px] py-[10px] bg-[#29ADB2]' onClick={handleBuatKelas}>
                    <p className='font-kumbh font-semibold text-sm text-center text-white'>Buat Kelas</p>
                </button>
                <div className='w-full flex gap-4 items-center rounded-md bg-[#E0E0E0] p-3'>
                    <MdSearch size={20} color='gray' />
                    <input
                        type="text"
                        placeholder="Cari pengguna berdasarkan nama/email"
                        className="font-kumbh font-medium text-sm text-[#8A8A8A] bg-transparent border-none outline-none flex-1"
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
