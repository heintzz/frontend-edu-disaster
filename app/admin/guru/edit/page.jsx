'use client'

import React, { useState } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { IoArrowBackOutline } from 'react-icons/io5';
import { AiOutlineDown } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import NavbarAdmin from '@/components/NavbarAdmin';
import Image from 'next/image';

  const jakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
  });

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
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>Kelas</p>
        <div className='flex gap-2'>
          <div className='w-[90%] relative'>
            <div
              className='w-full px-[14px] py-[10px] border border-[#BBB1B1] rounded-lg text-[#424242] flex items-center justify-between cursor-pointer'
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p>{selectedClass}</p>
              <AiFillCaretDown
                size={20}
                fill='black'
                className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </div>
            {dropdownOpen && (
              <div className='absolute z-10 w-full bg-white border border-[#BBB1B1] rounded-lg mt-1'>
                {classes.map((classOption, index) => (
                  <div
                    key={index}
                    className='px-[14px] py-[10px] hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleSelectClass(classOption)}
                  >
                    {classOption}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className='w-[10%] border border-[#BBB1B1] rounded-lg flex items-center justify-center'
            onClick={handleAddClass}
          >
            <p className='text-2xl'>+</p>
          </button>
        </div>
      </div>
    );
  };
  
  const ClassList = ({ classList, onRemoveClass }) => {
    return (
      <>
        {classList.map((className, index) => (
          <div key={index} className='flex gap-2'>
            <div className='w-[90%] px-[14px] py-[10px] border border-[#BBB1B1] rounded-lg'>
              <p className='text-[#BBB1B1]'>{className}</p>
            </div>
            <div className='w-[10%] flex items-center justify-center'>
              <Image
                src={"/dashboard/trashIcon.svg"}
                alt='trash icon'
                width={24}
                height={24}
                className='cursor-pointer'
                onClick={() => onRemoveClass(index)}
              />
            </div>
          </div>
        ))}
      </>
    );
  };

  const InputField = ({ label, type, name, placeholder }) => {
    return (
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>{label}</p>
        <input 
          type={type}
          name={name}
          placeholder={placeholder}
          className='text-[#BBB1B1] font-medium border border-[#BBB1B1] px-[14px] py-[10px] rounded-xl flex items-center focus:outline-none'
        />
      </div>
    );
  };

const Page = () => {
    const router = useRouter();

    const classes = ["XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 2"];
    const [classList, setClassList] = useState([]);

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

    return (
        <div className={`w-screen h-screen flex ${jakartaSans}`}>
            <NavbarAdmin />
            <div className="w-4/5 px-[5vh] py-[4vh] flex flex-col justify-between">
                <div className='w-full flex flex-col gap-12'>
                    <div
                        className="flex gap-4 items-center cursor-pointer"
                        onClick={() => router.push('/admin/guru')}
                    >
                        <IoArrowBackOutline size={24} color="black" />
                        <button className="font-semibold text-xl">Edit Guru</button>
                    </div>
                    <div className='w-1/2 flex flex-col gap-6'>
                        <InputField 
                            label="Nama"
                            type="text"
                            name="nama guru"
                            placeholder="Emilia Rusdiana S.Pd"
                        />
                        <InputField 
                            label="Email"
                            type="email"
                            name="email guru"
                            placeholder="emilia.rusdiana@sch.ac.id"
                        />
                        <div className='flex flex-col gap-2'>
                            <ClassDropdown classes={classes} onAddClass={addClass} />
                            <ClassList classList={classList} onRemoveClass={removeClass} />
                        </div>
                    </div>
                </div>
                <button className="w-1/12 rounded px-[8px] py-[10px] bg-[#29ADB2] font-semibold text-sm text-center text-white">
                    Simpan
                </button>
            </div>
        </div>
    );
}

export default Page;
