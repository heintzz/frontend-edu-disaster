'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

const HalamanStatistikSiswa = () => {
  const router = useRouter();

  const handleDashboard = () => {
    router.push('/dashboard/kelas');
  };

  return (
    <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col gap-8">
      <div className="flex gap-4 items-center cursor-pointer" onClick={handleDashboard}>
        <IoArrowBackOutline size={24} color="black" />
        <button className="font-kumbh font-semibold text-xl">Statistik Siswa</button>
      </div>
    </div>
  );
};

export default HalamanStatistikSiswa;
