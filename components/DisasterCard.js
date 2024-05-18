import Image from 'next/image';

export default function DisasterCard({ index, isActive, imageSrc, title, description }) {
  return (
    <div className="relative h-[230px] lg:h-[480px] cursor-pointer">
      <div className="h-full bg-black flex flex-col rounded-3xl relative z-[3]">
        <div className="h-[60%] w-full z-[3] rounded-3xl relative">
          <Image src={imageSrc} className="w-full rounded-3xl" alt={title} />
          <div className="h-4 w-4 lg:h-10 lg:w-10 bg-[#D9D9D9] absolute left-1/2 -translate-x-1/2 grid place-content-center rotate-45 -bottom-1 lg:-bottom-7">
            <span className="-rotate-45 font-otomanopee text-[#A65526] text-xs lg:text-3xl font-semibold">
              {index}
            </span>
          </div>
        </div>
        <div className="h-[40%] w-full flex flex-col gap-y-1 relative z-[2] bg-black text-white rounded-b-3xl text-center lg:items-center lg:justify-center pt-3 px-4 lg:px-6 lg:py-2">
          <p className="font-otomanopee text-xs lg:text-2xl font-semibold">{title}</p>
          <p className="text-[8px] lg:text-base">{description}</p>
        </div>
      </div>
      {isActive && (
        <div className="h-full w-full bg-[#29ADB2] blur-sm lg:blur-md rounded-3xl absolute top-0 z-[2]"></div>
      )}
    </div>
  );
}
