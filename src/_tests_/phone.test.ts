// src/__tests__/phone.test.ts
import { PhoneFormatter } from '../formatters/phone';

describe('PhoneFormatter', () => {
  describe('format', () => {
    it('should format domestic phone number with standard format', () => {
      expect(PhoneFormatter.format('081234567890')).toBe('0812-3456-7890');
    });

    it('should format international phone number with standard format', () => {
      expect(PhoneFormatter.format('6281234567890')).toBe('+62 812-3456-7890');
    });

    it('should format with dots separator', () => {
      expect(PhoneFormatter.format('081234567890', { format: 'dots' })).toBe('0812.3456.7890');
    });

    it('should format with spaces separator', () => {
      expect(PhoneFormatter.format('081234567890', { format: 'spaces' })).toBe('0812 3456 7890');
    });

    it('should handle phone numbers with non-numeric characters', () => {
      expect(PhoneFormatter.format('+62 812-3456-7890')).toBe('+62 812-3456-7890');
    });

    it('should throw error for invalid phone number', () => {
      expect(() => PhoneFormatter.format('1234')).toThrow('Invalid Indonesian phone number');
    });
  });

  describe('validate', () => {
    it('should validate correct domestic phone numbers', () => {
      expect(PhoneFormatter.validate('081234567890')).toBe(true);
      expect(PhoneFormatter.validate('021234567')).toBe(true);
    });

    it('should validate correct international phone numbers', () => {
      expect(PhoneFormatter.validate('6281234567890')).toBe(true);
      expect(PhoneFormatter.validate('+6281234567890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(PhoneFormatter.validate('1234')).toBe(false);
      expect(PhoneFormatter.validate('0012345678')).toBe(false);
    });
  });
});