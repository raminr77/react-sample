export const truncate = (text, charLength) => {
  if (!text) return '';
  return text.length < charLength ? text : `${text.substring(0, charLength)} ...`;
};

export const shouldTruncate = (text, charLength) => {
  return text?.length >= charLength;
};
