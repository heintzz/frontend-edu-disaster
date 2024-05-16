import apiV1 from '@/lib/api';
import Cookies from 'js-cookie';
import { BsChatRightDots } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';

const Navigation = () => {
  return (
    <div
      className="w-full flex items-center justify-between px-5 py-2"
      style={{
        backgroundImage: 'linear-gradient(to right, #29ADB2, #2C2C2C)',
      }}
    >
      <FaRegCircleUser
        color="white"
        className="w-6 h-6"
        onClick={async () => {
          try {
            await apiV1('/auth/logout', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
              },
            });
          } catch (error) {}
        }}
      />
      <BsChatRightDots color="white" className="w-6 h-6" />
    </div>
  );
};

export default Navigation;
