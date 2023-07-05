// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import { courseDetail } from './data';
type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMethodHandler(req, res);
    case 'POST':
      return postMethodHandler(req, res);
    default:
      return res.status(200).json({ name: 'John Doe' });
  }
}

const getMethodHandler = (
  req: NextApiRequest,
  res: NextApiResponse<CourseDetailType>
) => {
  const { id, include } = req.query;

  res.status(200).json(courseDetail);
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
