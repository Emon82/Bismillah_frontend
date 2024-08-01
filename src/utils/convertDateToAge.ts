const convertBirthDateTAge = (date: string) => {
  if (date) {
    const newDate = new Date(date);
    const diff_ms = Date.now() - newDate.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  return null;
};
export default convertBirthDateTAge;
