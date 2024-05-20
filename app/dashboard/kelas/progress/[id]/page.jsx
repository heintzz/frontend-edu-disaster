'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const HalamanProgressSiswa = ({ params }) => {
  const router = useRouter();
  const [checkedState, setCheckedState] = useState(modules.map(() => false));

  const handleToggle = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) => (idx === index ? !item : item));
    setCheckedState(updatedCheckedState);
  };

  const completedModules = checkedState.filter(Boolean).length;

  return (
    <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col gap-8">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={() => router.push('/dashboard/kelas')}
      >
        <IoArrowBackOutline size={24} color="black" />
        <button className="font-semibold text-xl">Progres Belajar User</button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p>
          <span className="font-bold">
            {completedModules}/{modules.length}
          </span>
          Modul Terselesaikan
        </p>
        <div className="w-full flex flex-col gap-2">
          {modules.map((module, index) => (
            <div key={module.id} className="flex gap-[13px] items-center">
              <button onClick={() => handleToggle(index)}>
                {checkedState[index] ? (
                  <Image src="/checkedCheckbox.svg" width={24} height={24} alt="checkedCheckbox" />
                ) : (
                  <Image src="/checkbox.svg" width={24} height={24} alt="checkbox" />
                )}
              </button>
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

export default HalamanProgressSiswa;
