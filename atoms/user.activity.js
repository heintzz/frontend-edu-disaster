import enums from '@/enums/enum';
import { atom } from 'recoil';

const activityState = atom({
  key: 'activityState',
  default: enums.ACTIVITY.INIT,
});

const evaluationAtom = atom({
  key: 'evaluationAtom',
  default: null,
});

export { activityState, evaluationAtom };
