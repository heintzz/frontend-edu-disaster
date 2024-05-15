const ACTIVITY = {
  INIT: 'init',
  IDLE: 'idle',
  ERUPTION: 'eruption',
  EARTHQUAKE: 'earthquake',
  TSUNAMI: 'tsunami',
  MITIGATION: 'mitigation',
  EVALUATION: 'evaluation',
};

const MODULES = {
  ERUPTION: 1,
  EARTHQUAKE: 2,
  TSUNAMI: 3,
  ERUPTIONMAP: 4,
  EARTHQUAKEMAP: 5,
  TSUNAMIMAP: 6,
  MITIGATION: 7,
  EVALUATION: 8,
};

const enums = {
  ACTIVITY,
  MODULES,
};

export default enums;
