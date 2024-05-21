'use client';

import { evaluationAtom } from '@/atoms/user.activity';
import apiV1 from '@/lib/api';
import { tokenServices } from '@/services/token.services';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

// answers: {
//   data: Array(2);
// }
// id: 1;
// is_completed: false;
// score: null;

export default function EvaluationLayout({ children }) {
  const setEvaluation = useSetRecoilState(evaluationAtom);

  const fetchUserEvaluations = async () => {
    try {
      const res = await apiV1.get('/student/evaluations', {
        headers: {
          Authorization: `Bearer ${tokenServices.getAccessToken()}`,
        },
      });
      const json = res.data;
      if (json.success) {
        setEvaluation(json.data[0]);
      }
    } catch (error) {
      console.log(error);
      setEvaluation(null);
    }
  };

  useEffect(() => {
    // const lastEvaluation = localStorage.getItem('edudisaster_eval');
    // if (lastEvaluation) {
    //   setEvaluation(JSON.parse(lastEvaluation));
    // }
    fetchUserEvaluations();
  }, []);

  return <div>{children}</div>;
}
