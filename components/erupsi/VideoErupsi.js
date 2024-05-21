import NextButton from '@/components/button/NextButton';

export default function VideoErupsi({ handleNext }) {
  return (
    <>
      <iframe
        className="w-full h-full rounded-3xl"
        src="https://www.youtube.com/embed/xgSp2FppSyA?si=CJWydfevCNEnbFgK"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <NextButton next={handleNext} />
    </>
  );
}
