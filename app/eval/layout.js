'use client';

import { evaluationAtom } from '@/atoms/user.activity';
import apiV1 from '@/lib/api';
import { tokenServices } from '@/services/token.services';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function EvalLayout({ children }) {
  const [evaluation, setEvaluation] = useRecoilState(evaluationAtom);

  const fetchUserEvaluations = async () => {
    try {
      const res = await apiV1.get('/student/evaluations', {
        headers: {
          Authorization: `Bearer ${tokenServices.getAccessToken()}`,
        },
      });
      const json = res.data;
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const lastEvaluation = localStorage.getItem('edudisaster_eval');
    if (lastEvaluation) {
      setEvaluation(JSON.parse(lastEvaluation));
    }
    fetchUserEvaluations();
  }, []);

  return <div>{children}</div>;
}
