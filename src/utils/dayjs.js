import dayjs from "dayjs";

export const formatTime = (time, format = "YYYY.MM.DD") => {
  return dayjs(time).format(format);
};
