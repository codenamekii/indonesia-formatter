// src/formatters/date.ts
export class DateFormatter {
  private static readonly months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  private static readonly days = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];

  /**
   * Format date to Indonesian format
   * @param date - Date to format
   * @param format - Format type
   */
  static format(date: Date, format: DateFormatter = 'long'): string {
    const day = date.getDate();
    const month = this.months[date.getMonth()];
    const year = date.getFullYear();
    const dayName = this.days[date.getDay()];

    switch (format) {
      case 'long':
        // Senin, 31 Desember 2024
        return `${dayName}, ${day} ${month} ${year}`;
      case 'medium':
        // 31 Desember 2024
        return `${day} ${month} ${year}`;
      case 'short':
        // 31/12/2024
        return `${day.toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${year}`;
      case 'monthYear':
        // Desember 2024
        return `${month} ${year}`;
      default:
        return `${day} ${month} ${year}`;
    }
  }

  /**
   * Format relative time in Indonesian
   * @param date - Date to compare
   * @param baseDate - Base date (default: now)
   */
  static relative(date: Date, baseDate: Date = new Date()): string {
    const diff = baseDate.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 0) {
      // Future dates
      const future = this.relative(baseDate, date);
      return `dalam ${future}`;
    }

    if (seconds < 60) return 'baru saja';
    if (minutes === 1) return '1 menit yang lalu';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours === 1) return '1 jam yang lalu';
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days === 1) return 'kemarin';
    if (days < 7) return `${days} hari yang lalu`;
    if (days < 14) return '1 minggu yang lalu';
    if (days < 30) return `${Math.floor(days / 7)} minggu yang lalu`;
    if (months === 1) return '1 bulan yang lalu';
    if (months < 12) return `${months} bulan yang lalu`;
    if (years === 1) return '1 tahun yang lalu';
    return `${years} tahun yang lalu`;
  }
}