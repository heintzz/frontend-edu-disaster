'use client';

import TeacherServices from '@/services/teacher.services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiTrash } from 'react-icons/hi2';
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

  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const getStudentProgress = async () => {
    try {
      const res = await TeacherServices.getStudentProgress(id);
      if (res.success) {
        setProgress(res.data);
        getStudentNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentNotes = async () => {
    try {
      const res = await TeacherServices.getStudentNotes(id);
      if (res.success) {
        setNotes(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await TeacherServices.deleteStudentNote(id, noteId);
      if (res.success) {
        getStudentNotes();
        toast.success('Catatan berhasil dihapus');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createStudentNote = async () => {
    const htmlContent = noteContent.replace(/\n/g, '<br>');
    try {
      const res = await TeacherServices.createStudentNote(id, htmlContent);
      if (res.success) {
        getStudentNotes();
        setNoteContent('');
        toast.success('Catatan berhasil ditambahkan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentProgress();
  }, []);

  if (isLoading) {
    return (
      <div className="w-4/5 h-full ml-[20%] px-[5vh] py-[4vh] flex flex-col gap-8">
        <div className="flex gap-4 items-center cursor-pointer">
          <IoArrowBackOutline size={24} color="black" />
          <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32"></div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="h-6 bg-gray-200 rounded-md animate-pulse w-48"></div>
          <div className="w-full flex flex-col gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-[13px] items-center">
                <div className="h-6 w-6 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-[17vh] border border-[#BBB1B1] rounded-lg px-[1vw] py-[1.5vh] relative">
          <div className="w-full h-[12vh] bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32"></div>
          <div className="flex flex-col gap-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-gray-200 p-4 rounded-md flex justify-between items-center animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded-md w-32"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-4/5 h-full ml-[20%] px-[5vh] py-[4vh] flex flex-col gap-8">
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
          {modules.map((module, _) => (
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
          onInput={(e) => {
            setNoteContent(e.target.value);
            console.log(e.target);
            console.log(noteContent.includes('\n'));
          }}
          className="w-full h-[12vh] focus:outline-none resize-none"
          placeholder="Tambahkan catatan...."
          rows="4"
        />

        <button
          onClick={createStudentNote}
          className="absolute bottom-[1.5vh] right-[1vw] rounded-lg px-[14px] py-[8px] w-fit bg-[#29ADB2]"
        >
          <p className="font-semibold text-sm text-center text-white">Kirim</p>
        </button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Riwayat Catatan</h3>
        {notes.length === 0 && <p>Belum ada catatan</p>}
        <div className="flex flex-col gap-2">
          {notes.map((note, _) => (
            <div
              key={note.id}
              className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
            >
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleDeleteNote(note.id)}
              >
                <HiTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuspenseHalamanProgressSiswa;
