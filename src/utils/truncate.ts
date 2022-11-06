export const truncate = (text: string, charLength: number) => {
  if (!text) return '';
  return text.length < charLength
    ? text
    : `${text.slice(0, Math.max(0, charLength))} ...`;
};

export const shouldTruncate = (text: string, charLength: number) => {
  return text?.length >= charLength;
};
