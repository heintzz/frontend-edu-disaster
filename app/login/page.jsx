'use client';

import apiV1 from '@/lib/api';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600'] });

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({});
  const [isWaitingResponse, setWaitingResponse] = useState(false);

  const handleValueChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const res = await apiV1('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });
      if (res.ok) {
        setLoginData({});
        setWaitingResponse(false);
        router.push('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || error);
      console.error(error);
      setWaitingResponse(false);
    }
  };

  return (
    <div
      className={`w-screen h-screen bg-[#29ADB2] flex justify-between items-center px-[3vw] py-[7vh]  ${plusJakarta.className}`}
    >
      <div className="flex justify-center items-center w-3/5">
        <p className="text-[100px] text-white">EduDisaster</p>
      </div>
      <div className="flex flex-col items-center w-2/5 h-full bg-[#253333] rounded-3xl px-[4vw] py-[7vh]">
        <div className="flex flex-col items-center gap-10 w-full">
          <p className="font-bold text-center text-4xl text-white">Masuk ke Akun</p>
          {/* <button className="flex justify-center items-center border border-[#E8E8E8] rounded-md w-full py-[10px] gap-4">
            <Image src="googleImage.svg" alt="Google Logo" width={25} height={25} />
            <p className=" text-[#DDDDDD] text-sm">Lanjut dengan Google</p>
          </button> */}
        </div>
        {/* <div className="flex justify-center items-center py-[6vh]">
          <p className="font-semibold text-xs text-white">
            ------------- atau masuk dengan email -------------
          </p>
        </div> */}
        <div className="w-full flex flex-col gap-5 py-[6vh]">
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-sm text-[#DDDDDD]">Email</p>
            <input
              className="w-full border border-[#DED2D9] rounded-md px-[13px] py-[10px] text-[#E0E0E0]  text-sm bg-[#253333] focus:outline-none"
              type="email"
              placeholder="mail@abc.com"
              name="email"
              onChange={handleValueChange}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold text-sm text-[#DDDDDD]">Password</p>
            <input
              className="w-full border border-[#DED2D9] rounded-md px-[13px] py-[10px] text-[#E0E0E0]  text-sm bg-[#253333] focus:outline-none"
              type="password"
              placeholder="*********"
              name="password"
              onChange={handleValueChange}
            />
            {/* <div className="flex items-center mt-2">
              <input
                className="w-[12px] h-[12px] border border-[#DED2D9] rounded-md mr-2"
                type="checkbox"
              />
              <p className=" text-xs text-white">Remember Me</p>
            </div> */}
          </div>
          <button
            onClick={loginUser}
            className={`w-full bg-[#29ADB2] rounded-md py-[10px] font-extrabold text-lg text-white ${
              isWaitingResponse ? 'cursor-not-allowed' : ''
            }`}
          >
            Masuk
          </button>
        </div>
        <div className="w-full flex justify-center gap-2">
          <p className="text-white">Belum punya akun?</p>
          <button
            onClick={() => router.push('/register')}
            className="text-white underline font-bold"
          >
            Daftar di sini!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
