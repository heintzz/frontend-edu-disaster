import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import MateriErupsi from './MateriErupsi';
import VideoErupsi from './VideoErupsi';

export default function EruptionContent() {
  const searchParams = useSearchParams();

  const token = '';
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const index = urlParams.get('index');
    setActiveIndex(parseInt(index));
  }, []);

  // const updateProgress = async () => {
  //   try {
  //     const res = await fetch(`${process.env.BASE_API_ENDPOINT}/student/progress`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         lessonId: enums.MODULES.ERUPTION,
  //         completionDate: new Date(),
  //       }),
  //     });
  //     if (res.ok) {
  //       alert('success');
  //     }
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //     alert('error: ' + error);
  //   }
  // };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
    const indexSearchParams = new URLSearchParams(searchParams.toString());
    indexSearchParams.set('index', activeIndex + 1);
    window.history.pushState({}, '', `?${indexSearchParams.toString()}`);

    // updateProgress();
  };

  const handleBack = () => {
    setActiveIndex((prev) => prev - 1);
    const indexSearchParams = new URLSearchParams(searchParams.toString());
    indexSearchParams.set('index', activeIndex - 1);
    window.history.pushState({}, '', `?${indexSearchParams.toString()}`);
  };

  const element = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return <VideoErupsi handleNext={handleNext} />;
      case 1:
        return <MateriErupsi handleBack={handleBack} />;
      default:
        return null;
    }
  }, [activeIndex]);

  return element;
}
