'use client';

import enums from '@/enums/enum';
import apiV1 from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const [chosenRole, setChosenRole] = useState(enums.ROLE.STUDENT);
  const [signupData, setSignupData] = useState({});

  const handleButtonClick = (role) => {
    setChosenRole(role);
  };

  const registerUser = async () => {
    const data = {
      ...signupData,
      role: chosenRole,
    };

    try {
      const res = await apiV1.post('/auth/signup', data);
      if (res) {
        setSignupData({
          name: '',
          institutionCode: '',
          email: '',
          password: '',
        });
        setChosenRole(enums.ROLE.STUDENT);
        alert('Registrasi berhasil');
        router.push('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error);
      console.error(error);
    }
  };

  const handleValueChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const userData = [
    { label: 'Nama Lengkap', type: 'text', placeholder: 'mail ismail', json_name: 'name' },
    { label: 'Kode Sekolah', type: 'text', placeholder: '12345', json_name: 'institutionCode' },
    { label: 'Email', type: 'email', placeholder: 'mail@abc.com', json_name: 'email' },
    { label: 'Password', type: 'password', placeholder: '*********', json_name: 'password' },
  ];

  return (
    <div className="w-screen h-screen flex justify-between items-center px-[3vw] py-[7vh] bg-[#29ADB2]">
      <div className="flex justify-center items-center w-3/5">
        <p className="text-[100px] text-white">EduDisaster</p>
      </div>
      <div className="flex flex-col items-center w-2/5 h-full bg-[#253333] rounded-3xl px-[4vw] py-[5vh]">
        <p className="font-bold text-center text-[#F9F9F9] text-4xl mb-7">Daftar Akun</p>
        <div className="flex flex-col w-full gap-4">
          <p className="font-semibold text-[#F5F5F5] text-sm">Daftar Sebagai</p>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <button
                className={`w-5 h-5 rounded-full bg-[#253333] border-2 border-slate-500 ${
                  chosenRole === enums.ROLE.TEACHER ? 'bg-blue-500' : ''
                }`}
                onClick={() => handleButtonClick(enums.ROLE.TEACHER)}
              />
              <p className="font-semibold text-sm text-[#F5F5F5]">Guru</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`w-5 h-5 rounded-full bg-[#253333] border-2 border-slate-500 ${
                  chosenRole === enums.ROLE.STUDENT ? 'bg-blue-500' : ''
                }`}
                onClick={() => handleButtonClick(enums.ROLE.STUDENT)}
              />
              <p className="font-semibold text-sm text-[#F5F5F5]">Siswa</p>
            </div>
          </div>
          {userData.map((item) => (
            <div className="w-full flex flex-col gap-2" key={item.label}>
              <p className="font-semibold text-sm text-[#DDDDDD]">{item.label}</p>
              <input
                name={item.json_name}
                className="w-full border border-[#DED2D9] rounded-md px-[13px] py-[10px] text-[#E0E0E0] text-sm bg-[#253333] focus:outline-none"
                type={item.type}
                placeholder={item.placeholder}
                onChange={handleValueChange}
              />
            </div>
          ))}
          <button
            onClick={registerUser}
            className="w-full bg-[#29ADB2] rounded-md py-[10px] font-extrabold text-lg text-white"
          >
            Daftar
          </button>
          <div className="w-full flex justify-center gap-2">
            <p className="text-white">Sudah punya akun?</p>
            <button
              onClick={() => router.push('/login')}
              className="text-white underline font-bold"
            >
              Masuk!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
