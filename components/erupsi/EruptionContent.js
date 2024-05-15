import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import MateriErupsi from './MateriErupsi';
import VideoErupsi from './VideoErupsi';
import enums from '@/enums/enum';

export default function EruptionContent() {
  const searchParams = useSearchParams();

  // const token = '';

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    if (index) {
      setActiveIndex(parseInt(index));
    } else {
      setActiveIndex(0);
    }
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
  //   }
  // };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.ERUPTION);
    params.set('index', activeIndex + 1);

    window.history.pushState({}, '', `?${params.toString()}`);
    // updateProgress();
  };

  const handleBack = () => {
    setActiveIndex((prev) => prev - 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.ERUPTION);
    params.set('index', activeIndex - 1);

    window.history.pushState({}, '', `?${params.toString()}`);
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
