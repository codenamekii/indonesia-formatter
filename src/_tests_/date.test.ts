import { DateFormatter } from '../formatters/date';

describe('DateFormatter', () => {
  const testDate = new Date('2024-12-31'); // Tuesday

  describe('format', () => {
    it('should format date in long format', () => {
      expect(DateFormatter.format(testDate, 'long')).toBe('Selasa, 31 Desember 2024');
    });

    it('should format date in medium format', () => {
      expect(DateFormatter.format(testDate, 'medium')).toBe('31 Desember 2024');
    });

    it('should format date in short format', () => {
      expect(DateFormatter.format(testDate, 'short')).toBe('31/12/2024');
    });

    it('should format month and year only', () => {
      expect(DateFormatter.format(testDate, 'monthYear')).toBe('Desember 2024');
    });
  });

  describe('relative', () => {
    it('should return "baru saja" for recent times', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 30000); // 30 seconds ago
      expect(DateFormatter.relative(recent, now)).toBe('baru saja');
    });

    it('should return correct relative time for past dates', () => {
      const base = new Date('2024-12-31');

      expect(DateFormatter.relative(new Date('2024-12-30'), base)).toBe('kemarin');
      expect(DateFormatter.relative(new Date('2024-12-29'), base)).toBe('2 hari yang lalu');
      expect(DateFormatter.relative(new Date('2024-12-24'), base)).toBe('1 minggu yang lalu');
      expect(DateFormatter.relative(new Date('2024-11-30'), base)).toBe('1 bulan yang lalu');
      expect(DateFormatter.relative(new Date('2023-12-31'), base)).toBe('1 tahun yang lalu');
    });

    it('should handle future dates', () => {
      const base = new Date('2024-12-31');
      expect(DateFormatter.relative(new Date('2025-01-01'), base)).toBe('dalam kemarin');
      expect(DateFormatter.relative(new Date('2025-01-07'), base)).toBe('dalam 1 minggu yang lalu');
    });
  });
});