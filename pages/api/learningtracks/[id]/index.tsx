// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseType } from '@/service/webApi/course/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import uuid from 'uuid';
import { learningTrackDetail } from './data';
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
  res.status(200).json(learningTrackDetail);
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
