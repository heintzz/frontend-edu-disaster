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

const getStudentNotes = async (studentId) => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .get(`/teacher/students/${studentId}/notes`, {
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

const createStudentNote = async (studentId, noteContent) => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .post(
        `/teacher/students/${studentId}/notes`,
        { content: noteContent },
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

const deleteStudentNote = async (studentId, noteId) => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .delete(`/teacher/students/${studentId}/notes/${noteId}`, {
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
  getStudentNotes,
  createStudentNote,
  deleteStudentNote,
};

export default TeacherServices;
