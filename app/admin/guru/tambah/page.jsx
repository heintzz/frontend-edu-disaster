'use client';

import AdminServices from '@/services/admin.services';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBackOutline } from 'react-icons/io5';

const InputField = ({ label, type, name, placeholder, value, handleValueChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">{label}</p>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleValueChange}
        className="placeholder:text-[#BBB1B1] font-medium border border-[#BBB1B1] px-[14px] py-[10px] rounded-xl flex items-center focus:outline-none"
      />
    </div>
  );
};

const defaultTeacherInput = {
  name: '',
  email: '',
  password: '',
};

const HalamanTambahGuru = () => {
  const router = useRouter();
  const [teacherInput, setTeacherInput] = useState(defaultTeacherInput);

  const handleValueChange = (e) => {
    setTeacherInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createTeacherAccount = async () => {
    try {
      const response = await AdminServices.createTeacherAccount(teacherInput);
      if (response.success) {
        toast.success('Akun guru berhasil dibuat');
        router.push('/admin/guru');
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal membuat akun guru');
    }
  };

  return (
    <div className="w-4/5 ml-[20%] px-[5vh] py-[4vh] flex flex-col justify-between">
      <div className="w-full flex flex-col gap-12">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => router.push('/admin/guru')}
        >
          <IoArrowBackOutline size={24} color="black" />
          <button className="font-semibold text-xl">Tambah Guru</button>
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <InputField
            label="Nama"
            type="text"
            name="name"
            placeholder="masukkan nama guru"
            value={teacherInput.name}
            handleValueChange={handleValueChange}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="masukkan email guru"
            value={teacherInput.email}
            handleValueChange={handleValueChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={teacherInput.password}
            handleValueChange={handleValueChange}
          />
        </div>
      </div>
      <button
        onClick={createTeacherAccount}
        className="w-fit rounded px-[8px] py-[10px] bg-[#29ADB2] font-semibold text-sm text-center text-white"
      >
        Tambah
      </button>
    </div>
  );
};

export default HalamanTambahGuru;
