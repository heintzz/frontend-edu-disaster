import apiV1 from '@/lib/api';
import { tokenServices } from './token.services';

const updateStudentProgress = async (lessonId) => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, reject) => {
    apiV1
      .post(
        '/student/progress',
        {
          lessonId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getStudentProgress = async () => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, reject) => {
    apiV1
      .get('/student/progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getStudentClass = async () => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, reject) => {
    apiV1
      .get('/student/classes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createEvaluation = async () => {
  const res = await getStudentClass();
  const classroom = res.data[0];

  const token = tokenServices.getAccessToken();

  return new Promise((resolve, rejeect) => {
    apiV1
      .post(`/student/evaluations?class_id${classroom.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        rejeect(error);
      });
  });
};
const StudentServices = {
  getStudentClass,
  getStudentProgress,
  updateStudentProgress,
  createEvaluation,
};

export default StudentServices;
