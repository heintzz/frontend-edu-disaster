'use client';

import questions from '@/lib/questions';
import TeacherServices from '@/services/teacher.services';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Benar', 'Salah'],
  datasets: [
    {
      data: [70, 30],
      backgroundColor: ['#00C985', '#EF3C69'],
      borderColor: ['#00C985', '#EF3C69'],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      align: 'start',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
      },
    },
  },
};

const correctAnswers = process.env.JAWABAN_SOAL.split(',');

export default function HalamanHasilEvaluasi({ params }) {
  const { id } = params;
  const router = useRouter();
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const getStudentEvaluations = async () => {
    try {
      const response = await TeacherServices.getStudentEvaluationAnswers(id);
      if (response.success) {
        setAnswers(response.data[0]?.answers?.data);
        setIsCompleted(response.data[0]?.is_completed);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudentEvaluations();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen ml-[20%] px-[5vh] py-[4vh] h-screen flex flex-col gap-y-5 p-5">
        <div className="flex gap-4 items-center cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-40 h-6 rounded bg-gray-300 animate-pulse"></div>
        </div>
        <div className="w-full p-3 flex flex-col gap-y-3 bg-gray-200 rounded-lg animate-pulse">
          <div className="w-full h-6 bg-gray-300 rounded"></div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen ml-[20%] px-[5vh] py-[4vh] min-h-screen flex flex-col gap-y-5 p-5">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={() => router.push('/dashboard/kelas')}
      >
        <IoArrowBackOutline size={24} color="black" />
        <button className="font-semibold text-xl">Hasil Evaluasi</button>
      </div>
      {answers &&
        answers.length > 0 &&
        isCompleted &&
        questions.map((item, index) => {
          const questionNumber = index + 1;
          const question = answers.find((answer) => answer.no === questionNumber);
          const correctAnswer = correctAnswers[index];
          const isCorrect = question.answer === correctAnswer.toLowerCase();
          return (
            <div className="w-full p-3 flex flex-col gap-y-3 bg-gray-200 rounded-lg" key={index}>
              <p>{item.question}</p>
              <div className="flex flex-col gap-y-3">
                {item.answers.map((text, i) => {
                  const splitArr = text.split('. ');
                  const [option, answer] = splitArr;
                  return (
                    <div className="flex items-center gap-x-2" key={i}>
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-sm ${
                          option.toLowerCase() === question.answer
                            ? isCorrect
                              ? 'text-green-500'
                              : 'text-red-500'
                            : option === correctAnswer
                            ? 'text-green-500'
                            : 'text-black'
                        } font-semibold flex items-center justify-center`}
                      >
                        {option}
                      </div>
                      <p>{answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      {!answers ? (
        <p>Belum memulai sesi evaluasi</p>
      ) : (
        !isCompleted && <p>Belum menyelesaikan sesi evaluasi</p>
      )}
    </div>
  );
}

// return (
//   <div className={`w-screen ml-[20%] h-screen flex ${jakartaSans}`}>
//      <div className="w-full px-[5vh] py-[4vh] flex flex-col gap-8">
//       <div
//         className="flex gap-4 items-center cursor-pointer"
//         onClick={() => router.push('/dashboard/kelas')}
//       >
//         <IoArrowBackOutline size={24} color="black" />
//         <button className="font-semibold text-xl">Hasil Evaluasi</button>
//       </div>
//       {/* <div className='flex gap-3 items-center'>
//         <MdInfoOutline size={24} color="black" />
//         <p>Belum memulai sesi evaluasi</p>
//       </div> */}
//       <div className="w-[30%] flex flex-col rounded-[35px] border border-[#ECECEC] drop-shadow-xl bg-white">
//         <div className="flex flex-col my-[2vh] gap-3 px-[2vw] py-[1vh]">
//           {/* <p className="font-semibold text-[#828282]">Evaluasi 1</p> */}
//           <p className="text-sm text-[#4F4F4F]">
//             {benar}/{totalData}
//           </p>
//         </div>
//         <div className="w-full border-2 border-[#ECECEC]" />
//         <div className="w-full px-[2vw] py-[1vh]">
//           <Pie data={data} options={options} />
//         </div>
//       </div>
//       <div className="w-full h-[17vh] border border-[#BBB1B1] rounded-lg px-[1vw] py-[1.5vh] relative">
//         <textarea
//           className="w-[90%] h-[12vh] focus:outline-none resize-none"
//           placeholder="Tambahkan catatan...."
//           rows="4"
//         />
//         <button className="absolute bottom-[1.5vh] right-[1vw] rounded-lg px-[14px] py-[8px] w-fit bg-[#29ADB2]">
//           <p className="font-semibold text-sm text-center text-white">Kirim</p>
//         </button>
//       </div>
//     </div>
//   </div>
// );
