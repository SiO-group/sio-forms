export const parseDateValue = (val: unknown): Date | null => {
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? null : val;
  }

  if (typeof val !== 'string') {
    return null;
  }

  if (val.trim() === '') {
    return null;
  }

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  if (timeRegex.test(val)) {
    const [hours, minutes, seconds = 0] = val.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(val)) {
    const date = new Date(val + 'T00:00:00');
    return isNaN(date.getTime()) ? null : date;
  }

  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (dateTimeRegex.test(val)) {
    const date = new Date(val);
    return isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(val);
  return isNaN(date.getTime()) ? null : date;
};