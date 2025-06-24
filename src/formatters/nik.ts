interface NIKInfo {
  nik: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  birthDate: Date;
  gender: 'male' | 'female';
  uniqueCode: string;
}

export class NIKFormatter {
  /**
   * Format NIK (Nomor Induk Kependudukan)
   * @param nik - NIK number
   * @returns Object with parsed NIK information
   */
  static parse(nik: string): NIKInfo {
    const cleaned = nik.replace(/\D/g, '');

    if (cleaned.length !== 16) {
      throw new Error('NIK must be 16 digits');
    }

    const provinceCode = cleaned.slice(0, 2);
    const cityCode = cleaned.slice(2, 4);
    const districtCode = cleaned.slice(4, 6);
    const birthDate = cleaned.slice(6, 12);
    const uniqueCode = cleaned.slice(12, 16);

    // Parse birth date
    let day = parseInt(birthDate.slice(0, 2));
    const month = parseInt(birthDate.slice(2, 4));
    const year = parseInt(birthDate.slice(4, 6));

    // Female NIK has +40 on day
    const isFemale = day > 40;
    if (isFemale) {
      day -= 40;
    }

    // Determine full year (assuming 1900s for >50, 2000s for <=50)
    const fullYear = year > 50 ? 1900 + year : 2000 + year;

    return {
      nik: cleaned,
      provinceCode,
      cityCode,
      districtCode,
      birthDate: new Date(fullYear, month - 1, day),
      gender: isFemale ? 'female' : 'male',
      uniqueCode
    };
  }

  /**
   * Validate NIK
   */
  static validate(nik: string): boolean {
    const cleaned = nik.replace(/\D/g, '');

    if (cleaned.length !== 16 || !/^\d{16}$/.test(cleaned)) {
      return false;
    }

    try {
      // Extract date components
      const birthDateStr = cleaned.slice(6, 12);
      let day = parseInt(birthDateStr.slice(0, 2));
      const month = parseInt(birthDateStr.slice(2, 4));
      const year = parseInt(birthDateStr.slice(4, 6));

      // Check if female (day > 40)
      if (day > 40) {
        day -= 40;
      }

      // Validate date components
      if (month < 1 || month > 12) {
        return false;
      }

      if (day < 1 || day > 31) {
        return false;
      }

      // More strict date validation
      const fullYear = year > 50 ? 1900 + year : 2000 + year;
      const testDate = new Date(fullYear, month - 1, day);

      // Check if date is valid by comparing components
      if (testDate.getFullYear() !== fullYear ||
        testDate.getMonth() !== month - 1 ||
        testDate.getDate() !== day) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Format NIK with spaces for readability
   */
  static format(nik: string): string {
    const cleaned = nik.replace(/\D/g, '');

    if (cleaned.length !== 16) {
      throw new Error('NIK must be 16 digits');
    }

    // Format: XXXX XXXX XXXX XXXX
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)} ${cleaned.slice(12, 16)}`;
  }
}