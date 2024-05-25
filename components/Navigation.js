import enums from '@/enums/enum';
import Link from 'next/link';
import { BsChatRightDots } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';

const Navigation = ({ existedUser }) => {
  return (
    <div
      className="w-full flex items-center justify-between px-5 py-2"
      style={{
        backgroundImage: 'linear-gradient(to right, #29ADB2, #2C2C2C)',
      }}
    >
      {existedUser ? (
        <Link
          href={
            existedUser.role === enums.ROLE.TEACHER
              ? '/dashboard/kelas'
              : existedUser.role === enums.ROLE.ADMIN
              ? '/admin/guru'
              : '/profil'
          }
        >
          <FaRegCircleUser color="white" className="w-6 h-6" />
        </Link>
      ) : (
        <Link href="/login" className="text-white rounded-lg text-md font-semibold ">
          Login
        </Link>
      )}
      <BsChatRightDots color="white" className="w-6 h-6" />
    </div>
  );
};

export default Navigation;
