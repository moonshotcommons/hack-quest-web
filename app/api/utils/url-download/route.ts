import { NextRequest, NextResponse } from 'next/server';

enum URLDownloadType {
  BLOG = 'blog',
  HACKATHON = 'hackathon',
  GLOSSARY = 'glossary',
  PROJECT = 'project'
}

const dataMap = {
  [URLDownloadType.BLOG]: {
    api: 'blogs',
    route: 'blog'
  },
  [URLDownloadType.HACKATHON]: {
    api: 'hackathons',
    route: 'hackathon'
  },
  [URLDownloadType.GLOSSARY]: {
    api: 'glossaries',
    route: 'glossary'
  },
  [URLDownloadType.PROJECT]: {
    api: 'projects',
    route: 'hackathon/projects'
  }
};

async function getURLData(type: { api: string; route: string }) {
  const response = await fetch('https://api.hackquest.io/v1/' + type.api);
  if (!response.ok) return [];
  const json = await response.json();
  const data = json.data || [];

  return data.map((item: { alias: string }) => {
    const { alias } = item;
    return 'https://www.hackquest.io/' + type.route + '/' + alias;
  });
}

export async function GET(request: NextRequest, context: any) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') as URLDownloadType;

  if (type) {
    const data = await getURLData(dataMap[type]);
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json({ code: 400, msg: 'Type does not exist' });
  }
}
