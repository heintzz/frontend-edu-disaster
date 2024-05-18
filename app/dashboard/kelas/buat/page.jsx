'use client';

import apiV1 from '@/lib/api';
import { tokenServices } from '@/services/token.services';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';


const HalamanBuatKelas = () => {
  const router = useRouter();
  const [classCode, setClassCode] = useState(null);
  const [createClassValue, setCreateClassValue] = useState({});

  const generateRandomClassCode = async () => {
    try {
      const res = await apiV1.get('/teacher/classes/code', {
        headers: {
          Authorization: `Bearer ${tokenServices.getAccessToken()}`,
        },
      });
      const json = res.data;
      if (json.success) {
        setClassCode(json.data.classCode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateClassValueChange = (e) => {
    const { name, value } = e.target;
    setCreateClassValue((prev) => ({ ...prev, [name]: value }));
  };

  const createClass = async () => {
    const pattern = /^\d{4}\/\d{4}$/;
    if (!pattern.test(createClassValue.academicYear)) {
      alert('Format tahun ajaran salah');
      return;
    }

    try {
      const res = await apiV1.post(
        '/teacher/classes',
        {
          ...createClassValue,
          classCode: classCode,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenServices.getAccessToken()}`,
          },
        }
      );
      console.log(res);
      router.push('/dashboard/kelas');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col justify-between">
      <div className="flex flex-col gap-12">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => router.push('/dashboard/kelas')}
        >
          <IoArrowBackOutline size={24} color="black" />
          <button className="font-semibold text-xl">Buat Kelas</button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Nama</p>
            <input
              className="w-2/5 border border-[#BBB1B1] rounded-lg px-[14px] py-[10px] text-[#BBB1B1] font-medium focus:outline-none"
              type="text"
              placeholder="Masukkan Nama Kelas"
              name="name"
              onChange={handleCreateClassValueChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Kode Kelas</p>
            <div className="relative w-2/5">
              <div className="w-full relative z-[0] border border-[#BBB1B1] rounded-lg px-[14px] py-[10px] text-[#BBB1B1] font-medium focus:outline-none pr-10">
                {classCode || 'XSADSA'}
              </div>
              <FaRandom
                size={24}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={generateRandomClassCode}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Tahun Ajar</p>
            <div className="relative w-2/5">
              <input
                className="w-full relative z-[0] border border-[#BBB1B1] rounded-lg px-[14px] py-[10px] text-[#BBB1B1] font-medium focus:outline-none pr-10"
                type="text"
                placeholder="Masukkan tahun ajar (yyyy/yyyy)"
                name="academicYear"
                onChange={handleCreateClassValueChange}
              />
              <MdDateRange
                size={24}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={createClass}
        className="w-1/12 rounded px-[8px] py-[10px] bg-[#29ADB2] font-semibold text-sm text-center text-white"
      >
        Buat
      </button>
    </div>
  );
};

export default HalamanBuatKelas;
