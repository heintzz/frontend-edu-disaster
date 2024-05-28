import apiV1 from '@/lib/api';
import { tokenServices } from './token.services';

const joinClass = async (classCode) => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, reject) => {
    apiV1
      .post(
        `/student/classes/${classCode}/join`,
        {
          classCode,
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

const getStudentNotes = async () => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, reject) => {
    apiV1
      .get('/student/notes', {
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

const createEvaluation = async (id) => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, rejeect) => {
    apiV1
      .post(
        `/student/evaluations?class_id=${id}`,
        {},
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
        rejeect(error);
      });
  });
};

const submitAnswers = async (answers) => {
  const token = tokenServices.getAccessToken();

  return new Promise((resolve, reject) => {
    apiV1
      .post(
        `/student/evaluations/answers/finish`,
        {
          data: answers,
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

const StudentServices = {
  joinClass,
  getStudentClass,
  getStudentProgress,
  getStudentNotes,
  updateStudentProgress,
  createEvaluation,
  submitAnswers,
};

export default StudentServices;
