import { atom } from 'recoil';

const userProfileAtom = atom({
  key: 'userProfileState',
  default: '',
});

export { userProfileAtom };
