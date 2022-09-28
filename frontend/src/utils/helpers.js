import { format, parseISO, differenceInYears } from "date-fns";

export const calculateAge = (birthDate) => {
  if (!birthDate) return;
  return differenceInYears(new Date(), parseISO(birthDate));
};

export const formatDate = (date, dateFormat) => {
  if (!date || !dateFormat) return;
  return format(parseISO(date), dateFormat);
};

export const formatPhone = (phoneNumber) => {
  if (!phoneNumber) return;

  const numbersOnly = phoneNumber.replace(/\D+/g, "");

  const areaCode = numbersOnly.substring(0, 3);
  const firstThreeNumbers = numbersOnly.substring(3, 6);
  const lastFourNumbers = numbersOnly.substring(6);

  //Strip spaces, periods, parentheses and dashes
  return `(${areaCode}) ${firstThreeNumbers}-${lastFourNumbers}`;
};
