import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import axios from 'axios';

export async function POST(request: NextRequest, context: any) {
  const res = await request.json();
  const headerList = headers();
  const { url } = res;

  try {
    const response = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer'
    });
    return new Response(response.data);
  } catch (error: any) {
    return NextResponse.json({ code: 500, msg: 'Picture request exception!' });
  }
}
