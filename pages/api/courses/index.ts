// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CourseResponse } from '@/service/webApi/course/type';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  conceptCourse,
  syntaxCourse,
  guidedProjectCourse,
  teaserCourse
} from './data';
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
  res: NextApiResponse<CourseResponse[]>
) => {
  res
    .status(200)
    .json([
      ...syntaxCourse,
      ...conceptCourse,
      ...guidedProjectCourse,
      ...teaserCourse
    ]);
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
