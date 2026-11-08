import { useEffect, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { formatFestivalDate } from "../data/festivalCalendar.js";

function getTimeLeft(date) {
  if (!date) return null;
  const target = new Date(date + "T00:00:00+05:30").getTime();
  const remaining = Math.max(0, target - Date.now());
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
}

export default function Countdown({ festival }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(festival.date));

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(festival.date));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [festival.date]);

  return (
    <section className="countdown-section" id="countdown">
      <div className="countdown-copy">
        <span className="eyebrow eyebrow-light"><CalendarDays size={15} /> MARK THE MOMENT</span>
        <h2>{festival.isToday ? "The day of light is here." : "A little closer to the light."}</h2>
        <p>
          {festival.date
            ? formatFestivalDate(festival.date) + " · India"
            : "The next festival date will be added when the local Panchang is confirmed."}
        </p>
      </div>
      {festival.datePending ? (
        <div className="countdown-pending"><Clock3 size={20} /> Date to be announced</div>
      ) : festival.isToday ? (
        <div className="countdown-today">
          <span className="today-lamp">✦</span>
          <strong>Happy Diwali {festival.year}</strong>
          <span>May your evening be filled with light.</span>
        </div>
      ) : (
        <div className="countdown-clock" aria-label="Countdown to Diwali">
          {[
            ["days", "Days"],
            ["hours", "Hours"],
            ["minutes", "Minutes"],
            ["seconds", "Seconds"]
          ].map(([key, label]) => (
            <div className="countdown-unit" key={key}>
              <strong>{String(timeLeft?.[key] ?? 0).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
      <span className="countdown-note">Dates follow a published India festival calendar; regional observance can differ.</span>
    </section>
  );
}
