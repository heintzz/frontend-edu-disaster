'use client'

import NavbarAdmin from '@/components/NavbarAdmin';
import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { MdSearch } from 'react-icons/md';
import Image from 'next/image';

  const jakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
  });

  const headers = [
    { text: 'Name', width: '1/5' },
    { text: 'Class', width: '1/5' },
    { text: 'Email', width: '2/5' },
    { text: 'Aksi', width: '1/5'},
  ];

  const studentData = [
    { name: 'Oriza Sativa', class: 'X IPA 1', email: 'orizasativa@gmail.com' },
    { name: 'Muhammad Hasnan R', class: 'X IPA 2', email: 'budi.sans@gmail.com' },
    { name: 'Aksa Padmarini R', class: 'X IPS 2', email: 'suharti44@gmail.com' },
  ];

const Page = () => {
    return (
        <div className={`w-screen h-screen flex ${jakartaSans}`}>
            <NavbarAdmin />
            <div className='w-4/5 px-[5vh] py-[4vh] flex flex-col gap-12'>
                <div className="w-full flex gap-4 items-center rounded-md bg-[#E0E0E0] p-3">
                    <MdSearch size={20} color="gray" />
                    <input
                        type="text"
                        placeholder="Cari pengguna berdasarkan nama/email"
                        className="font-medium text-sm text-[#8A8A8A] bg-transparent border-none outline-none flex-1"
                    />
                </div>
                <div className='w-full flex flex-col'>
                    <div className="w-full flex items-center py-[2vh] pl-3 bg-[#EBF6FF80]">
                        {headers.map((header) => (
                        <div key={header.text} className={`w-${header.width} flex items-center`}>
                            <p className="font-bold text-sm text-[#424242]">{header.text}</p>
                        </div>
                        ))}
                    </div>
                    <div className='w-full flex flex-col'>
                        {studentData.map((student, index) => (
                            <div
                                key={index}
                                className={`w-full flex items-center py-[2vh] pl-3 ${
                                    index % 2 === 1 ? 'bg-[#EBF6FF80]' : ''
                                }`}
                                >
                                <div className='w-1/5 flex items-center gap-4'>
                                    <div className="w-6 h-6 rounded-full bg-slate-500" />
                                    <p className="text-sm font-semibold text-[#424242]">{student.name}</p>
                                </div>
                                <div className='w-1/5 flex items-center gap-4'>
                                    <p className="text-sm font-semibold text-[#424242]">{student.class}</p>
                                </div>
                                <div className='w-2/5 flex items-center gap-4'>
                                    <p className="text-sm font-semibold text-[#424242]">{student.email}</p>
                                </div>
                                <div className='w-1/5 flex items-center'>
                                    <Image
                                        src={"/dashboard/trashIcon.svg"}
                                        alt='trashicon'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer'
                                    />
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
