import { BsChatRightDots } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';

const Navigation = () => {
  return (
    <div
      className="w-full lg:h-16 flex items-center justify-between px-5 py-2"
      style={{
        backgroundImage: 'linear-gradient(to right, #29ADB2, #2C2C2C)',
      }}
    >
      <FaRegCircleUser color="white" className="w-6 h-6 lg:w-8 lg:h-8" />
      <BsChatRightDots color="white" className="w-6 h-6 lg:w-8 lg:h-8" />
    </div>
  );
};

export default Navigation;
