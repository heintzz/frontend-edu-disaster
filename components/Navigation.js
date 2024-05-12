import { BsChatRightDots } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';

const Navigation = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-16 items-center z-[1000] flex justify-between px-5"
      style={{
        backgroundImage: 'linear-gradient(to right, #29ADB2, #2C2C2C)',
      }}
    >
      <FaRegCircleUser color="white" size={32} />
      <BsChatRightDots color="white" size={32} />
    </div>
  );
};

export default Navigation;
