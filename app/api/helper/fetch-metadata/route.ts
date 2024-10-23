import { NextRequest, NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';

export async function GET(request: NextRequest, context: any) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  const options = { url: url || '' };
  const data = await ogs(options);

  const res = {
    url,
    title: '',
    description: '',
    favicon: ''
  };

  if (data.error) return NextResponse.json({ url });

  res.title = data.result.ogTitle || '';
  res.description = data.result.ogDescription || '';
  res.favicon = data.result.favicon || '';
  return NextResponse.json(res);
}
