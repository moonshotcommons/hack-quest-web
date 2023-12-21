// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import webApi from '@/service';
import type { NextApiRequest, NextApiResponse } from 'next';

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

const getMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};

const postMethodHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { notionPageUrl } = req.body;
  try {
    const lesson = await webApi.previewApi.getPreviewLesson(
      notionPageUrl as string
    );
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(404).json({ msg: error?.msg || error?.err });
  }
};
