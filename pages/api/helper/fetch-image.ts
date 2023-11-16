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
  console.log(imageUrl);
  // get image

  try {
    const response = await axios.get<ArrayBuffer>(imageUrl, {
      responseType: 'arraybuffer'
    });

    console.log(response.data);
    res.setHeader('Content-Type', 'image/jpeg');
    res.end(response.data);
    // // to base64
    // const imageBase64 = Buffer.from(response.data).toString('base64');
    // console.log(imageBase64);
  } catch (err) {
    console.log(err);
  }

  // res.setHeader('Content-Type', 'application/json');
  // res.status(200).stre;
};
