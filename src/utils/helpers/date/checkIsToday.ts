import { checkDateIsEqual } from "./index";

export const checkIsToday = (date: Date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};
