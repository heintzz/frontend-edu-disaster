import StudentServices from '@/services/student.services';
import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import OrangEvaluasi from '../../public/menu/orang_evaluasi.png';
import BackButton from '../button/BackButton';

const caesarDressing = Caesar_Dressing({
  subsets: ['latin'],
  weight: '400',
});

export default function EvaluationContent() {
  const router = useRouter();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await StudentServices.getStudentClass();
        if (res.success) {
          setClassroom(res.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const createEvaluation = async () => {
    setIsLoadingCreate(true);
    try {
      const res = await StudentServices.createEvaluation(classroom && classroom.id);
      if (res.success) {
        setIsLoadingCreate(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingCreate(false);
    }
    router.replace('/evaluasi');
    localStorage.setItem(
      'edudisaster_eval',
      JSON.stringify({
        answers: [],
        is_completed: false,
      })
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex flex-col pt-3 lg:pt-10 px-5 md:px-10">
        <p className={`${caesarDressing.className} text-xl sm:text-2xl text-center lg:text-4xl`}>
          EVALUASI
        </p>
        <div className="grid grid-cols-2 h-full pl-4 pr-2 pt-4 lg:px-0 lg:pt-20">
          <Image
            src={OrangEvaluasi}
            alt="logo evaluasi"
            className="translate-x-1/2 lg:translate-x-0 lg:place-self-center "
          />
          <div className="max-h-[43vh] sm:max-h-[50vh] md:max-h-[45vh] overflow-y-auto -ml-5">
            <p>
              Ujilah pemahaman Anda terhadap materi yang telah dipelajari melalui rangkaian soal
              evaluasi ini. Tidak ada batasan waktu dalam pengerjaan, jadi kerjakan dengan tenang
              dan teliti. Ketika Anda merasa sudah siap, klik tombol "Selesai" untuk mengirimkan
              jawaban Anda.
            </p>
            <br />
            <ol className="list-decimal pl-5 flex flex-col gap-y-1">
              <li>Bacalah setiap pertanyaan dengan seksama sebelum menjawab.</li>
              <li>
                Jawablah pertanyaan dengan sebaik mungkin berdasarkan pengetahuan yang Anda miliki.
              </li>
              <li>
                Anda diperkenankan untuk membuka referensi lain yang dapat membantu Anda memahami
                soal dan memastikan jawaban.
              </li>
              <li>
                Jika jawaban Anda kosong saat menekan tombol "Selesai", maka jawaban tersebut akan
                dianggap salah.
              </li>
              <li>
                Setelah selesai mengerjakan, periksa kembali jawaban Anda sebelum mengirimkannya.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <BackButton back={handleBack} />
      <button
        className={`absolute bottom-3 lg:bottom-9 right-4 ${
          caesarDressing.className
        } flex items-center gap-x-2 bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl ${
          isLoadingCreate ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={createEvaluation}
        disabled={isLoadingCreate}
      >
        {isLoadingCreate && (
          <svg
            className="animate-spin -ml-1 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Mulai
      </button>
    </div>
  );
}
