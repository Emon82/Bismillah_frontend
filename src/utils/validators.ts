export const isPhone = (value: string) => {
  if (value.includes('+')) {
    return true;
  }
  if (value.startsWith('0')) {
    return true;
  }
  return false;
};
