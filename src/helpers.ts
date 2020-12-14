import moment from 'moment';

export function truncateString(input: string, maxLength: number) {
  const append = '...';

  if (!input || input.length <= maxLength) {
    return input;
  }

  input = input.slice(0, maxLength);
  return `${input}${append}`;
}

export function utcToLocal(input: string) {
  return moment.utc(input).local();
};
