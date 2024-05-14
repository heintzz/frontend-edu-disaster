import { activityState } from '@/atoms/user.activity';
import { useSetRecoilState } from 'recoil';

import enums from '@/enums/enum';
import Image from 'next/image';
import closeBtn from '../public/closeBtn.svg';

export default function Modal({ children }) {
  const setActivity = useSetRecoilState(activityState);

  return (
    <div className="h-full p-5 lg:py-10 lg:px-16">
      <div className="h-full bg-white rounded-3xl relative">
        <Image
          src={closeBtn}
          alt="close button"
          className="absolute w-6 h-6 -right-2 -top-2 lg:w-8 lg:h-8 lg:-right-3 lg:-top-3 z-[1]"
          onClick={() => setActivity(enums.ACTIVITY.IDLE)}
          role="button"
        />
        <div className="absolute w-full h-full z-0">{children}</div>
      </div>
    </div>
  );
}
