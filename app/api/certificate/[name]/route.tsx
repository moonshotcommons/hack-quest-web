import { getDomain } from '@/constants/links';
import webApi from '@/service';
import { ImageResponse } from '@vercel/og';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { name: string } }) {
  const { name } = context.params || {};
  console.log(name);
  const splitArr = name.split('-');
  const [id, ext] = splitArr.pop()?.split('.') || [];

  try {
    const info = (await webApi.campaignsApi.getCertificateInfoById(id)) || {};
    const { username, certificateId, certificateTime, template } = info;
    console.log(info, id);
    if (ext === 'json') {
      return NextResponse.json({
        description: `Certified Mantle Learner - ${username}-${certificateId}`,
        image: `${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${username}-${certificateId}.png`,
        name: `${username}-${certificateId}`
      });
    } else {
      console.log(id, ext, username, certificateId, certificateTime);
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 128,
              background: 'lavender',
              position: 'relative'
            }}
          >
            <img
              src={template}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
            <span
              // className={cn('absolute font-next-book-Thin  italic leading-[120%]', {
              //   'left-[111px] top-[400px] text-[64px]': !isSmall,
              //   'left-[28px] top-[108px] text-[24px]': isSmall
              // })}
              style={{
                position: 'absolute',
                fontStyle: 'italic',
                lineHeight: '120%',
                left: '111px',
                top: '428px',
                fontSize: '72PX'
              }}
            >
              {username}
            </span>
            <span
              // className={cn('absolute ', {
              //   'right-[91px] top-[172px] text-[16px]': !isSmall,
              //   'right-[8px] top-[44px] scale-75 text-[12px]': isSmall
              // })}
              style={{
                position: 'absolute',
                fontStyle: 'italic',
                lineHeight: '120%',
                right: '91px',
                top: '172px',
                fontSize: '16px'
              }}
            >
              No.{certificateId}
            </span>
            <span
              // className={cn('absolute  font-medium italic', {
              //   'bottom-[73px] left-[534px] text-[16px]': !isSmall,
              //   'bottom-[16px] left-[120px] scale-75 text-[12px]': isSmall
              // })}

              style={{
                position: 'absolute',
                fontStyle: 'italic',
                lineHeight: '120%',
                left: '534px',
                bottom: '80px',
                fontSize: '16px'
              }}
            >
              {dayjs(certificateTime || '').format('YYYY-MM-DD')}
            </span>
          </div>
        ),
        {
          width: 1524,
          height: 841
        }
      );
    }
  } catch (err: any) {
    return NextResponse.json({
      message: err.msg || err.message
    });
  }
}
