'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push('/register')
    }

    return (
        <div className='w-screen h-screen bg-[#29ADB280] flex justify-between items-center px-[3vw] py-[7vh]'>
            <div className='flex justify-center items-center w-3/5'>
                <p className='font-odor text-[100px] text-white'>EduDisaster</p>
            </div>
            <div className='flex flex-col items-center w-2/5 h-full bg-[#253333] rounded-3xl px-[4vw] py-[7vh]'>
                <div className='flex flex-col items-center gap-10 w-full'>
                    <p className='font-bold text-center text-4xl text-white font-nunito'>Masuk ke Akun</p>
                    <button className='flex justify-center items-center border border-[#E8E8E8] rounded-md w-full py-[10px] gap-4'>
                        <Image 
                            src="googleImage.svg"
                            alt="Google Logo"
                            width={25}
                            height={25}
                        />
                        <p className='font-nunito text-[#DDDDDD] text-sm'>Lanjut dengan Google</p>
                    </button>
                </div>
                <div className='flex justify-center items-center py-[6vh]'>
                    <p className='font-nunito font-semibold text-xs text-white'>------------- atau masuk dengan email -------------</p>
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-nunito font-semibold text-sm text-[#DDDDDD]'>Email</p>
                        <input
                            className='w-full border border-[#DED2D9] rounded-md px-[13px] py-[10px] text-[#E0E0E0] font-nunito text-sm bg-[#253333] focus:outline-none'
                            type="email"
                            placeholder="mail@abc.com"
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-nunito font-semibold text-sm text-[#DDDDDD]'>Password</p>
                        <input
                            className='w-full border border-[#DED2D9] rounded-md px-[13px] py-[10px] text-[#E0E0E0] font-nunito text-sm bg-[#253333] focus:outline-none'
                            type="password"
                            placeholder="*********"
                        />
                        <div className='flex items-center mt-2'>
                            <input
                                className='w-[12px] h-[12px] border border-[#DED2D9] rounded-md mr-2'
                                type="checkbox"
                            />
                            <p className='font-nunito text-xs text-white'>Remember Me</p>
                        </div>
                    </div>
                    <button className='w-full bg-[#29ADB2] rounded-md py-[10px]'>
                        <p className='font-nunito font-extrabold text-lg text-white'>Masuk</p>
                    </button>
                </div>
                <div className='w-full flex justify-center mt-[4vh] gap-2'>
                    <p className='font-nunito text-white'>Doesn't have account?</p>
                    <button className='font-nunito text-white underline font-bold' onClick={handleRegister}>Register now</button>
                </div>
            </div>
        </div>
    );
}

export default Page;