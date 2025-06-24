import { NPWPFormatter } from '../formatters/npwp';

describe('NPWPFormatter', () => {
  describe('format', () => {
    it('should format NPWP correctly', () => {
      expect(NPWPFormatter.format('123456789012345')).toBe('12.345.678.9-012.345');
    });

    it('should handle NPWP with existing formatting', () => {
      expect(NPWPFormatter.format('12.345.678.9-012.345')).toBe('12.345.678.9-012.345');
    });

    it('should throw error for invalid length', () => {
      expect(() => NPWPFormatter.format('12345')).toThrow('NPWP must be 15 digits');
    });
  });

  describe('validate', () => {
    it('should validate correct NPWP', () => {
      expect(NPWPFormatter.validate('123456789012345')).toBe(true);
      expect(NPWPFormatter.validate('12.345.678.9-012.345')).toBe(true);
    });

    it('should reject invalid NPWP', () => {
      expect(NPWPFormatter.validate('12345')).toBe(false);
      expect(NPWPFormatter.validate('abcdefghijklmno')).toBe(false);
    });
  });
});
