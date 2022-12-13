import {
  format,
  parseISO,
  differenceInYears,
  getYear,
  intervalToDuration,
  formatDuration,
  daysToWeeks,
  differenceInDays,
} from "date-fns";

export const calculateAge = (birthDate) => {
  if (!birthDate) return;
  return differenceInYears(new Date(), parseISO(birthDate));
};

export const formatDate = (date, dateFormat) => {
  if (!date || !dateFormat) return;

  const validateDate = typeof date === "string" ? parseISO(date) : date;
  return format(validateDate, dateFormat);
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

export const getMeetingPrayers = (members, meeting) => {
  //Find prayers
  const meetingInvocation = meeting.prayers.filter((prayer) => prayer.prayerType === "Invocation");
  const meetingBenediction = meeting.prayers.filter(
    (prayer) => prayer.prayerType === "Benediction"
  );

  let invocation = null;
  let memberInvocationArray = [];
  if (meetingInvocation.length > 0) {
    memberInvocationArray = members.filter((m) => m._id === meetingInvocation[0].member);
    invocation = meetingInvocation[0];
  }

  const memberInvocation = memberInvocationArray[0] ? memberInvocationArray[0] : null;

  let benediction = null;
  let memberBenedictionArray = [];
  if (meetingBenediction.length > 0) {
    memberBenedictionArray = members.filter((m) => m._id === meetingBenediction[0].member);
    benediction = meetingBenediction[0];
  }

  const memberBenediction = memberBenedictionArray[0] ? memberBenedictionArray[0] : null;

  return { invocation, memberInvocation, benediction, memberBenediction };
};

export const isYouth = (birthDate) => {
  const validatedBirthDate = typeof birthDate === "string" ? parseISO(birthDate) : birthDate;
  const age = calculateAge(birthDate);
  const birthYear = getYear(validatedBirthDate);
  const currentYear = getYear(new Date());

  return age < 19 && currentYear - birthYear >= 12;
};

export const calcAndFormatDuration = (date) => {
  const validatedDate = typeof date === "string" ? parseISO(date) : date;
  const diffDays = Math.abs(differenceInDays(validatedDate, new Date()));
  const duration = intervalToDuration({ start: validatedDate, end: new Date() });
  duration.weeks = daysToWeeks(duration.days);

  let durationFormat = [];
  if (diffDays < 7) {
    durationFormat = ["days"];
  } else if (diffDays >= 7 && diffDays <= 30) {
    durationFormat = ["weeks", "days"];
  } else {
    durationFormat = ["years", "months"];
  }

  return formatDuration(duration, {
    format: durationFormat,
    delimiter: ", ",
  });
};

export const formatByIds = (items) => {
  const itemsObject = {};

  items.forEach((item) => {
    itemsObject[item._id] = item;
  });

  return itemsObject;
};
