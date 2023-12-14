import type { NextApiRequest, NextApiResponse } from 'next';
import { MissionDataType } from '@/service/webApi/missionCenter/type';

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
  res: NextApiResponse<MissionDataType[]>
) => {
  res.status(200).json([]);
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
