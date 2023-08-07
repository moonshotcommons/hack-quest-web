// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserLevelType } from '@/service/webApi/missionCenter/type';

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
  res: NextApiResponse<UserLevelType>
) => {
  res.status(200).json({
    level: 3,
    expToday: 100,
    expCurrent: 750,
    expNextLevel: 800,
    badges: [
      {
        id: 'uuid',
        name: 'name',
        description: 'description',
        icon: 'https://hackquest-s3-dev.s3.ap-northeast-1.amazonaws.com/users/avatars/avatar-default-04.png?AWSAccessKeyId=ASIAY4TUNLAX4FEWQIND&Expires=1691143957&Signature=m62SD5l8LzuWXhPlm9Q2edekSBs%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEHsaDmFwLW5vcnRoZWFzdC0xIkgwRgIhAJdMHudzc6NeAcQ49ECEcmt87%2FxaOYnwr3nwS3QZt36FAiEA47faqhB45zrUW3qIrxzmVKFjgdu7wM2Mwe%2BEhtUVkaMqjgQIJRAAGgw2MTEyMDMyNDIwMzEiDMaPKSxvMIEiYoVsZyrrA31clfc3c9c3j17pjaUzRz6adITAUrTiQwJetJ490rK%2Flr7ItaY5fFpszOaMX0EhQzv0dNs7nPEv0Zr2era0Uqap2OPbXFV7q2Oii6Wpad02RNM9h8jdVzgFv84QEv419CNg%2Bx%2BtliH6QwQmFxKX2YKpJej8Ko991spTcXmdXAHxO4lhlzr86MvAw0WnZC%2FLLTtf%2Fl%2BYlFX41OcsRrGYIfSTxzz1nEnxLJxLZSKzuYGx6vxM8758KKr4%2FOUXU7Mm4OwGMswZLrjCSn6015ADvroUZJIVcWTFpBoM06PZDWjaQXR6CyoMKHJJtCHsgBK1ConIxXD%2BQXuDMAj9FXQ4xmLiygjRrnLL7vgq3616DR%2FVKnZhqQx4wvtlVTKCILXkRhK7JIqCWuxwJJir0g6NwWeROYDk7ecDISMR2lURdcEqSBduSk6OFGULH%2F1Nundqy7uQyez%2BhrfAgEi%2BharSTfo8mBarkX4o23zpvNo1Kx3H5tGlnE3bLlh337i8zmlrN8Ze8v7enGDk3XrUHk7WecWaSO6RJVs%2FbT07w%2BW2VHJVQidN0ZoAqzhnCC6QmFDZOp%2Bnfj8wVAF6Vt3peD33vIlhXrbY0MsGJxtpD6jGpui8dfxCdZoogzrwR18xYK2q2Tfr0wmRpgvVXOlWMPvfsaYGOqUBInitj8fCKrO8%2FvXrcVMK65daTChW2PoP45jPH8BaOE85Thcsmlt2OByIUB5FkRsZ6nFdaYkLogl24a%2BlNaB8amHqp5uBNThE04U5ZgZAW0uyxmDdATqBS28WPFl0bfuWa8%2BieqpSmTtN5OP9zu%2BMTV5d3bAvncPT4%2F%2BkGxBv6MZ9L3DmY7pxSCzsuYzN8NrZrchSzgLxqoGOKTqS%2F%2BWfvdirO1s5'
      },
      {
        id: 'uuid1',
        name: 'name',
        description: 'description',
        icon: 'https://hackquest-s3-dev.s3.ap-northeast-1.amazonaws.com/users/avatars/avatar-default-04.png?AWSAccessKeyId=ASIAY4TUNLAX4FEWQIND&Expires=1691143957&Signature=m62SD5l8LzuWXhPlm9Q2edekSBs%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEHsaDmFwLW5vcnRoZWFzdC0xIkgwRgIhAJdMHudzc6NeAcQ49ECEcmt87%2FxaOYnwr3nwS3QZt36FAiEA47faqhB45zrUW3qIrxzmVKFjgdu7wM2Mwe%2BEhtUVkaMqjgQIJRAAGgw2MTEyMDMyNDIwMzEiDMaPKSxvMIEiYoVsZyrrA31clfc3c9c3j17pjaUzRz6adITAUrTiQwJetJ490rK%2Flr7ItaY5fFpszOaMX0EhQzv0dNs7nPEv0Zr2era0Uqap2OPbXFV7q2Oii6Wpad02RNM9h8jdVzgFv84QEv419CNg%2Bx%2BtliH6QwQmFxKX2YKpJej8Ko991spTcXmdXAHxO4lhlzr86MvAw0WnZC%2FLLTtf%2Fl%2BYlFX41OcsRrGYIfSTxzz1nEnxLJxLZSKzuYGx6vxM8758KKr4%2FOUXU7Mm4OwGMswZLrjCSn6015ADvroUZJIVcWTFpBoM06PZDWjaQXR6CyoMKHJJtCHsgBK1ConIxXD%2BQXuDMAj9FXQ4xmLiygjRrnLL7vgq3616DR%2FVKnZhqQx4wvtlVTKCILXkRhK7JIqCWuxwJJir0g6NwWeROYDk7ecDISMR2lURdcEqSBduSk6OFGULH%2F1Nundqy7uQyez%2BhrfAgEi%2BharSTfo8mBarkX4o23zpvNo1Kx3H5tGlnE3bLlh337i8zmlrN8Ze8v7enGDk3XrUHk7WecWaSO6RJVs%2FbT07w%2BW2VHJVQidN0ZoAqzhnCC6QmFDZOp%2Bnfj8wVAF6Vt3peD33vIlhXrbY0MsGJxtpD6jGpui8dfxCdZoogzrwR18xYK2q2Tfr0wmRpgvVXOlWMPvfsaYGOqUBInitj8fCKrO8%2FvXrcVMK65daTChW2PoP45jPH8BaOE85Thcsmlt2OByIUB5FkRsZ6nFdaYkLogl24a%2BlNaB8amHqp5uBNThE04U5ZgZAW0uyxmDdATqBS28WPFl0bfuWa8%2BieqpSmTtN5OP9zu%2BMTV5d3bAvncPT4%2F%2BkGxBv6MZ9L3DmY7pxSCzsuYzN8NrZrchSzgLxqoGOKTqS%2F%2BWfvdirO1s5'
      },
      {
        id: 'uuid2',
        name: 'name',
        description: 'description',
        icon: 'https://hackquest-s3-dev.s3.ap-northeast-1.amazonaws.com/users/avatars/avatar-default-04.png?AWSAccessKeyId=ASIAY4TUNLAX4FEWQIND&Expires=1691143957&Signature=m62SD5l8LzuWXhPlm9Q2edekSBs%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEHsaDmFwLW5vcnRoZWFzdC0xIkgwRgIhAJdMHudzc6NeAcQ49ECEcmt87%2FxaOYnwr3nwS3QZt36FAiEA47faqhB45zrUW3qIrxzmVKFjgdu7wM2Mwe%2BEhtUVkaMqjgQIJRAAGgw2MTEyMDMyNDIwMzEiDMaPKSxvMIEiYoVsZyrrA31clfc3c9c3j17pjaUzRz6adITAUrTiQwJetJ490rK%2Flr7ItaY5fFpszOaMX0EhQzv0dNs7nPEv0Zr2era0Uqap2OPbXFV7q2Oii6Wpad02RNM9h8jdVzgFv84QEv419CNg%2Bx%2BtliH6QwQmFxKX2YKpJej8Ko991spTcXmdXAHxO4lhlzr86MvAw0WnZC%2FLLTtf%2Fl%2BYlFX41OcsRrGYIfSTxzz1nEnxLJxLZSKzuYGx6vxM8758KKr4%2FOUXU7Mm4OwGMswZLrjCSn6015ADvroUZJIVcWTFpBoM06PZDWjaQXR6CyoMKHJJtCHsgBK1ConIxXD%2BQXuDMAj9FXQ4xmLiygjRrnLL7vgq3616DR%2FVKnZhqQx4wvtlVTKCILXkRhK7JIqCWuxwJJir0g6NwWeROYDk7ecDISMR2lURdcEqSBduSk6OFGULH%2F1Nundqy7uQyez%2BhrfAgEi%2BharSTfo8mBarkX4o23zpvNo1Kx3H5tGlnE3bLlh337i8zmlrN8Ze8v7enGDk3XrUHk7WecWaSO6RJVs%2FbT07w%2BW2VHJVQidN0ZoAqzhnCC6QmFDZOp%2Bnfj8wVAF6Vt3peD33vIlhXrbY0MsGJxtpD6jGpui8dfxCdZoogzrwR18xYK2q2Tfr0wmRpgvVXOlWMPvfsaYGOqUBInitj8fCKrO8%2FvXrcVMK65daTChW2PoP45jPH8BaOE85Thcsmlt2OByIUB5FkRsZ6nFdaYkLogl24a%2BlNaB8amHqp5uBNThE04U5ZgZAW0uyxmDdATqBS28WPFl0bfuWa8%2BieqpSmTtN5OP9zu%2BMTV5d3bAvncPT4%2F%2BkGxBv6MZ9L3DmY7pxSCzsuYzN8NrZrchSzgLxqoGOKTqS%2F%2BWfvdirO1s5'
      }
    ]
  });
};

const postMethodHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' });
};
