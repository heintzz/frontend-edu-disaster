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

const caesarDressing = Caesar_Dressing({ subsets: ['latin'], weight: '400' });
const assistant = Assistant({ subsets: ['latin'], weight: '400' });

export default function EruptionContent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
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
