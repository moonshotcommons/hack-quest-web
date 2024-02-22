import webApi from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, context: any) {
  const res = await request.json();
  const { notionPageUrl } = res;
  try {
    const lesson = await webApi.previewApi.getPreviewLesson(
      notionPageUrl as string
    );
    return NextResponse.json(lesson, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { msg: error?.msg || error?.err },
      { status: 404 }
    );
  }
}
