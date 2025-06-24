import { CalendarFormatter } from '../formatters/calendar';

describe('CalendarFormatter', () => {
  const testDate = new Date('2024-12-31');

  describe('Javanese Calendar', () => {
    it('should convert to Javanese date', () => {
      const result = CalendarFormatter.toJavanese(testDate);

      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('pasaran');
      expect(['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon']).toContain(result.pasaran);
    });

    it('should format Javanese date', () => {
      const formatted = CalendarFormatter.formatJavanese(testDate);
      expect(formatted).toContain('31 Desember 2024');
    });

    it('should format Javanese date without Gregorian', () => {
      const formatted = CalendarFormatter.formatJavanese(testDate, false);
      expect(formatted).not.toContain('Desember 2024');
    });
  });

  describe('Hijri Calendar', () => {
    it('should convert to Hijri date', () => {
      const result = CalendarFormatter.toHijri(testDate);

      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('monthNumber');
      expect(result.monthNumber).toBeGreaterThanOrEqual(1);
      expect(result.monthNumber).toBeLessThanOrEqual(12);
    });

    it('should format Hijri date', () => {
      const formatted = CalendarFormatter.formatHijri(testDate);
      expect(formatted).toContain('H');
      expect(formatted).toContain('31 Desember 2024');
    });

    it('should format Hijri date without Gregorian', () => {
      const formatted = CalendarFormatter.formatHijri(testDate, false);
      expect(formatted).toContain('H');
      expect(formatted).not.toContain('Desember 2024');
    });
  });
});