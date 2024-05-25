'use client';

import AdminServices from '@/services/admin.services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

const ClassDropdown = ({ classes, onAddClass }) => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAddClass = () => {
    if (selectedClass) {
      onAddClass(selectedClass);
    }
  };

  const handleSelectClass = (classOption) => {
    setSelectedClass(classOption);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">Kelas</p>
      <div className="flex gap-2">
        <div className="w-full relative">
          <div
            className="w-full px-[14px] py-[10px] border border-[#BBB1B1] rounded-lg text-[#424242] flex items-center justify-between cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <p>{selectedClass}</p>
            <AiFillCaretDown
              size={20}
              fill="black"
              className={`transform transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
          {dropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-[#BBB1B1] rounded-lg mt-1">
              {classes.map((classOption, index) => (
                <div
                  key={index}
                  className="px-[14px] py-[10px] hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectClass(classOption)}
                >
                  {classOption}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="w-14 border border-[#BBB1B1] rounded-lg flex items-center justify-center"
          onClick={handleAddClass}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

const ClassList = ({ classList, onRemoveClass }) => {
  return (
    <>
      {classList.map((className, index) => (
        <div key={index} className="flex gap-2">
          <div className="w-full px-[14px] py-[10px] border border-[#BBB1B1] rounded-lg">
            <p>{className}</p>
          </div>
          {/* <div className="w-14 flex items-center justify-center">
            <Image
              src={'/dashboard/trashIcon.svg'}
              alt="trash icon"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => onRemoveClass(index)}
            />
          </div> */}
        </div>
      ))}
    </>
  );
};

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
        className="font-medium border border-[#BBB1B1] px-[14px] py-[10px] rounded-xl flex items-center focus:outline-none"
      />
    </div>
  );
};

const HalamanEditGuru = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [inputValue, setInputValue] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
  });

  const [classList, setClassList] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await AdminServices.getUserData(params.id);
      if (response.success) {
        setUserData(response.data);
        setInputValue({
          name: response.data.name,
          email: response.data.email,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const addClass = (newClass) => {
    if (!classList.includes(newClass)) {
      setClassList([...classList, newClass]);
    }
  };

  const removeClass = (index) => {
    const updatedList = [...classList];
    updatedList.splice(index, 1);
    setClassList(updatedList);
  };

  return isLoading ? (
    <div className="flex ml-[20%] justify-center items-center w-4/5 h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div className="w-4/5 ml-[20%]  px-[5vh] py-[4vh] flex flex-col justify-between">
      <div className="w-full flex flex-col gap-12">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => router.push('/admin/guru')}
        >
          <IoArrowBackOutline size={24} color="black" />
          <button className="font-semibold text-xl">Edit Guru</button>
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <InputField
            label="Nama"
            type="text"
            name="nama guru"
            value={inputValue.name}
            handleValueChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
            placeholder="Emilia Rusdiana S.Pd"
          />
          <InputField
            label="Email"
            type="email"
            name="email guru"
            value={inputValue.email}
            handleValueChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
            placeholder="emilia.rusdiana@sch.ac.id"
          />
          <div className="flex flex-col gap-2">
            Daftar Kelas
            {/* <ClassDropdown classes={classes} onAddClass={addClass} /> */}
            <ClassList classList={userData.classes || []} onRemoveClass={removeClass} />
          </div>
        </div>
      </div>
      <button className="w-1/12 rounded px-[8px] py-[10px] bg-[#29ADB2] font-semibold text-sm text-center text-white">
        Simpan
      </button>
    </div>
  );
};

export default HalamanEditGuru;
