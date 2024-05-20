'use client';

import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';

import questions from '@/lib/questions';
import { useEffect, useState } from 'react';
import arrowBack from '../../public/arrowBack.svg';
import arrowNext from '../../public/arrowNext.svg';
import StudentServices from '@/services/student.services';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

export default function EvalPage() {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalFinishedOpen, setIsModalFinishedOpen] = useState(false);

  const activeQuestion = questions[currentIndex];
  const [currentAnswer, setCurrentAnswer] = useState(null);

  // const getStudentEvaluation = async () => {
  //   try {
  //     const res = await StudentServices.getStudentEvaluation();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const data = localStorage.getItem('edudisaster_eval');
    if (data) {
      const parsedData = JSON.parse(data);
      setAnsweredQuestions(parsedData.answers);
    }
  }, []);

  useEffect(() => {
    const currentAnswer = answeredQuestions.find((q) => q.no === currentIndex + 1);
    if (currentAnswer === undefined) {
      setCurrentAnswer(null);
    } else {
      setCurrentAnswer(currentAnswer?.answer);
    }
  }, [currentIndex, answeredQuestions]);

  const handleAnswerChange = (answer) => {
    const index = answeredQuestions.findIndex((q) => q.no === currentIndex + 1);

    if (index !== -1) {
      const updatedQuestions = [...answeredQuestions];
      updatedQuestions[index].answer = answer;
      setAnsweredQuestions(updatedQuestions);

      const dataToStore = {
        is_completed: false,
        answers: updatedQuestions,
      };

      localStorage.setItem('edudisaster_eval', JSON.stringify(dataToStore));
    } else {
      const updatedQuestions = [
        ...answeredQuestions,
        {
          no: currentIndex + 1,
          answer,
        },
      ];

      const dataToStore = {
        is_completed: false,
        answers: updatedQuestions,
      };

      setAnsweredQuestions(updatedQuestions);
      localStorage.setItem('edudisaster_eval', JSON.stringify(dataToStore));
    }

    setCurrentAnswer(answer);
  };

  return (
    <>
      <div className="w-[100dvw] h-[100dvh] py-[3dvh] lg:py-[2dvh] px-[5dvh] bg-[#253333] text-white">
        <div className="h-full flex flex-col gap-y-4 lg:gap-y-10 justify-between relative">
          <p className={`${caesarDressing.className} lg:text-5xl text-center`}>EVALUASI</p>
          <div className="bg-black rounded-[20px] h-full p-5 lg:p-10 relative">
            <button
              className="absolute right-5 bottom-5 bg-[#EF473E] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl"
              onClick={() => {}}
            >
              <span
                className={caesarDressing.className}
                onClick={() => setIsModalFinishedOpen(true)}
              >
                Selesai
              </span>
            </button>
            <p className="text-sm lg:text-xl font-semibold">Soal no. {currentIndex + 1}</p>
            <p className="text-sm my-3 lg:text-base lg:my-10">{activeQuestion.question}</p>
            <div className="flex flex-col text-sm gap-y-4 lg:text-base lg:gap-y-8">
              {activeQuestion.answers.map((answer, index) => {
                const splits = answer.split('. ');
                const [choice, text] = splits;
                return (
                  <div className="flex gap-x-2 lg:gap-x-4 items-center" key={index}>
                    <div
                      role="button"
                      className={`h-6 w-6 lg:h-8 lg:w-8 rounded-full grid border border-[#EFEFEF] place-items-center ${
                        currentAnswer === choice ? ' bg-[#29ADB2]' : ' bg-[#EFEFEF]/10'
                      }`}
                      onClick={() => handleAnswerChange(choice)}
                    >
                      {choice}
                    </div>
                    <p>{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center gap-x-3">
            <button
              className="flex items-center gap-x-2 bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl"
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                } else {
                  window.history.back();
                }
              }}
            >
              <Image src={arrowBack} alt="back icon" className="w-6 h-6" />
              <span className={caesarDressing.className}>Kembali</span>
            </button>
            <button
              className="flex items-center gap-x-2 bg-[#29ADB2] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl"
              onClick={() => {
                if (currentIndex < questions.length - 1 && currentIndex >= 0) {
                  setCurrentIndex((prev) => prev + 1);
                }
              }}
            >
              <span className={caesarDressing.className}>Selanjutnya</span>
              <Image src={arrowNext} alt="back icon" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {isModalFinishedOpen && (
        <div className="absolute w-full h-full top-0 text-white bg-black/50 backdrop-blur-[1px] grid place-items-center">
          <div className="mx-4 w-full max-w-md rounded-lg p-6 shadow-lg bg-gray-900">
            <div className="space-y-8">
              <h2 className="text-lg">Sudah yakin dengan jawabanmu?</h2>
              <div
                className={`flex justify-end items-center gap-2 text-black ${caesarDressing.className}`}
              >
                <button
                  className="px-3 py-1 rounded-md bg-gray-200"
                  onClick={() => setIsModalFinishedOpen(false)}
                >
                  Batal
                </button>
                <button className="px-3 py-1 rounded-md bg-green-600">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
