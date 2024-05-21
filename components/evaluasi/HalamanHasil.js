import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function HalamanHasil() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('edudisaster_eval');
    if (data) {
      const parsedData = JSON.parse(data);
      setScore(Math.ceil(parsedData.score));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#253333]">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center text-white">Hasil Kuis</h1>
          <Link
            href="/"
            className="px-2 py-1 bg-white font-bold rounded-lg flex items-center gap-x-1"
          >
            <IoArrowBackOutline />
            Kembali
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-green-500 dark:text-green-400 mb-2">{score}%</div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Selamat! Anda telah menyelesaikan kuis . Terus semangat belajar dan tingkatkan kemampuan
            Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
