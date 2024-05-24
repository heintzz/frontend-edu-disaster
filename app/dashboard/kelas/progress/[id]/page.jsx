'use client';

import TeacherServices from '@/services/teacher.services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

const modules = [
  { id: 1, title: 'Modul 1 - Pembelajaran Erupsi' },
  { id: 2, title: 'Modul 2 - Pembelajaran Gempa Bumi' },
  { id: 3, title: 'Modul 3 - Pembelajaran Tsunami' },
  { id: 4, title: 'Modul 4 - Jelajah Peta Erupsi' },
  { id: 5, title: 'Modul 5 - Jelajah Peta Gempa Bumi' },
  { id: 6, title: 'Modul 6 - Jelajah Peta Tsunami' },
  { id: 7, title: 'Modul 7 - Mitigasi Erupsi' },
  { id: 8, title: 'Modul 8 - Mitigasi Gempa Bumi' },
  { id: 9, title: 'Modul 9 - Mitigasi Tsunami' },
  { id: 10, title: 'Modul 10 - Jenis Mitigasi' },
  { id: 11, title: 'Modul 11 - Lembaga Mitigasi' },
  { id: 12, title: 'Modul 12 - Evaluasi' },
];

const SuspenseHalamanProgressSiswa = ({ params }) => {
  return (
    <Suspense>
      <HalamanProgressSiswa id={params.id} />
    </Suspense>
  );
};

const HalamanProgressSiswa = ({ id }) => {
  const router = useRouter();
  const [progress, setProgress] = useState([]);
  const completedIds = progress.map((p) => p.lesson_id);
  const completed = progress.length;

  const getStudentProgress = async () => {
    try {
      const res = await TeacherServices.getStudentProgress(id);
      if (res.success) {
        setProgress(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentProgress();
  }, []);

  return (
    <div className="w-4/5 ml-[20%] px-[5vh] py-[4vh] flex flex-col gap-8">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={() => router.push('/dashboard/kelas')}
      >
        <IoArrowBackOutline size={24} color="black" />
        <button className="font-semibold text-xl">Progres Belajar</button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p>
          <span className="font-bold">
            {completed}/{modules.length}&nbsp;
          </span>
          Modul Terselesaikan
        </p>
        <div className="w-full flex flex-col gap-2">
          {modules.map((module, index) => (
            <div key={module.id} className="flex gap-[13px] items-center">
              <div>
                {completedIds.includes(module.id) ? (
                  <Image src="/checkedCheckbox.svg" width={24} height={24} alt="checkedCheckbox" />
                ) : (
                  <Image src="/checkbox.svg" width={24} height={24} alt="checkbox" />
                )}
              </div>
              <p>{module.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[17vh] border border-[#BBB1B1] rounded-lg px-[1vw] py-[1.5vh] relative">
        <textarea
          className="w-[90%] h-[12vh] focus:outline-none resize-none"
          placeholder="Tambahkan catatan...."
          rows="4"
        />
        <button className="absolute bottom-[1.5vh] right-[1vw] rounded-lg px-[14px] py-[8px] w-fit bg-[#29ADB2]">
          <p className="font-semibold text-sm text-center text-white">Kirim</p>
        </button>
      </div>
    </div>
  );
};

export default SuspenseHalamanProgressSiswa;
