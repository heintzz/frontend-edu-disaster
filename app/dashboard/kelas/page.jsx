'use client';

import { userProfileAtom } from '@/atoms/user.profile';
import apiV1 from '@/lib/api';
import { tokenServices } from '@/services/token.services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

const HalamanDashboardKelas = () => {
  const router = useRouter();

  const userProfile = useRecoilValue(userProfileAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [students, setStudents] = useState([]);

  const query = useMemo(() => {
    const params = {
      class_id: selectedClass ? selectedClass.id : null,
      search: searchParams,
    };

    if (params.class_id === null) {
      delete params.class_id;
    }

    if (params.search === null || params.search === '') {
      delete params.search;
    }

    return new URLSearchParams(params).toString();
  }, [searchParams, selectedClass]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getClassList = async () => {
    try {
      const res = await apiV1.get('/teacher/classes', {
        headers: {
          Authorization: `Bearer ${tokenServices.getAccessToken()}`,
        },
      });
      const json = res.data;
      if (json.success) {
        setClasses(json.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStudents = async () => {
    try {
      const res = await apiV1.get(`/teacher/students${query ? `?${query}` : ''}`, {
        headers: {
          Authorization: `Bearer ${tokenServices.getAccessToken()}`,
        },
      });
      const json = res.data;
      if (json.success) {
        setStudents(json.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  useEffect(() => {
    getStudents();
  }, [query]);

  const handleBuatKelas = () => {
    router.push('/dashboard/kelas/buat');
  };

  const handleIconClick = (iconType, studentId) => {
    if (iconType === 'progressIcon') {
      router.push(`/dashboard/kelas/progress/${studentId}`);
    } else if (iconType === 'resultIcon') {
      router.push(`/dashboard/kelas/hasil/${studentId}`);
    } else if (iconType === 'trashIcon') {
      // Menghapus users
    }
  };

  const copyKodeKelas = () => {
    const kodeKelas = selectedClass.code;
    navigator.clipboard
      .writeText(kodeKelas)
      .then(() => {
        alert(`Teks disalin ke clipboard: ${kodeKelas}`);
      })
      .catch((error) => {
        console.error('Gagal menyalin teks ke clipboard:', error);
      });
  };

  const headers = [
    { text: 'Name', width: '1/4' },
    { text: 'Email', width: '1/2' },
    { text: 'Aksi', width: '1/4' },
  ];

  if (userProfile) {
    return userProfile?.is_verified ? (
      <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col gap-12">
        <button className="rounded px-[8px] py-[10px] w-fit bg-[#29ADB2]" onClick={handleBuatKelas}>
          <p className="font-semibold text-sm text-center text-white">Buat Kelas</p>
        </button>
        <div className="w-full flex gap-4 items-center rounded-md bg-[#E0E0E0] p-3">
          <MdSearch size={20} color="gray" />
          <input
            type="text"
            placeholder="Cari pengguna berdasarkan nama/email"
            className="font-medium text-sm text-[#8A8A8A] bg-transparent border-none outline-none flex-1"
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-between">
            <div className="relative">
              <button
                className="flex gap-2 items-center bg-[#EBF6FF80] rounded-tl-lg rounded-tr-lg px-3 py-2"
                onClick={toggleDropdown}
              >
                <p className="text-sm font-medium">
                  {selectedClass ? selectedClass.name : 'Semua'}
                </p>
                <AiFillCaretDown
                  size={8}
                  className={`transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="absolute mt-2 text-sm bg-white shadow-lg rounded-lg min-w-[200px]">
                  <ul className="flex flex-col">
                    {selectedClass && (
                      <li
                        className="px-4 py-2 hover:bg-[#EBF6FF] cursor-pointer"
                        onClick={() => {
                          setIsOpen(false);
                          setSelectedClass(null);
                        }}
                      >
                        Semua
                      </li>
                    )}
                    {classes.map((kelas) => (
                      <li
                        key={kelas.id}
                        className="px-4 py-2 hover:bg-[#EBF6FF] cursor-pointer"
                        onClick={() => {
                          setIsOpen(false);
                          setSelectedClass({
                            id: kelas.id,
                            name: kelas.name,
                            code: kelas.class_code,
                          });
                        }}
                      >
                        {kelas.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {selectedClass && (
              <div className="flex gap-2 items-center">
                <p className="text-sm">Kode Kelas: {selectedClass.code}</p>
                <button onClick={copyKodeKelas}>
                  <IoCopyOutline size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="w-full flex items-center py-[2vh] pl-3 bg-[#EBF6FF80]">
            {headers.map((header) => (
              <div key={header.text} className={`w-${header.width} flex items-center`}>
                <p className="font-bold text-sm text-[#424242]">{header.text}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col">
            {students.map((student, index) => (
              <div
                key={index}
                className={`w-full flex items-center py-[2vh] pl-3 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#EBF6FF80]'
                }`}
              >
                <div className="w-1/4 flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-slate-500" />
                  <p className="text-sm font-semibold text-[#424242]">{student.name}</p>
                </div>
                <div className="w-1/2 flex items-center">
                  <p className="text-sm font-semibold text-[#424242]">{student.email}</p>
                </div>
                <div className="w-1/4 flex items-center gap-2">
                  {['progressIcon', 'resultIcon', 'trashIcon'].map((icon, iconIndex) => (
                    <Image
                      key={iconIndex}
                      src={`/dashboard/${icon}.svg`}
                      alt={`${icon} icon`}
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => handleIconClick(icon, student.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="w-4/5 h-full flex items-center justify-center">
        <p className="text-lg text-slate-500">
          Anda belum diverifikasi admin. Silakan hubungi admin terlebih dahulu.
        </p>
      </div>
    );
  }

  return null;
};

export default HalamanDashboardKelas;
