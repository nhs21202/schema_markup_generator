import dayjs, { Dayjs } from "dayjs";

export const formatDateYYYYMMDD = (date: string | undefined | null | Dayjs) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};
