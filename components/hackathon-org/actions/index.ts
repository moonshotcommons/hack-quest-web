import timezones from '../constants/timezones.json';

async function fetcher(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  const response = await fetch(url, {
    signal: controller.signal
  });
  clearTimeout(timer);
  return response;
}

export async function getTimezones() {
  const response = await fetcher('https://worldtimeapi.org/api/timezone');
  if (!response.ok) {
    throw new Error('Failed to fetch timezones');
  }

  const json: string[] = await response.json();
  const data = json || timezones;
  return data;
}

export async function getTimezone() {
  const response = await fetcher('https://worldtimeapi.org/api/ip');
  if (!response.ok) {
    throw new Error('Failed to fetch timezone');
  }

  const json: Record<string, any> = await response.json();
  const data = json || {};
  return data;
}
