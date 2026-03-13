export const parseDateValue = (val: unknown): { type: 'date' | 'time' | 'datetime' | 'invalid', value: Date | null} => {
  if (val instanceof Date) {
    return {
      type: hasExplicitTime(val) ? 'datetime' : 'date',
      value: isNaN(val.getTime()) ? null : val
    };
  }

  if (typeof val !== 'string') {
    return { type: 'invalid', value: null };
  }

  const trimmed: string = val.trim();
  if (trimmed === '') {
    return { type: 'invalid', value: null };
  }

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  if (timeRegex.test(trimmed)) {
    const [hours, minutes, seconds = 0] = trimmed.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return { type: 'time', value: date };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(trimmed)) {
    const date = new Date(trimmed + 'T00:00:00.000Z');
    return {
      type: 'date',
      value: isNaN(date.getTime()) ? null : date
    };
  }

  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (dateTimeRegex.test(trimmed)) {
    const date = new Date(trimmed + '.000Z');
    return {
      type: 'datetime',
      value: isNaN(date.getTime()) ? null : date
    };
  }

  return { type: 'invalid', value: null };
};

function hasExplicitTime(date: Date): boolean {
  return date.getUTCHours() !== 0 ||
    date.getUTCMinutes() !== 0 ||
    date.getUTCSeconds() !== 0 ||
    date.getUTCMilliseconds() !== 0;
}