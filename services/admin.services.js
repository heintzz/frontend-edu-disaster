import apiV1 from '@/lib/api';
import { tokenServices } from './token.services';

const getTeachersList = async () => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .get('/admin/users?role=teacher', {
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

const getStudentList = async () => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .get('/admin/users?role=student', {
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

const getUserData = async (id) => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .get(`/admin/users/${id}`, {
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

const AdminServices = {
  getStudentList,
  getTeachersList,
  getUserData,
};

export default AdminServices;
