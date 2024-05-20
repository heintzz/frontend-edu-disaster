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

const StudentServices = {
  getStudentClass,
  getStudentProgress,
  updateStudentProgress,
};

export default StudentServices;
