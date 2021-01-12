import dayjs from "~/utilities/@/plugins/moment";

function openHourCalculation(startDate, endDate, BusinessHours, holidays) {
  // Validate input
  if (dayjs(endDate) < dayjs(startDate)) { 
    return 0;
  }

  // The two variables we want to calculate and return 
  let openHours = 0;
  let closeHours = 0;

  let current = dayjs(startDate).format('YYYY-MM-DD HH:mm');

  // Loop while currentDate is less than end Date
  while (current <= dayjs(endDate).format('YYYY-MM-DD HH:mm')) { 
    let currentDayName = current.local("dddd"); // monday, friday, sunday
    let workingDay = BusinessHours.business_hours[currentDayName];
    
    // if workingDay is a weekend or a holiday?
    while(workingDay == null && dayjs(current).format('YYYY-MM-DD') == holidays.date){
        closeHours += 24;
        dayjs(current).add(1, 'day');
        dayjs(current).set('hour', 8);
        workingDay = BusinessHours.business_hours[current.local("dddd")];
    }

    let workingStartAt = dayjs(workingDay.start_time); // string to dayjs
    let workingEndAt = dayjs(workingDay.end_time); // string to dayjs

    // Is the current time within a work day
    if (
        current.getHours() >= workingStartAt &&
        current.getHours() < workingEndAt 
    ) {
      //if the current day is the end day itself
      if (dayjs(current).format('YYYY-MM-DD') == dayjs(endDate).format('YYYY-MM-DD')){
        openHours += endDate.getHours() - current.getHours();
      }
      else {
        closeHours += (24 - workingEndAt) + workingStartAt;
        openHours +=  workingEndAt - current.getHours();
      }
    }

    // Increment current time to the next day at StartTime
    dayjs(current).add(1, 'day');
    dayjs(current).set('hour', 8);
  }

  // Return the number of open and close hours
  return {
    closeHours, 
    openHours
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
