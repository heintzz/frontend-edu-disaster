import { useEffect, useMemo, useState } from 'react';

import { Assistant, Caesar_Dressing } from 'next/font/google';

import Image from 'next/image';
import arrowBack from '../../public/arrowBack.svg';
import arrowNext from '../../public/arrowNext.svg';

import eruptionImage from '../../public/display/erupsi.png';
import dummyQR from '../../public/display/dummyQR.png';
import Link from 'next/link';
import MateriErupsi from './MateriErupsi';
import VideoErupsi from './VideoErupsi';
import enums from '@/enums/enum';

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });
const assistant = Assistant({ subsets: ['latin'], weight: '400' });

export default function EruptionContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const token = '';

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
    // updateProgress();
  };

  const handleBack = () => {
    setActiveIndex((prev) => prev - 1);
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
