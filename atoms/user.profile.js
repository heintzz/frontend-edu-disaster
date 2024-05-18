import { atom } from 'recoil';

const userProfileAtom = atom({
  key: 'userProfile',
  default: null,
});

const loadingUserAtom = atom({
  key: 'loadingUser',
  default: false,
});

export { userProfileAtom, loadingUserAtom };
