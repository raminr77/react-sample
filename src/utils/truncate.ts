export const truncate = (text: string, charLength: number): string => {
  if (!text) return '';
  return text.length < charLength
    ? text
    : `${text.slice(0, Math.max(0, charLength))} ...`;
};

export const shouldTruncate = (text: string, charLength: number): boolean => {
  return text?.length >= charLength;
};
