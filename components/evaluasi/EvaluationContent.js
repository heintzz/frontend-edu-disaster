import StudentServices from '@/services/student.services';

import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import OrangEvaluasi from '../../public/menu/orang_evaluasi.png';
import BackButton from '../button/BackButton';
import NextButton from '../button/NextButton';

const caesarDressing = Caesar_Dressing({
  subsets: ['latin'],
  weight: '400',
});

export default function EvaluationContent() {
  const router = useRouter();

  const createEvaluation = async () => {
    try {
      const res = await StudentServices.createEvaluation();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    router.replace('/eval');
    localStorage.setItem('is_evaluation_started', true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    createEvaluation();
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
      <NextButton next={handleNext} title="Mulai" />
    </div>
  );
}
