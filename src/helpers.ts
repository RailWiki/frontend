export function truncateString(input: string, maxLength: number) {
  const append = '...';

  if (!input || input.length <= maxLength) {
    return input;
  }

  input = input.slice(0, maxLength);
  return `${input}${append}`;
}
