export function changeTimezone(date: Date, timezone: string): Date {
  date = new Date(date);

  const invdate = new Date(date.toLocaleString('en-US', {
    timeZone: timezone
  }));

  const diff = date.getTime() - invdate.getTime();

  return new Date(date.getTime() - diff);
}

