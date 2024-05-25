'use client';

import apiV1 from '@/lib/api';
import { tokenServices } from '@/services/token.services';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

const ProgressBar = ({ progressColor, progress, progressText }) => {
  return (
    <div className={`w-full h-full rounded-full overflow-hidden relative`}>
      <div
        className="h-full text-white text-right pr-2 flex items-center justify-end"
        style={{
          width: `${progress}%`,
          background: `${progressColor}`,
        }}
      />
      <p className="text-sm font-semibold absolute top-0 right-5 bottom-0 left-0 flex items-center justify-end">
        {progressText}
      </p>
    </div>
  );
};

const VerticalChart = ({ jawabanSalah, jawabanBenar }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (
      chartContainer &&
      chartContainer.current &&
      jawabanSalah &&
      jawabanSalah.length > 0 &&
      jawabanBenar &&
      jawabanBenar.length > 0
    ) {
      const ctx = chartContainer.current.getContext('2d');
      const maxStudent = 40;

      const labels = jawabanBenar.map((_, index) => index + 1);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Jawaban Benar',
              data: jawabanBenar,
              backgroundColor: '#00C985',
            },
            {
              label: 'Jawaban Salah',
              data: jawabanSalah,
              backgroundColor: '#EF3C69',
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: 'x',
          scales: {
            x: {
              beginAtZero: true,
              stacked: true,
              title: {
                display: true,
                text: 'No Soal',
              },
            },
            y: {
              stacked: true,
              max: maxStudent,
              title: {
                display: true,
                text: 'Jumlah Murid',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          font: {
            family: 'Helvetica',
          },
        },
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartContainer} />;
};

const HalamanStatistikSiswa = () => {
  const router = useRouter();
  const [statistics, setStatistics] = useState(null);
  const [answersDistribution, setAnswersDistribution] = useState(null);
  const [isProgressBarLoading, setIsProgressBarLoading] = useState(true);
  const [isVerticalChartLoading, setIsVerticalChartLoading] = useState(true);

  const handleDashboard = () => {
    router.push('/dashboard/kelas');
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await apiV1.get('/teacher/students/statistics', {
          headers: {
            Authorization: `Bearer ${tokenServices.getAccessToken()}`,
          },
        });
        const json = response.data;
        if (json.success) {
          setStatistics(json.data);
        }
      } catch (error) {
        console.error(error);
      }
      setIsProgressBarLoading(false);
    })();

    (async () => {
      try {
        const response = await apiV1.get('/teacher/students/statistics/answers', {
          headers: {
            Authorization: `Bearer ${tokenServices.getAccessToken()}`,
          },
        });
        const json = response.data;
        if (json.success) {
          setAnswersDistribution(json.data);
        }
      } catch (error) {
        console.error(error);
      }
      setIsVerticalChartLoading(false);
    })();
  }, []);

  const progress = statistics?.lesson_progress || 0;
  const akurasi = statistics?.evaluation_accuracy || 0;
  const jawabanBenar = answersDistribution?.correct_answer || [];
  const jawabanSalah = answersDistribution?.incorrect_answer || [];

  return (
    <div className="w-screen ml-[20%] h-screen flex">
      <div className="w-full px-[5vh] py-[4vh] flex flex-col gap-8">
        <div className="flex gap-4 items-center cursor-pointer" onClick={handleDashboard}>
          <IoArrowBackOutline size={24} color="black" />
          <button className="font-semibold text-xl">Statistik Siswa</button>
        </div>
        <div className="flex gap-5 items-center justify-between">
          {isProgressBarLoading ? (
            <>
              <div className="flex flex-col gap-4 w-1/2 bg-[#253333] rounded-3xl py-[2vh] px-[1.5vw] animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-[4vh] bg-gray-300 rounded"></div>
              </div>
              <div className="flex flex-col gap-4 w-1/2 bg-[#253333] rounded-3xl py-[2vh] px-[1.5vw] animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-[4vh] bg-gray-300 rounded"></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-1/2 bg-[#253333] rounded-3xl py-[2vh] px-[1.5vw]">
                <p className="text-sm text-[#FFFFFF]">Progres Keseluruhan</p>
                <div className="w-full rounded-3xl relative h-[4vh] bg-[#FFFFFF]">
                  <ProgressBar
                    progressColor="linear-gradient(to right, #3A4F9C, #141B36)"
                    progress={progress}
                    progressText={`${progress}%`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/2 bg-[#253333] rounded-3xl py-[2vh] px-[1.5vw]">
                <p className="text-sm text-[#FFFFFF]">Akurasi Evaluasi</p>
                <div className="w-full rounded-3xl relative h-[4vh] bg-[#EF3C69]">
                  <ProgressBar
                    progressColor="#00C985"
                    progress={akurasi}
                    progressText={`${akurasi}%`}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="text-sm">Distribusi Evaluasi</p>
          {isVerticalChartLoading ? (
            <div className="animate-pulse">
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <VerticalChart jawabanSalah={jawabanSalah} jawabanBenar={jawabanBenar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HalamanStatistikSiswa;
