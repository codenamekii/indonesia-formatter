// src/formatters/npwp.ts
export class NPWPFormatter {
  /**
   * Format NPWP (Nomor Pokok Wajib Pajak)
   * @param npwp - NPWP number
   * @returns Formatted NPWP (XX.XXX.XXX.X-XXX.XXX)
   */
  static format(npwp: string): string {
    const cleaned = npwp.replace(/\D/g, '');

    if (cleaned.length !== 15) {
      throw new Error('NPWP must be 15 digits');
    }

    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}.${cleaned.slice(8, 9)}-${cleaned.slice(9, 12)}.${cleaned.slice(12, 15)}`;
  }

  /**
   * Validate NPWP
   */
  static validate(npwp: string): boolean {
    const cleaned = npwp.replace(/\D/g, '');
    return cleaned.length === 15 && /^\d{15}$/.test(cleaned);
  }
}