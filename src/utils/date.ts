export function formatDateTimeLocal(date: Date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
}