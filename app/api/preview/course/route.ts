import webApi from '@/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, context: any) {
  const res = await request.json();
  const { notionPageUrl } = res;
  try {
    const course = await webApi.previewApi.createPreviewCourse(
      notionPageUrl as string
    );
    return NextResponse.json(course, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { msg: error?.msg || error?.err },
      { status: 404 }
    );
  }
}
