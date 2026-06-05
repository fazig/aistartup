"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Calendar, Cake, Star, Clock, Copy, Check, ArrowLeft } from "lucide-react";

const ZODIAC_SIGNS = [
  { sign: "Capricorn", symbol: "♑", start: [1, 1], end: [1, 19] },
  { sign: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20] },
  { sign: "Aries", symbol: "♈", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22] },
  { sign: "Leo", symbol: "♌", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22] },
  { sign: "Libra", symbol: "♎", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21] },
  { sign: "Capricorn", symbol: "♑", start: [12, 22], end: [12, 31] },
];

function getZodiac(month: number, day: number) {
  for (const z of ZODIAC_SIGNS) {
    const afterStart = month > z.start[0] || (month === z.start[0] && day >= z.start[1]);
    const beforeEnd = month < z.end[0] || (month === z.end[0] && day <= z.end[1]);
    if (afterStart && beforeEnd) return z;
  }
  return ZODIAC_SIGNS[0];
}

function getDayOfWeek(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function calculateAge(birthDate: Date, asOfDate: Date) {
  let years = asOfDate.getFullYear() - birthDate.getFullYear();
  let months = asOfDate.getMonth() - birthDate.getMonth();
  let days = asOfDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function getNextBirthday(birthDate: Date, asOfDate: Date) {
  const thisYear = asOfDate.getFullYear();
  let nextBday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
  if (nextBday <= asOfDate) {
    nextBday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const diffMs = nextBday.getTime() - asOfDate.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function AgeCalculator() {
  const [birthDateStr, setBirthDateStr] = useState("");
  const [asOfDateStr, setAsOfDateStr] = useState("");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    if (!birthDateStr) return null;

    const birthDate = new Date(birthDateStr + "T00:00:00");
    const asOfDate = asOfDateStr ? new Date(asOfDateStr + "T00:00:00") : new Date();

    if (isNaN(birthDate.getTime())) return null;
    if (birthDate > asOfDate) return null;

    const age = calculateAge(birthDate, asOfDate);
    const totalMs = asOfDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = age.years * 12 + age.months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const zodiac = getZodiac(birthDate.getMonth() + 1, birthDate.getDate());
    const dayOfWeek = getDayOfWeek(birthDate);
    const nextBday = getNextBirthday(birthDate, asOfDate);
    const turningAge = age.years + 1;

    return {
      years: age.years,
      months: age.months,
      days: age.days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      zodiac,
      dayOfWeek,
      nextBday,
      turningAge,
    };
  }, [birthDateStr, asOfDateStr]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Age: ${results.years} years, ${results.months} months, ${results.days} days\nTotal Days: ${results.totalDays.toLocaleString()}\nTotal Weeks: ${results.totalWeeks.toLocaleString()}\nTotal Hours: ${results.totalHours.toLocaleString()}\nTotal Minutes: ${results.totalMinutes.toLocaleString()}\nZodiac: ${results.zodiac.symbol} ${results.zodiac.sign}\nBorn on: ${results.dayOfWeek}\nNext Birthday: ${results.nextBday} days away`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statColors = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#eab308"];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <Link
        href="/tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Calendar color="var(--primary)" /> Age Calculator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Find out your exact age in years, months, days, hours, and minutes — plus your zodiac sign, birth day, and next birthday countdown.
        </p>
      </div>

      {/* Inputs */}
      <div className="card" style={{ marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1rem' }}>
          <div>
            <label className="input-label">Your Birthday</label>
            <input
              type="date"
              className="input-field"
              value={birthDateStr}
              onChange={(e) => setBirthDateStr(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="input-label">Calculate Age As Of <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(default: today)</span></label>
            <input
              type="date"
              className="input-field"
              value={asOfDateStr}
              onChange={(e) => setAsOfDateStr(e.target.value)}
              placeholder="Leave blank for today"
            />
          </div>
        </div>
        {results && (
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }} onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Results'}
          </button>
        )}
      </div>

      {results && (
        <>
          {/* Primary Age */}
          <div className="card" style={{ marginBottom: '2rem', textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, #6366f110, #a855f710)' }}>
            <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Your Age</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#6366f1', lineHeight: 1 }}>{results.years}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Years</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#8b5cf6', lineHeight: 1 }}>{results.months}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Months</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#a855f7', lineHeight: 1 }}>{results.days}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Days</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: "Total Months", value: results.totalMonths.toLocaleString(), color: statColors[0] },
              { label: "Total Weeks", value: results.totalWeeks.toLocaleString(), color: statColors[1] },
              { label: "Total Days", value: results.totalDays.toLocaleString(), color: statColors[2] },
              { label: "Total Hours", value: results.totalHours.toLocaleString(), color: statColors[3] },
              { label: "Total Minutes", value: results.totalMinutes.toLocaleString(), color: statColors[4] },
            ].map((stat) => (
              <div key={stat.label} className="card" style={{ textAlign: 'center', padding: '1.25rem 1rem', borderTop: `3px solid ${stat.color}` }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="grid-3" style={{ gap: '1rem', marginBottom: '3rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '3px solid #ec4899' }}>
              <Cake size={28} color="#ec4899" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ec4899' }}>{results.nextBday} days</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Until you turn {results.turningAge}</div>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '3px solid #f97316' }}>
              <Clock size={28} color="#f97316" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f97316' }}>{results.dayOfWeek}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Day you were born</div>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '3px solid #8b5cf6' }}>
              <Star size={28} color="#8b5cf6" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{results.zodiac.symbol}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#8b5cf6' }}>{results.zodiac.sign}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Zodiac Sign</div>
            </div>
          </div>
        </>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>How does this age calculator work?</h2>
        <p>Most people think calculating age is just subtracting birth years — and sure, that gives you a rough number, but it's not the full picture. Our calculator does the actual calendar math properly. It accounts for varying month lengths, leap years, and gives you your precise age down to the exact day. So if you were born on March 15, 1995 and today is June 4, 2026, you won't just see "31" — you'll see exactly 31 years, 2 months, and 20 days.</p>
        <p>The tool also lets you calculate your age as of any specific date. This is surprisingly useful. Applying for something that has an age requirement as of a certain cutoff date? Going to a doctor who asks how old you were when something happened? Just punch in both dates and get your answer instantly.</p>

        <h2>What's the deal with the total days and hours?</h2>
        <p>Okay, this part is just fun. Knowing you've been alive for roughly 11,000 days hits differently than saying "I'm 30." The total hours and minutes numbers are absolutely wild too — seeing that you've lived over 270,000 hours puts things in perspective. Some people use these numbers for milestone celebrations ("I just turned 10,000 days old!"), and honestly, that's a way cooler birthday party theme than just another year.</p>

        <h2>Is the zodiac sign accurate?</h2>
        <p>Yep, it uses the standard Western zodiac date ranges. If you're on the cusp (born right at the transition between two signs), we go with the traditional cutoff dates. If you're super into astrology, you probably already know your sign — but it's still a nice touch to see it displayed alongside all your other stats. Plus, seeing the day of the week you were born on is a fun conversation starter. Turns out "Wednesday's child is full of woe" is an actual old nursery rhyme, in case you were curious.</p>

        <h2>Is my birthday data stored anywhere?</h2>
        <p>Nope. This runs completely in your browser. The date you enter stays on your device and disappears the moment you close the tab. No cookies, no analytics, no tracking. I built it this way because your birthday is literally one of the most common security questions, and I don't want that data going anywhere it shouldn't.</p>
      </div>
    </div>
  );
}
