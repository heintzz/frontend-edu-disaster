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
  ERUPTIONMITIGATION: 7,
  EARTHQUAKEMITIGATION: 8,
  TSUNAMIMITIGATION: 9,
  MITIGATIONTYPE: 10,
  MITIGATIONINSTITUTION: 11,
  EVALUATION: 12,
};

const DISASTER_TO_MODULES = {
  eruption: MODULES.ERUPTION,
  earthquake: MODULES.EARTHQUAKE,
  tsunami: MODULES.TSUNAMI,
};

const ROLE = {
  TEACHER: 'teacher',
  STUDENT: 'student',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

const enums = {
  ACTIVITY,
  MODULES,
  ROLE,
  DISASTER_TO_MODULES,
};

export default enums;
