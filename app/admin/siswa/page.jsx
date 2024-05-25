'use client';

import SkeletonTable from '@/components/skeleton/SkeletonTable';
import AdminServices from '@/services/admin.services';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const headers = [
  { text: 'Name', width: '[40%]' },
  { text: 'Class', width: '[20%]' },
  { text: 'Email', width: '[30%]' },
  { text: 'Aksi', width: '[10%]' },
];

const HalamanDashboardDaftarSiswa = () => {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudentList = async () => {
    try {
      const response = await AdminServices.getStudentList();
      if (response.success) {
        setStudentList(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <div className="w-4/5 ml-[20%] px-[5vh] pt-[4vh] flex flex-col gap-12">
      <div className="w-full flex gap-4 items-center rounded-md bg-[#E0E0E0] p-3">
        <MdSearch size={20} color="gray" />
        <input
          type="text"
          placeholder="Cari pengguna berdasarkan nama/email"
          className="font-medium text-sm text-[#8A8A8A] bg-transparent border-none outline-none flex-1"
        />
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center py-[2vh] pl-3 bg-[#EBF6FF80]">
            {headers.map((header) => (
              <div key={header.text} className={`w-${header.width} flex items-center`}>
                <p className="font-bold text-sm text-[#424242]">{header.text}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col">
            {studentList.map((student, index) => (
              <div
                key={index}
                className={`w-full flex items-center py-[2vh] pl-3 ${
                  index % 2 === 1 ? 'bg-[#EBF6FF80]' : ''
                }`}
              >
                <div className="w-[40%] flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-slate-500" />
                  <p className="text-sm font-semibold text-[#424242]">{student.name}</p>
                </div>
                <div className="w-[20%] flex items-center gap-4">
                  <p className="text-sm font-semibold text-[#424242]">{student.class}</p>
                </div>
                <div className="w-[30%] flex items-center gap-4">
                  <p className="text-sm font-semibold text-[#424242]">{student.email}</p>
                </div>
                <div className="w-[10%] flex items-center">
                  <Image
                    src={'/dashboard/trashIcon.svg'}
                    alt="trashicon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HalamanDashboardDaftarSiswa;
