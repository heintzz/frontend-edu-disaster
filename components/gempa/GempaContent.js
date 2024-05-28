import { useEffect, useMemo, useState } from 'react';

import enums from '@/enums/enum';
import StudentServices from '@/services/student.services';
import { usePathname, useSearchParams } from 'next/navigation';
import MateriGempa from './MateriGempa';
import VideoGempa from './VideoGempa';

export default function GempaContent() {
  const searchParams = useSearchParams();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    if (index) {
      setActiveIndex(parseInt(index));
    } else {
      setActiveIndex(0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeIndex === 1) {
      updateProgress();
    }
  }, [activeIndex]);

  const updateProgress = async () => {
    try {
      await StudentServices.updateStudentProgress(enums.MODULES.EARTHQUAKE);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.EARTHQUAKE);
    params.set('index', activeIndex + 1);

    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const handleBack = () => {
    setActiveIndex((prev) => prev - 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('activity', enums.ACTIVITY.EARTHQUAKE);
    params.set('index', activeIndex - 1);

    window.history.pushState({}, '', `?${params.toString()}`);
  };

  const element = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return <VideoGempa handleNext={handleNext} />;
      case 1:
        return <MateriGempa handleBack={handleBack} />;
      default:
        return null;
    }
  }, [activeIndex]);

  return element;
}
