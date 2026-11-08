// Published India Diwali / Lakshmi Puja dates. Local Panchang observance can vary by region.
export const DIWALI_DATES = [
  { year: 2026, date: "2026-11-08" },
  { year: 2027, date: "2027-10-29" },
  { year: 2028, date: "2028-10-17" },
  { year: 2029, date: "2029-11-05" },
  { year: 2030, date: "2030-10-26" },
  { year: 2031, date: "2031-11-14" },
  { year: 2032, date: "2032-11-02" },
  { year: 2033, date: "2033-10-22" },
  { year: 2034, date: "2034-11-10" },
  { year: 2035, date: "2035-10-30" },
  { year: 2036, date: "2036-10-19" }
];

function getIndiaDateKey(now) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return values.year + "-" + values.month + "-" + values.day;
}

export function getUpcomingDiwali(now = new Date()) {
  const today = getIndiaDateKey(now);
  const upcoming = DIWALI_DATES.find((festival) => festival.date >= today);

  if (!upcoming) {
    const currentYear = Number(today.slice(0, 4));
    return {
      year: currentYear + 1,
      date: null,
      isToday: false,
      datePending: true
    };
  }

  return {
    ...upcoming,
    isToday: upcoming.date === today,
    datePending: false
  };
}

export function formatFestivalDate(date) {
  if (!date) return "Date to be announced";
  return new Date(date + "T12:00:00+05:30").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata"
  });
}

export const festivalDays = [
  {
    number: "01",
    title: "Dhanteras",
    subtitle: "A beginning filled with promise",
    description: "Homes and doorways are prepared for the season. Many families mark the day with prayers for health, wellbeing and prosperity.",
    symbol: "✧"
  },
  {
    number: "02",
    title: "Naraka Chaturdashi",
    subtitle: "The little festival of lights",
    description: "Known in many regions as Chhoti Diwali, this day is associated with cleansing, renewal and the victory of good over evil.",
    symbol: "☼"
  },
  {
    number: "03",
    title: "Diwali · Lakshmi Puja",
    subtitle: "The night that glows",
    description: "Diyas, rangoli, prayers, sweets and time with loved ones bring the central celebration to life.",
    symbol: "🪔"
  },
  {
    number: "04",
    title: "Govardhan Puja",
    subtitle: "Gratitude for the earth",
    description: "Observed in many communities with offerings, shared food and stories of care, shelter and gratitude.",
    symbol: "❋"
  },
  {
    number: "05",
    title: "Bhai Dooj",
    subtitle: "A bond worth celebrating",
    description: "A day for honouring the affection and care shared between siblings and chosen family.",
    symbol: "♡"
  }
];
