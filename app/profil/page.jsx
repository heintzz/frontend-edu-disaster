'use client';

import { userProfileAtom } from '@/atoms/user.profile';
import StudentServices from '@/services/student.services';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const ProfilSiswa = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const [profileImage, setProfileImage] = useState('profile.svg');
  const [error, setError] = useState('');

  const [progress, setProgress] = useState([]);
  const completed = progress.length;

  const [classes, setClasses] = useState([]);
  const [classCode, setClassCode] = useState('');
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [refetchToggle, setRefetchToggle] = useState(false);

  const [studentNotes, setStudentNotes] = useState([]);

  const fetchStudentProgress = async () => {
    try {
      const res = await StudentServices.getStudentProgress();
      if (res.success) {
        setProgress(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudentClass = async () => {
    try {
      const res = await StudentServices.getStudentClass();
      if (res.success) {
        setClasses(res.data);
      }
      setIsLoadingClasses(false);
    } catch (error) {
      console.error(error);
      setIsLoadingClasses(false);
    }
  };

  const joinClass = async () => {
    try {
      const res = await StudentServices.joinClass(classCode);
      if (res.success) {
        setRefetchToggle(!refetchToggle);
        setClassCode('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const profile = JSON.parse(Cookies.get('user_profile') || null);
    setUserProfile(profile);
    setIsLoadingProfile(false);
    fetchStudentProgress();
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchStudentClass();
    }
  }, [userProfile, refetchToggle]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should be less than 2MB');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleInputChange = (e) => {
    setClassCode(e.target.value);
  };

  const handleUserLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('user_profile');
    localStorage.removeItem('edudisaster_eval');
    router.push('/');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="w-screen h-screen bg-[#29ADB280] flex justify-center">
      <div className="w-5/6 sm:w-4/5 lg:w-3/5 h-full bg-white flex-col py-[2vh] px-[5vw] sm:px-[3vw] gap-5">
        <div className="flex justify-between items-center my-5">
          {userProfile ? (
            <button
              className="bg-[#208387] rounded-lg p-2 text-white font-semibold"
              onClick={handleUserLogout}
            >
              Logout
            </button>
          ) : (
            <button className="bg-[#208387] rounded-lg p-2 text-white invisible">Logout</button>
          )}
          <img
            src="closeBtn.svg"
            alt="close button"
            onClick={handleBack}
            className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <img
              src={profileImage}
              alt="foto profil diri"
              onClick={handleImageClick}
              className="cursor-pointer rounded-full w-[95px] h-[95px] sm:w-[105px] sm:h-[105px] lg:w-[114px] lg:h-[114px]"
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {isLoadingProfile ? (
            <div className="animate-pulse mt-2 mb-1 flex flex-col items-center">
              <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-32 mb-4"></div>
            </div>
          ) : (
            <>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1.5 mb-1">
                {userProfile?.name}
              </p>
              <p className="text-base sm:text-lg lg:text-xl mb-1">{userProfile?.email}</p>
            </>
          )}
          {isLoadingClasses ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded-lg w-64 mb-4"></div>
            </div>
          ) : classes.length > 0 ? (
            <p className="font-semibold text-base sm:text-lg lg:text-xl">
              {classes[0]?.name} - {classes[0]?.institution}
            </p>
          ) : (
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={classCode}
                onChange={handleInputChange}
                placeholder="Masukkan kode kelas"
                className="border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none"
              />
              <button
                onClick={joinClass}
                className="bg-[#208387] hover:bg-[#185f62] text-white font-bold py-2 px-4 rounded-r-md"
              >
                Bergabung
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-6 sm:gap-10 my-10 justify-center">
          {/* NOTE: dikerjakan kapan-kapan */}
          {/* <div className="relative">
            <img
              src="ellipse.svg"
              alt="diagram nilai"
              className="z-[0] relative w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] lg:w-[86px] lg:h-[86px]"
            />
            <p className="font-semibold text-base sm:text-lg lg:text-xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]">
              0%
            </p>
          </div> */}
          <div className="flex gap-3 items-center">
            <img
              src="check.svg"
              alt="tanda centang"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
            <p className="font-semibold text-base sm:text-lg lg:text-xl">{completed}/12</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {studentNotes.length > 0 ? (
            studentNotes.map((note, index) => (
              <div
                key={index}
                className="w-5/6 sm:w-3/4 lg:w-2/3 rounded-[10px] bg-[#F5F5F5] px-4 py-2"
              >
                <p className="text-[#000000ED] text-sm lg:text-base text-justify">{note}</p>
              </div>
            ))
          ) : (
            <div className="w-5/6 sm:w-3/4 lg:w-2/3 rounded-[10px] px-4 py-2">
              <p className="text-[#000000ED] text-center text-sm lg:text-base">
                Belum ada catatan dari guru 🌼
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilSiswa;
