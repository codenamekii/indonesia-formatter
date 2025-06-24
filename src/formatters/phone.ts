// src/formatters/phone.ts

export interface PhoneFormatOptions {
  format?: 'standard' | 'dots' | 'spaces';
}

export class PhoneFormatter {
  /**
   * Format nomor telepon Indonesia
   * @param phone - Nomor telepon
   * @param options - Opsi formatting
   * @returns Formatted phone number
   */
  static format(phone: string, options?: PhoneFormatOptions): string {
    const cleaned = phone.replace(/\D/g, '');

    // Handle different formats
    if (cleaned.startsWith('62')) {
      return this.formatInternational(cleaned, options);
    } else if (cleaned.startsWith('0')) {
      return this.formatDomestic(cleaned, options);
    }

    throw new Error('Invalid Indonesian phone number');
  }

  private static formatInternational(phone: string, options?: PhoneFormatOptions): string {
    const format = options?.format || 'standard';

    switch (format) {
      case 'standard':
        // +62 812-3456-7890
        return `+${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5, 9)}-${phone.slice(9)}`;
      case 'dots':
        // +62.812.3456.7890
        return `+${phone.slice(0, 2)}.${phone.slice(2, 5)}.${phone.slice(5, 9)}.${phone.slice(9)}`;
      case 'spaces':
        // +62 812 3456 7890
        return `+${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 9)} ${phone.slice(9)}`;
      default:
        return `+${phone}`;
    }
  }

  private static formatDomestic(phone: string, options?: PhoneFormatOptions): string {
    const format = options?.format || 'standard';

    switch (format) {
      case 'standard':
        // 0812-3456-7890
        return `${phone.slice(0, 4)}-${phone.slice(4, 8)}-${phone.slice(8)}`;
      case 'dots':
        // 0812.3456.7890
        return `${phone.slice(0, 4)}.${phone.slice(4, 8)}.${phone.slice(8)}`;
      case 'spaces':
        // 0812 3456 7890
        return `${phone.slice(0, 4)} ${phone.slice(4, 8)} ${phone.slice(8)}`;
      default:
        return phone;
    }
  }

  /**
   * Validate nomor telepon Indonesia
   */
  static validate(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');

    // Check for Indonesian phone patterns
    const patterns = [
      /^62[2-9]\d{7,11}$/,  // International format
      /^0[2-9]\d{7,11}$/,   // Domestic format
    ];

    return patterns.some(pattern => pattern.test(cleaned));
  }
}