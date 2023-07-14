// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseType } from '@/service/webApi/course/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import uuid from 'uuid';
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getMethodHandler(req, res);
    case 'POST':
      return postMethodHandler(req, res);
    default:
      return res.status(200).json({ name: 'John Doe' });
  }
}

const getMethodHandler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log(req);
  res.status(200).json([
    {
      id: uuid?.v4() || '0',
      type: CourseType.LEARNING_TRACK,
      name: 'Web 3.0 Programming Advanced',
      level: ['Advanced'],
      description:
        'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
      duration: 6700,
      unitCount: 5,
      progress: 0
    },
    {
      id: uuid?.v4() || '0',
      type: CourseType.LEARNING_TRACK,
      name: 'Web 3.0 Programming Advanced',
      level: ['Advanced'],
      description:
        'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
      duration: 600,
      unitCount: 5,
      progress: 0.999
    }
  ]);
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
