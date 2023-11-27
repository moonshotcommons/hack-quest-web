// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
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

const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};

const postMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const imageUrl = req.body.url;

  // get image
  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', 'image/jpeg');
    res.end(response.data);
  } catch (err) {
    res.end({ code: 500, msg: 'Picture request exception!' });
  }
};
