import { DateFormatter } from "./date";

// Define HijriDate type
type HijriDate = {
  year: number;
  month: string;
  day: number;
  monthNumber: number;
};

// Define JavaneseDate type
type JavaneseDate = {
  year: number;
  month: string;
  day: number;
  pasaran: string;
};

// src/formatters/calendar.ts
export class CalendarFormatter {
  /**
   * Convert Gregorian date to Javanese calendar
   */
  static toJavanese(date: Date): JavaneseDate {
    // Javanese calendar calculation
    const baseDate = new Date(1633, 6, 8); // 8 Juli 1633 (1 Sura 1555)
    const diff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

    // Javanese year length alternates between 354 and 355 days
    let year = 1555;
    let days = diff;

    while (days > 354) {
      const yearLength = (year % 8 === 2 || year % 8 === 5 || year % 8 === 0) ? 355 : 354;
      if (days >= yearLength) {
        days -= yearLength;
        year++;
      } else {
        break;
      }
    }

    // Javanese months
    const months = [
      { name: 'Sura', days: 30 },
      { name: 'Sapar', days: 29 },
      { name: 'Mulud', days: 30 },
      { name: 'Bakda Mulud', days: 29 },
      { name: 'Jumadil Awal', days: 30 },
      { name: 'Jumadil Akhir', days: 29 },
      { name: 'Rejeb', days: 30 },
      { name: 'Ruwah', days: 29 },
      { name: 'Pasa', days: 30 },
      { name: 'Sawal', days: 29 },
      { name: 'Sela', days: 30 },
      { name: 'Besar', days: 29 }
    ];

    let month = 0;
    let dayOfMonth = days;

    for (let i = 0; i < months.length; i++) {
      if (dayOfMonth > months[i].days) {
        dayOfMonth -= months[i].days;
        month++;
      } else {
        break;
      }
    }

    // Pasaran (5-day week)
    const pasaranNames = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const pasaranIndex = diff % 5;

    return {
      year,
      month: months[month].name,
      day: dayOfMonth + 1,
      pasaran: pasaranNames[pasaranIndex]
    };
  }

  /**
   * Convert Gregorian date to Hijri calendar
   */
  static toHijri(date: Date): HijriDate {
    // Simplified Hijri calculation
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1;
    const gregorianDay = date.getDate();

    // Basic conversion (this is simplified, real conversion is more complex)
    let jd = Math.floor((1461 * (gregorianYear + 4800 + Math.floor((gregorianMonth - 14) / 12))) / 4) +
      Math.floor((367 * (gregorianMonth - 2 - 12 * (Math.floor((gregorianMonth - 14) / 12)))) / 12) -
      Math.floor((3 * (Math.floor((gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 100))) / 4) +
      gregorianDay - 32075;

    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) +
      (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
      (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    let month = Math.floor((24 * l) / 709);
    let day = l - Math.floor((709 * month) / 24);
    let year = 30 * n + j - 30;

    const monthNames = [
      'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Syaban',
      'Ramadhan', 'Syawal', 'Dzulqaidah', 'Dzulhijjah'
    ];

    return {
      year,
      month: monthNames[month - 1],
      day,
      monthNumber: month
    };
  }

  /**
   * Format Javanese date to string
   */
  static formatJavanese(date: Date, includeGregorian: boolean = true): string {
    const jav = this.toJavanese(date);
    const formatted = `${jav.pasaran}, ${jav.day} ${jav.month} ${jav.year}`;

    if (includeGregorian) {
      return `${formatted} (${DateFormatter.format(date, 'medium')})`;
    }

    return formatted;
  }

  /**
   * Format Hijri date to string
   */
  static formatHijri(date: Date, includeGregorian: boolean = true): string {
    const hijri = this.toHijri(date);
    const formatted = `${hijri.day} ${hijri.month} ${hijri.year} H`;

    if (includeGregorian) {
      return `${formatted} (${DateFormatter.format(date, 'medium')})`;
    }

    return formatted;
  }
}