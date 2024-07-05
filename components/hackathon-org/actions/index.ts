export async function getTimezones() {
  const response = await fetch('https://worldtimeapi.org/api/timezone');
  if (!response.ok) {
    throw new Error('Failed to fetch timezones');
  }

  const json: string[] = await response.json();
  const data = json || [];
  return data;
}

export async function getTimezone() {
  const response = await fetch('https://worldtimeapi.org/api/ip');
  if (!response.ok) {
    throw new Error('Failed to fetch timezone');
  }

  const json: Record<string, any> = await response.json();
  const data = json || {};
  return data;
}
