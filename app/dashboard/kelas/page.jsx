'use client'

import NavbarGuru from '@/components/NavbarGuru';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';

const Page = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const router = useRouter();

    const handleBuatKelas = () => {
        router.push('/dashboard/kelas/buat');
    };

    const handleIconClick = (index, iconType) => {
        if (iconType === 'progressIcon') {
            router.push('/');
        } else if (iconType === 'resultIcon') {
            router.push('/');
        } else if (iconType === 'trashIcon') {
            // Menghapus users
        }
    };

    const copyKodeKelas = () => {
        const kodeKelas = 'XSADSA'; // bingung biar bisa dynamic
        navigator.clipboard.writeText(kodeKelas)
            .then(() => {
                console.log('Teks disalin ke clipboard:', kodeKelas);
            })
            .catch((error) => {
                console.error('Gagal menyalin teks ke clipboard:', error);
            });
    };

    const headers = [
        { text: 'Name', width: '1/4' },
        { text: 'Email', width: '1/2' },
        { text: 'Aksi', width: '1/4' }
    ];

    const users = [
        { name: 'Aksa Padmarini R', email: 'aksarini@gmail.com' },
        { name: 'Oriza Sativa', email: 'emilia.rusdiana@gmail.com' },
        { name: 'Jeffer Christian P', email: 'jchristianp@gmail.com' },
        { name: 'Oriza Sativa', email: 'emilia.rusdiana@gmail.com' }
    ];

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
                <div className='w-full flex flex-col'>
                    <div className='flex justify-between'>
                        <div className='relative'>
                            <button 
                                className='flex gap-2 items-center bg-[#EBF6FF80] rounded-tl-lg rounded-tr-lg px-3 py-2'
                                onClick={toggleDropdown}
                            >
                                <p className='font-kumbh text-sm font-medium'>Pilih Kelas</p>
                                <AiFillCaretDown 
                                    size={8} 
                                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                                />
                            </button>
                            {isOpen && (
                                <div className='absolute mt-2 bg-white shadow-lg rounded-lg w-full'>
                                    {/* Belum 1 list 1 row */}
                                    <ul className='flex flex-col'>
                                        <li className='px-4 py-2 hover:bg-[#EBF6FF] cursor-pointer'>XII IPA 1 - 2023/2024</li>
                                        <li className='px-4 py-2 hover:bg-[#EBF6FF] cursor-pointer'>XII IPA 2 - 2023/2024</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <p className='font-kumbh text-sm'>Kode Kelas: XSADSA</p> {/* Belum dynamic */}
                            <button onClick={copyKodeKelas}>
                                <IoCopyOutline size={16} />
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex items-center py-[2vh] pl-3 bg-[#EBF6FF80]'>
                        {headers.map(header => (
                            <div key={header.text} className={`w-${header.width} flex items-center`}>
                                <p className='font-kumbh font-bold text-sm text-[#424242]'>{header.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className='w-full flex flex-col'>
                        {users.map((user, index) => (
                            <div key={index} className={`w-full flex items-center py-[2vh] pl-3 ${index % 2 === 0 ? 'bg-white' : 'bg-[#EBF6FF80]'}`}>
                                <div className='w-1/4 flex items-center gap-4'>
                                    <div className='w-6 h-6 rounded-full bg-slate-500' />
                                    <p className='font-kumbh text-sm font-semibold text-[#424242]'>{user.name}</p>
                                </div>
                                <div className='w-1/2 flex items-center'>
                                    <p className='font-kumbh text-sm font-semibold text-[#424242]'>{user.email}</p>
                                </div>
                                <div className='w-1/4 flex items-center gap-2'>
                                    {['progressIcon', 'resultIcon', 'trashIcon'].map((icon, iconIndex) => (
                                        <Image
                                            key={iconIndex}
                                            src={`/dashboard/${icon}.svg`} 
                                            alt={`${icon} icon`} 
                                            width={24} 
                                            height={24}
                                            className='cursor-pointer'
                                            onClick={() => handleIconClick(index, icon)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
