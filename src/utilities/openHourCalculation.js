import dayjs from "@/plugins/moment";

/**
 * Calculer le temps de ouverture
 *
 * @params {string|dayjs} startDate Heure de depart
 * @params {string|dayjs} endDate Heure de fermeture
 *
 * @returns {object} Object avec les durées d'ouverture, de fermeture et totale
 *                ex:
 *                  { open: dayjs.duration, close: dayjs.duration, total: dayjs.duration }
 *
 *
 * openHourCalculation(
 *    '2020-01-03 09:30:00',
 *    '2020-01-07 14:30:00',
 *    window.BusinessHours.business_hours,
 *    window.holidays
 * )
 */
function openHourCalculation(startDate, endDate, BusinessHours, holidays) {
  // The two variables we want to calculate and return
  let result = {
    open: 0,
    close: 0,
    total: 0
  };
  if (!startDate || !endDate) return null;
  if (typeof startDate === "string") {
    startDate = dayjs(startDate);
  }
  if (typeof endDate === "string") {
    endDate = dayjs(endDate);
  }
  if (endDate.isBefore(startDate)) {
    // Validate input
    // dayjs.before ou dayjs.after
    return result;
  }
  let current = startDate;
  // Loop while currentDate is less than end Date
  while (current.isSameOrBefore(endDate)) {
    let currentDayName = current
      .locale("en")
      .format("dddd")
      .toLowerCase(); // monday, friday, sunday
    let workingDay = BusinessHours[currentDayName];

    // if workingDay is a weekend or a holiday?
    if (!workingDay || current.isSame(holidays.date, "date")) {
      workingDay = {
        start_time: "0:00 am",
        end_time: "0:00 am"
      };
    }
    let workingStartAt = dayjs(
      current.format("YYYY-MM-DD ") + workingDay.start_time,
      "YYYY-MM-DD h:mm a"
    ); // string to dayjs
    let workingEndAt = dayjs(
      current.format("YYYY-MM-DD ") + workingDay.end_time,
      "YYYY-MM-DD h:mm a"
    ); // string to dayjs
    let endCurrentDay = current.endOf("day");

    if (current.isAfter(workingStartAt)) {
      result.open += dayjs
        .duration(workingEndAt.diff(current))
        .asMilliseconds();
    }
    if (current.isBefore(workingStartAt)) {
      result.close += dayjs
        .duration(workingStartAt.diff(current))
        .asMilliseconds();
    }
    if (
      workingEndAt.isAfter(workingStartAt) &&
      current.isBefore(workingStartAt) &&
      current.isBefore(workingEndAt) &&
      endDate.isAfter(workingEndAt)
    ) {
      result.open += dayjs
        .duration(workingEndAt.diff(workingStartAt))
        .asMilliseconds();
    }
    if (endDate.isAfter(workingEndAt)) {
      result.close += dayjs
        .duration(endCurrentDay.diff(workingEndAt))
        .asMilliseconds();
    }
    if (endDate.isBefore(workingEndAt)) {
      result.open += dayjs
        .duration(endDate.diff(workingStartAt))
        .asMilliseconds();
    }
    current = current.add(1, "day").startOf("day");
  }

  // Return the number of open and close hours
  result.total = result.open + result.close;
  return {
    open: dayjs.duration(result.open),
    close: dayjs.duration(result.close),
    total: dayjs.duration(result.total)
  };
}

window.BusinessHours = {
  id: 77000001658,
  name: "SNCF",
  description: "Default Business Calendar",
  business_hours: {
    monday: { start_time: "8:00 am", end_time: "6:00 pm" },
    tuesday: { start_time: "8:00 am", end_time: "6:00 pm" },
    wednesday: { start_time: "8:00 am", end_time: "6:00 pm" },
    thursday: { start_time: "8:00 am", end_time: "6:00 pm" },
    friday: { start_time: "8:00 am", end_time: "6:00 pm" }
  },
  time_zone: "Paris",
  created_at: "2020-02-10T08:44:03Z",
  updated_at: "2020-02-10T09:16:59Z"
};
window.holidays = [
  {
    date: "2021-01-01",
    localName: "Jour de l'an",
    name: "New Year's Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: 1967,
    type: "Public"
  },
  {
    date: "2021-04-02",
    localName: "Vendredi saint",
    name: "Good Friday",
    countryCode: "FR",
    fixed: false,
    global: false,
    counties: ["FR-A", "FR-57"],
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-04-05",
    localName: "Lundi de Pâques",
    name: "Easter Monday",
    countryCode: "FR",
    fixed: false,
    global: true,
    counties: null,
    launchYear: 1642,
    type: "Public"
  },
  {
    date: "2021-05-01",
    localName: "Fête du premier mai",
    name: "Labour Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-05-08",
    localName: "Fête de la Victoire",
    name: "Victory in Europe Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-05-13",
    localName: "Jour de l'Ascension",
    name: "Ascension Day",
    countryCode: "FR",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-05-22",
    localName: "Abolition de l'esclavage",
    name: "Abolition of Slavery",
    countryCode: "FR",
    fixed: true,
    global: false,
    counties: ["FR-MQ"],
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-05-24",
    localName: "Lundi de Pentecôte",
    name: "Whit Monday",
    countryCode: "FR",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-05-27",
    localName: "Abolition of Slavery",
    name: "Abolition de l'esclavage",
    countryCode: "FR",
    fixed: true,
    global: false,
    counties: ["FR-GP", "FR-MF", "FR-BL"],
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-07-14",
    localName: "Fête nationale",
    name: "Bastille Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-08-15",
    localName: "L'Assomption de Marie",
    name: "Assumption Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-11-01",
    localName: "La Toussaint",
    name: "All Saints' Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-11-11",
    localName: "Armistice de 1918",
    name: "Armistice Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-12-25",
    localName: "Noël",
    name: "Christmas Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    type: "Public"
  },
  {
    date: "2021-12-26",
    localName: "Saint-Étienne",
    name: "St. Stephen's Day",
    countryCode: "FR",
    fixed: true,
    global: false,
    counties: ["FR-A", "FR-57"],
    launchYear: null,
    type: "Public"
  }
];
window.openHourCalculation = openHourCalculation;

export default openHourCalculation;
