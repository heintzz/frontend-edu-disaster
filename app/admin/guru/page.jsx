'use client'

import NavbarAdmin from '@/components/NavbarAdmin';
import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

  const jakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
  });

  const headers = [
    { text: 'Name', width: '1/4' },
    { text: 'Class', width: '1/6' },
    { text: 'Email', width: '1/4' },
    { text: 'Status', width: '1/6' },
    { text: 'Aksi', width: '1/6'},
  ];

  const teacherData = [
    { name: 'Emilia Rusdiana S.Pd', class: 'X IPS2', email: 'emilia.rusdiana@gmail.com', status: 'Terverivikasi' },
    { name: 'Budi Santoso S.Pd, M.Pd', class: 'X IPS 3', email: 'budi.sans@gmail.com', status: 'Terverivikasi' },
    { name: 'Suharti S.Pd', class: 'X IPS 4', email: 'suharti44@gmail.com', status: 'Belum Terverivikasi' },
  ];

const Dashboard = () => {
    const router = useRouter();

    const handleTambahGuru = () => {
        router.push('/admin/guru/tambah');
    };

    const handleEditGuru = () => {
        router.push('/admin/guru/edit');
    };

    return (
        <div className={`w-screen h-screen flex ${jakartaSans}`}>
            <NavbarAdmin />
            <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col gap-12">
                <button className="rounded px-[12px] py-[10px] w-fit bg-[#29ADB2]" onClick={handleTambahGuru}>
                    <p className="font-semibold text-sm text-center text-white">Tambah Guru</p>
                </button>
                <div className='w-full flex flex-col gap-6'>
                    <div className="w-full flex gap-4 items-center rounded-md bg-[#E0E0E0] p-3">
                        <MdSearch size={20} color="gray" />
                        <input
                            type="text"
                            placeholder="Cari pengguna berdasarkan nama/email"
                            className="font-medium text-sm text-[#8A8A8A] bg-transparent border-none outline-none flex-1"
                            onChange={(e) => setSearchParams(e.target.value)}
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
                            {teacherData.map((teacher, index) => (
                                <div
                                    key={index}
                                    className={`w-full flex items-center py-[2vh] pl-3 ${
                                        index % 2 === 1 ? 'bg-[#EBF6FF80]' : ''
                                    }`}
                                    >
                                    <div className='w-1/4 flex items-center gap-4'>
                                        <div className="w-6 h-6 rounded-full bg-slate-500" />
                                        <p className="text-sm font-semibold text-[#424242]">{teacher.name}</p>
                                    </div>
                                    <div className='w-1/6 flex items-center gap-4'>
                                        <p className="text-sm font-semibold text-[#424242]">{teacher.class}</p>
                                    </div>
                                    <div className='w-1/4 flex items-center gap-4'>
                                        <p className="text-sm font-semibold text-[#424242]">{teacher.email}</p>
                                    </div>
                                    <div className='w-1/6 flex items-center gap-4'>
                                        <p className="text-sm font-semibold text-[#424242]">{teacher.status}</p>
                                    </div>
                                    <div className='w-1/6 flex items-center gap-2'>
                                        <Image
                                            src={"/edit.svg"}
                                            alt='editicon'
                                            width={24}
                                            height={24}
                                            className='cursor-pointer'
                                            onClick={handleEditGuru}
                                        />
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
        </div>
    );
}

export default Dashboard;
