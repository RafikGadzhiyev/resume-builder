import moment from "moment";

export const getCurrentYear = () => new Date().getFullYear();

export const CompareTwoDates = (date1: string, date2: string) => {
  const date1Object = moment(date1);
  const date2Object = moment(date2);

  return date1Object.isBefore(date2Object);
};
