'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Register = () => {
    const [isActiveGuru, setIsActiveGuru] = useState(false);
    const [isActiveSiswa, setIsActiveSiswa] = useState(false);

    const handleButtonClick = (role) => {
        setIsActiveGuru(role === 'Guru');
        setIsActiveSiswa(role === 'Siswa');
    };

    const userData = [
        { label: 'Nama Lengkap', type: 'text', placeholder: 'mail ismail' },
        { label: 'Kode Sekolah', type: 'text', placeholder: '12345' },
        { label: 'Email', type: 'email', placeholder: 'mail@abc.com' },
        { label: 'Password', type: 'password', placeholder: '*********' },
      ];

    return (
        <div className='w-screen h-screen bg-[#29ADB280] flex justify-between items-center px-[3vw] py-[7vh]'>
            <div className='flex justify-center items-center w-3/5'>
                <p className='font-odor text-[100px] text-white'>EduDisaster</p>
            </div>
            <div className='flex flex-col items-center w-2/5 h-full bg-[#253333] rounded-3xl px-[4vw] py-[5vh]'>
                <p className='font-nunito font-bold text-center text-[#F9F9F9] text-4xl mb-6'>Daftar Akun</p>
                <div className='flex flex-col w-full gap-4'>
                    <p className='font-nunito font-semibold text-[#F5F5F5] text-sm'>Daftar Sebagai</p>
                    <div className='flex items-center gap-10'>
                        <div className='flex items-center gap-2'>
                            <button
                                className={`w-5 h-5 rounded-full bg-[#253333] border-2 border-slate-500 ${isActiveGuru ? 'bg-blue-500' : ''}`}
                                onClick={() => handleButtonClick('Guru')}
                            />
                            <p className='font-nunito font-semibold text-sm text-[#F5F5F5]'>Guru</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button
                                className={`w-5 h-5 rounded-full bg-[#253333] border-2 border-slate-500 ${isActiveSiswa ? 'bg-blue-500' : ''}`}
                                onClick={() => handleButtonClick('Siswa')}
                            />
                            <p className='font-nunito font-semibold text-sm text-[#F5F5F5]'>Siswa</p>
                        </div>
                    </div>
                    {userData.map((item) => (
                        <div className='w-full flex flex-col gap-2' key={item.label}>
                        <p className='font-nunito font-semibold text-sm text-[#DDDDDD]'>{item.label}</p>
                        <input
                            className='w-full border border-[#DED2D9] rounded-md px-[13px] py-[10px] text-[#E0E0E0] font-nunito text-sm bg-[#253333] focus:outline-none'
                            type={item.type}
                            placeholder={item.placeholder}
                        />
                        </div>
                    ))}
                    <div className='flex items-center'>
                        <input
                            className='w-[12px] h-[12px] border border-[#DED2D9] rounded-md mr-2'
                            type="checkbox"
                        />
                        <p className='font-nunito text-xs text-white'>Remember Me</p>
                    </div>
                    <button className='w-full bg-[#29ADB2] rounded-md py-[10px]'>
                        <p className='font-nunito font-extrabold text-lg text-white'>Daftar</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
