import { getDomain } from '@/constants/links';
import webApi from '@/service';
import { ImageResponse } from '@vercel/og';
import dayjs from '@/components/Common/Dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { name: string } }) {
  const { name } = context.params || {};

  const headers: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
  };

  try {
    const splitArr = name.split('-');
    const [id, ext] = splitArr.pop()?.split('.') || [];

    const info = (await webApi.campaignsApi.getCertificateInfoById(id)) || {};
    const { username, certificateId, certificateTime, template } = info;

    if (ext === 'json') {
      const response = NextResponse.json({
        description: `Certified Mantle Learner - ${username}-${certificateId}`,
        symbol: 'HACKQUEST',
        image: `${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${encodeURIComponent(username)}-${certificateId}.png`,
        name: `${username}-${certificateId}`
      });

      Object.keys(headers).forEach((key) => {
        response.headers.append(key, headers[key] as string);
      });
      return response;
    } else {
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
          height: 841,
          headers
        }
      );
    }
  } catch (err: any) {
    const response = NextResponse.json({
      message: err.msg || err.message
    });
    Object.keys(headers).forEach((key) => {
      response.headers.append(key, headers[key] as string);
    });
    return response;
  }
}
