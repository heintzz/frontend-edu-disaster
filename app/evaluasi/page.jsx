'use client';
import { Caesar_Dressing } from 'next/font/google';
import Image from 'next/image';

import { evaluationAtom } from '@/atoms/user.activity';
import apiV1 from '@/lib/api';
import questions from '@/lib/questions';
import StudentServices from '@/services/student.services';
import { tokenServices } from '@/services/token.services';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import arrowBack from '../../public/arrowBack.svg';
import arrowNext from '../../public/arrowNext.svg';
import HalamanHasil from '@/components/evaluasi/HalamanHasil';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });

const koreksiJawaban = (answers) => {
  const jawaban = process.env.JAWABAN_SOAL;
  const jawabanArray = jawaban.split(',');

  let score = 0;
  answers.forEach((item) => {
    const questionIndex = item.no - 1;
    const userAnswer = item.answer.toUpperCase();
    const correctAnswer = jawabanArray[questionIndex];

    if (userAnswer === correctAnswer) {
      score++;
    }
  });

  return (score / jawabanArray.length) * 100;
};

export default function HalamanEvaluasi() {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalFinishedOpen, setIsModalFinishedOpen] = useState(false);

  const evaluation = useRecoilValue(evaluationAtom);

  const [evaluationCompleted, setEvaluationCompleted] = useState(null);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const activeQuestion = questions[currentIndex];
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const finishEvaluation = async () => {
    if (evaluation) {
      setIsLoadingSubmit(true);
      try {
        const res = await StudentServices.submitAnswers(answeredQuestions);
        if (res.success) {
          localStorage.setItem(
            'edudisaster_eval',
            JSON.stringify({
              answers: answeredQuestions,
              is_completed: true,
              score: res.data.score,
            })
          );
          setIsLoadingSubmit(false);
          setEvaluationCompleted(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoadingSubmit(false);
      }
    } else {
      localStorage.setItem(
        'edudisaster_eval',
        JSON.stringify({
          answers: answeredQuestions,
          is_completed: true,
          score: koreksiJawaban(answeredQuestions),
        })
      );
      setEvaluationCompleted(true);
    }
  };

  useEffect(() => {
    if (evaluation) {
      localStorage.setItem(
        'edudisaster_eval',
        JSON.stringify({
          answers: evaluation.answers.data,
          is_completed: evaluation.is_completed,
          score: evaluation.score,
        })
      );
      setAnsweredQuestions(evaluation.answers.data);
      setEvaluationCompleted(evaluation.is_completed);
    } else {
      const data = localStorage.getItem('edudisaster_eval');
      if (data) {
        const parsedData = JSON.parse(data);
        setAnsweredQuestions(parsedData.answers);
        setEvaluationCompleted(parsedData.is_completed);
      }
    }
  }, [evaluation]);

  useEffect(() => {
    const currentAnswer = answeredQuestions.find((q) => q.no === currentIndex + 1);
    if (currentAnswer === undefined) {
      setCurrentAnswer(null);
    } else {
      setCurrentAnswer(currentAnswer?.answer);
    }

    evaluation && saveAnswer(answeredQuestions);
  }, [currentIndex, answeredQuestions]);

  const saveAnswer = async (newAnswers) => {
    try {
      const res = await apiV1.put(
        '/student/evaluations/answers',
        {
          data: newAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenServices.getAccessToken()}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswerChange = (answer) => {
    const index = answeredQuestions.findIndex((q) => q.no === currentIndex + 1);
    if (index !== -1) {
      const updatedQuestions = answeredQuestions.map((question, i) => {
        if (i === index) {
          return { ...question, answer };
        }
        return question;
      });

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

  if (evaluationCompleted === null)
    return (
      <div className="w-[100dvw] h-[100dvh] py-[3dvh] lg:py-[2dvh] px-[5dvh] bg-[#253333] text-white"></div>
    );
  else if (evaluationCompleted) return <HalamanHasil />;
  else
    return (
      <>
        <div className="w-[100dvw] h-[100dvh] py-[3dvh] lg:py-[2dvh] px-[5dvh] bg-[#253333] text-white">
          <div className="h-full flex flex-col gap-y-4 lg:gap-y-10 justify-between relative">
            <p className={`${caesarDressing.className} lg:text-5xl text-center`}>EVALUASI</p>
            <div className="bg-black rounded-[20px] h-full p-5 lg:p-10 relative">
              <button
                className="absolute right-5 bottom-5 bg-[#EF473E] text-white font-bold p-1 text-sm lg:py-2 lg:px-4 rounded-[10px] lg:text-2xl"
                onClick={() => setIsModalFinishedOpen(true)}
              >
                <span className={caesarDressing.className}>Selesai</span>
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
                          currentAnswer === choice.toLowerCase()
                            ? ' bg-[#29ADB2]'
                            : ' bg-[#EFEFEF]/10'
                        }`}
                        onClick={() => handleAnswerChange(choice.toLowerCase())}
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
                  <button
                    className={`px-3 py-1 rounded-md bg-green-600 flex items-center justify-center ${
                      isLoadingSubmit ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={finishEvaluation}
                    disabled={isLoadingSubmit}
                  >
                    {isLoadingSubmit && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}
