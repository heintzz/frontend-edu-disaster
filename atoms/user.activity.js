import { atom } from "recoil";

const activityState = atom({
  key: 'activityState',
  default: 'init',
});

export { activityState };
