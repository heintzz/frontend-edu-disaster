'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { Pie } from 'react-chartjs-2';
import { IoArrowBackOutline } from 'react-icons/io5';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

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

export default function HalamanHasilEvaluasi({ params }) {
  console.log(params);
  const router = useRouter();

  const totalData = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
  const benar = data.datasets[0].data[0];
  // const persentaseBenar = ((benar / totalData) * 100).toFixed(2);

  return (
    <div className={`w-screen ml-[20%] h-screen flex ${jakartaSans}`}>
      <div className="w-full px-[5vh] py-[4vh] flex flex-col gap-8">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => router.push('/dashboard/kelas')}
        >
          <IoArrowBackOutline size={24} color="black" />
          <button className="font-semibold text-xl">Hasil Evaluasi</button>
        </div>
        {/* <div className='flex gap-3 items-center'>
          <MdInfoOutline size={24} color="black" />
          <p>Belum memulai sesi evaluasi</p>
        </div> */}
        <div className="w-[30%] flex flex-col rounded-[35px] border border-[#ECECEC] drop-shadow-xl bg-white">
          <div className="flex flex-col my-[2vh] gap-3 px-[2vw] py-[1vh]">
            {/* <p className="font-semibold text-[#828282]">Evaluasi 1</p> */}
            <p className="text-sm text-[#4F4F4F]">
              {benar}/{totalData}
            </p>
          </div>
          <div className="w-full border-2 border-[#ECECEC]" />
          <div className="w-full px-[2vw] py-[1vh]">
            <Pie data={data} options={options} />
          </div>
        </div>
        <div className="w-full h-[17vh] border border-[#BBB1B1] rounded-lg px-[1vw] py-[1.5vh] relative">
          <textarea
            className="w-[90%] h-[12vh] focus:outline-none resize-none"
            placeholder="Tambahkan catatan...."
            rows="4"
          />
          <button className="absolute bottom-[1.5vh] right-[1vw] rounded-lg px-[14px] py-[8px] w-fit bg-[#29ADB2]">
            <p className="font-semibold text-sm text-center text-white">Kirim</p>
          </button>
        </div>
      </div>
    </div>
  );
}
