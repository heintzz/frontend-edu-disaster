'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Chart from 'chart.js/auto';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

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
      <p className="text-sm absolute top-0 right-5 bottom-0 left-0 flex items-center justify-end">{progressText}</p>
    </div>
  );
};

const VerticalChart = ({ progressData }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current && progressData && progressData.length > 0) {
      const ctx = chartContainer.current.getContext('2d');
      const maxProgress = 20;

      const labels = progressData.map((_, index) => index + 1);
      const data = progressData.map(progress => progress * maxProgress);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Progress',
            data: data,
            backgroundColor: 'red',
          }],
        },
        options: {
          responsive: true,
          indexAxis: 'x',
          scales: {
            x: {
              beginAtZero: true,
              max: maxProgress,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [progressData]);

  return <canvas ref={chartContainer} />;
};

const HalamanStatistikSiswa = () => {
  const router = useRouter();

  const handleDashboard = () => {
    router.push('/dashboard/kelas');
  };

  const progress = 35;
  const akurasi = 85;

  const progressData = [0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.8, 0.2];

  return (
    <div className={`w-screen h-screen flex ${jakartaSans}`}>
      <div className="w-full px-[5vh] py-[4vh] flex flex-col gap-8">
        <div className="flex gap-4 items-center cursor-pointer" onClick={handleDashboard}>
          <IoArrowBackOutline size={24} color="black" />
          <button className="font-kumbh font-semibold text-xl">Statistik Siswa</button>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div className="flex flex-col gap-4 w-1/2 bg-[#253333] rounded-3xl py-[2vh] px-[1.5vw]">
            <p className="text-sm text-[#FFFFFF]">Progres Keseluruhan</p>
            <div className="w-full rounded-3xl relative h-[4vh] bg-[#FFFFFF]">
              <ProgressBar progressColor="linear-gradient(to right, #3A4F9C, #141B36)" progress={progress} progressText={`${progress}%`} />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2 bg-[#253333] rounded-3xl py-[2vh] px-[1.5vw]">
            <p className="text-sm text-[#FFFFFF]">Akurasi Evaluasi</p>
            <div className="w-full rounded-3xl relative h-[4vh] bg-[#EF3C69]">
              <ProgressBar progressColor="#00C985" progress={akurasi} progressText={`${akurasi}%`} />
            </div>
          </div>
        </div>
        <div className="w-full h-[55vh] flex flex-col gap-4">
          <p className="text-sm">Distribusi Evaluasi</p>
          <VerticalChart progressData={progressData} />
        </div>
      </div>
    </div>
  );
};

export default HalamanStatistikSiswa;
