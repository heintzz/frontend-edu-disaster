import apiV1 from '@/lib/api';
import { tokenServices } from './token.services';

const requestChatbot = async (message) => {
  const token = tokenServices.getAccessToken();
  return new Promise((resolve, reject) => {
    apiV1
      .post(
        '/chatbot',
        { message },
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

export const ChatbotServices = {
  requestChatbot,
};
