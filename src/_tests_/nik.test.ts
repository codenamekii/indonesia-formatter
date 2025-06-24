import { NIKFormatter } from '../formatters/nik';

describe('NIKFormatter', () => {
  describe('parse', () => {
    it('should parse male NIK correctly', () => {
      const result = NIKFormatter.parse('3201231507900001');

      expect(result.provinceCode).toBe('32');
      expect(result.cityCode).toBe('01');
      expect(result.districtCode).toBe('23');
      expect(result.gender).toBe('male');
      expect(result.birthDate.getDate()).toBe(15);
      expect(result.birthDate.getMonth()).toBe(6); // July (0-indexed)
      expect(result.birthDate.getFullYear()).toBe(1990);
      expect(result.uniqueCode).toBe('0001');
    });

    it('should parse female NIK correctly', () => {
      const result = NIKFormatter.parse('3201235507900001');

      expect(result.gender).toBe('female');
      expect(result.birthDate.getDate()).toBe(15); // 55 - 40 = 15
    });

    it('should handle year 2000s correctly', () => {
      const result = NIKFormatter.parse('3201231507200001');
      expect(result.birthDate.getFullYear()).toBe(2020);
    });

    it('should throw error for invalid length', () => {
      expect(() => NIKFormatter.parse('123')).toThrow('NIK must be 16 digits');
    });
  });

  describe('format', () => {
    it('should format NIK with spaces', () => {
      expect(NIKFormatter.format('3201231507900001')).toBe('3201 2315 0790 0001');
    });
  });

  describe('validate', () => {
    it('should validate correct NIK', () => {
      expect(NIKFormatter.validate('3201231507900001')).toBe(true);
    });

    it('should reject invalid NIK', () => {
      expect(NIKFormatter.validate('1234567890123456')).toBe(false); // Invalid date
      expect(NIKFormatter.validate('123')).toBe(false); // Wrong length
    });
  });
});