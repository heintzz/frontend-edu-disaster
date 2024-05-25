'use client';

import SkeletonTable from '@/components/skeleton/SkeletonTable';
import AdminServices from '@/services/admin.services';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';

const headers = [
  { text: 'Name', width: '1/4' },
  { text: 'Class', width: '1/6' },
  { text: 'Email', width: '1/4' },
  { text: 'Status', width: '1/6' },
  { text: 'Aksi', width: '1/6' },
];

const HalamanDashboardDaftarGuru = () => {
  const router = useRouter();
  const [teacherData, setTeacherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeacherData = async () => {
    try {
      const response = await AdminServices.getTeachersList();
      if (response.success) {
        setTeacherData(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const handleTambahGuru = () => {
    router.push('/admin/guru/tambah');
  };

  const handleEditGuru = (teacherId) => {
    router.push(`/admin/guru/edit/${teacherId}`);
  };

  return (
    <div className="w-4/5 ml-[20%]  px-[5vh] py-[4vh] flex flex-col gap-12">
      <button className="rounded px-[12px] py-[10px] w-fit bg-[#29ADB2]" onClick={handleTambahGuru}>
        <p className="font-semibold text-sm text-center text-white">Tambah Guru</p>
      </button>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-4 items-center rounded-md bg-[#E0E0E0] p-3">
          <MdSearch size={20} color="gray" />
          <input
            type="text"
            placeholder="Cari pengguna berdasarkan nama/email"
            className="font-medium text-sm text-[#8A8A8A] bg-transparent border-none outline-none flex-1"
            onChange={(e) => setSearchParams(e.target.value)}
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
              {teacherData.map((teacher, index) => (
                <div
                  key={index}
                  className={`w-full flex items-center py-[2vh] pl-3 ${
                    index % 2 === 1 ? 'bg-[#EBF6FF80]' : ''
                  }`}
                >
                  <div className="w-1/4 flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-500" />
                    <p className="text-sm font-semibold text-[#424242]">{teacher.name}</p>
                  </div>
                  <div className="w-1/6 flex items-center gap-4">
                    <p className="text-sm font-semibold text-[#424242]">
                      {teacher.classes.length > 0 ? teacher.classes.join(', ') : '-'}
                    </p>
                  </div>
                  <div className="w-1/4 flex items-center gap-4">
                    <p className="text-sm font-semibold text-[#424242]">{teacher.email}</p>
                  </div>
                  <div className="w-1/6 flex items-center gap-4">
                    <p className="text-sm font-semibold text-[#424242]">
                      {teacher.is_verified ? 'Terverifikasi' : 'Belum Terverifikasi'}
                    </p>
                  </div>
                  <div className="w-1/6 flex items-center gap-2">
                    <Image
                      src={'/edit.svg'}
                      alt="editicon"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => handleEditGuru(teacher.id)}
                    />
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
    </div>
  );
};

export default HalamanDashboardDaftarGuru;
