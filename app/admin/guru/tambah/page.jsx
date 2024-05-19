'use client'

import NavbarAdmin from '@/components/NavbarAdmin';
import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

  const jakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
  });

  const InputField = ({ label, type, name, placeholder }) => {
    return (
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>{label}</p>
        <input 
          type={type}
          name={name}
          placeholder={placeholder}
          className='text-[#BBB1B1] font-medium border border-[#BBB1B1] px-[14px] py-[10px] rounded-xl flex items-center focus:outline-none'
        />
      </div>
    );
  };

const Page = () => {
    const router = useRouter();

    return (
        <div className={`w-screen h-screen flex ${jakartaSans}`}>
            <NavbarAdmin />
            <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col justify-between">
                <div className='w-full flex flex-col gap-12'>
                    <div
                        className="flex gap-4 items-center cursor-pointer"
                        onClick={() => router.push('/admin/guru')}
                    >
                        <IoArrowBackOutline size={24} color="black" />
                        <button className="font-semibold text-xl">Tambah Guru</button>
                    </div>
                    <div className='w-1/2 flex flex-col gap-6'>
                        <InputField 
                            label="Nama"
                            type="text"
                            name="nama guru"
                            placeholder="nama guru"
                        />
                        <InputField 
                            label="Email"
                            type="email"
                            name="email guru"
                            placeholder="email guru"
                        />
                        <InputField 
                            label="Password"
                            type="password"
                            name="password guru"
                            placeholder="********"
                        />
                    </div>
                </div>
                <button className="w-1/12 rounded px-[8px] py-[10px] bg-[#29ADB2] font-semibold text-sm text-center text-white">
                    Tambah
                </button>
            </div>
        </div>
    );
}

export default Page;
