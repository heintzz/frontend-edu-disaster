import apiV1 from '@/lib/api';

const { tokenServices } = require('./token.services');

const getStudentProgress = async (studentId) => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .get(`/teacher/students/${studentId}/progress`, {
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

const TeacherServices = {
  getStudentProgress,
};

export default TeacherServices;
