export const addDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const subDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
};

export const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const clossetMonday = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
};

export const weekDatesFromMonday = (date: Date): Date[] => {
  const week = [];

  // Starting Monday not Sunday
  date.setDate(date.getDate() - date.getDay() + 1);

  for (var i = 0; i < 7; i++) {
    week.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return week;
};

export const formatDate = (date: Date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const shortWeekDays: string[] = [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс",
];

export const months: string[] = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
