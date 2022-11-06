export const truncate = (text, charLength) => {
  if (!text) return '';
  return text.length < charLength
    ? text
    : `${text.slice(0, Math.max(0, charLength))} ...`;
};

export const shouldTruncate = (text, charLength) => {
  return text?.length >= charLength;
};
