const viewerLanguage = navigator.language;

export function formatTimezone(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: viewerLanguage === 'pt-BR' ? undefined : 'short'
  }).format(date);
}
