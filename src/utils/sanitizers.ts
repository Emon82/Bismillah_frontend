export const sanitizePhone = (value: string) => {
  if (value.startsWith('0')) {
    return `88${value}`;
  }
  return value;
};
