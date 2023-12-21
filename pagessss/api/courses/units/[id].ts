// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
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

const getMethodHandler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { id, include } = req.query;

  res.status(200).json({
    id: 'd7dae2c5-99bd-49b5-b395-3833989958b4',
    name: 'Setup',
    description:
      'Learn to define a contract and setup the Solidity version we will be using.',
    state: 0,
    progress: 0,
    pages: [
      {
        id: '44e4c9ac-0e6c-4650-95e9-0ae4f3c5b278',
        name: 'Pragma',
        unitId: 'd7dae2c5-99bd-49b5-b395-3833989958b4',
        state: 0
      },
      {
        id: 'cde65f94-9417-4e2c-b722-e041f078b1c4',
        name: 'Contract',
        unitId: 'd7dae2c5-99bd-49b5-b395-3833989958b4',
        state: 0
      },
      {
        id: 'c6b1ce94-9a7e-4436-8172-eee0754755ac',
        name: 'Variable',
        unitId: 'd7dae2c5-99bd-49b5-b395-3833989958b4',
        state: 0
      }
    ]
  });
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
