import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import minMax from "dayjs/plugin/minMax";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

// Duration extention
dayjs._duration = dayjs.duration;
dayjs.duration = function(input, unit) {
  let durationObject = dayjs._duration(input, unit);
  durationObject.__proto__.toString = function() {
    return this.toISOString();
  };
  return durationObject;
};

export default dayjs;
