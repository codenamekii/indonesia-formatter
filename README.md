# 🇮🇩 indonesia-formatter

**TypeScript/JavaScript library untuk format data khas Indonesia**, seperti:
- Nomor telepon
- NPWP
- NIK
- Tanggal dalam Bahasa Indonesia
- Konversi kalender Jawa dan Hijriah

---

## 👀 Instalasi

```bash
npm install indonesia-formatter
# atau
yarn add indonesia-formatter
# atau
pnpm add indonesia-formatter
```

---

## 🚀 Fitur

- 📱 **Phone Number Formatter** — Format nomor HP Indonesia dalam berbagai gaya
- 💳 **NPWP Formatter** — Format dan validasi NPWP
- 🆔 **NIK Parser** — Parsing NIK dengan ekstraksi info demografi
- 📅 **Date Formatter** — Format tanggal Bahasa Indonesia + relative time
- 🌙 **Calendar Converter** — Konversi ke kalender Jawa dan Hijriah

---

## 🎉 Penggunaan

### 1. 📱 Phone Number

```ts
import { PhoneFormatter } from 'indonesia-formatter';

PhoneFormatter.format('081234567890');
// => "0812-3456-7890"

PhoneFormatter.format('6281234567890', { format: 'spaces' });
// => "+62 812 3456 7890"

PhoneFormatter.format('081234567890', { format: 'dots' });
// => "0812.3456.7890"

PhoneFormatter.validate('081234567890'); // true
PhoneFormatter.validate('1234'); // false
```

---

### 2. 💳 NPWP

```ts
import { NPWPFormatter } from 'indonesia-formatter';

NPWPFormatter.format('123456789012345');
// => "12.345.678.9-012.345"

NPWPFormatter.validate('123456789012345'); // true
NPWPFormatter.validate('12345'); // false
```

---

### 3. 🆔 NIK (KTP)

```ts
import { NIKFormatter } from 'indonesia-formatter';

const nikInfo = NIKFormatter.parse('3201231507900001');
console.log(nikInfo);
// {
//   nik: '3201231507900001',
//   provinceCode: '32',
//   cityCode: '01',
//   districtCode: '23',
//   birthDate: new Date(1990, 6, 15),
//   gender: 'male',
//   uniqueCode: '0001'
// }

NIKFormatter.format('3201231507900001');
// => "3201 2315 0790 0001"

NIKFormatter.validate('3201231507900001'); // true
```

---

### 4. 📅 Tanggal

```ts
import { DateFormatter } from 'indonesia-formatter';

const date = new Date('2024-12-31');

DateFormatter.format(date, 'long');      // "Selasa, 31 Desember 2024"
DateFormatter.format(date, 'medium');    // "31 Desember 2024"
DateFormatter.format(date, 'short');     // "31/12/2024"
DateFormatter.format(date, 'monthYear'); // "Desember 2024"

DateFormatter.relative(new Date('2024-12-30')); // "kemarin"
DateFormatter.relative(new Date('2024-12-25')); // "6 hari yang lalu"
DateFormatter.relative(new Date('2025-01-05')); // "dalam 5 hari"
```

---

### 5. 🌙 Kalender Jawa & Hijriah

```ts
import { CalendarFormatter } from 'indonesia-formatter';

const date = new Date('2024-12-31');

const javanese = CalendarFormatter.toJavanese(date);
console.log(javanese);
// { year: 1957, month: 'Besar', day: 29, pasaran: 'Wage' }

CalendarFormatter.formatJavanese(date);
// => "Wage, 29 Besar 1957 (31 Desember 2024)"

const hijri = CalendarFormatter.toHijri(date);
console.log(hijri);
// { year: 1446, month: 'Jumadil Akhir', monthNumber: 6, day: 29 }

CalendarFormatter.formatHijri(date);
// => "29 Jumadil Akhir 1446 H (31 Desember 2024)"
```

---

## ⚓ API Reference

### 📱 PhoneFormatter

| Method                     | Deskripsi                    | Parameter                                                                 | Return    |
|---------------------------|------------------------------|---------------------------------------------------------------------------|-----------|
| `format(phone, options?)` | Format nomor HP              | `phone: string`, `options?: { format: 'standard' | 'dots' | 'spaces' }` | `string`  |
| `validate(phone)`         | Validasi nomor HP            | `phone: string`                                                           | `boolean` |

### 💳 NPWPFormatter

| Method            | Deskripsi                         | Parameter      | Return    |
|------------------|-----------------------------------|----------------|-----------|
| `format(npwp)`   | Format ke `XX.XXX.XXX.X-XXX.XXX`  | `npwp: string` | `string`  |
| `validate(npwp)` | Validasi panjang dan digit NPWP   | `npwp: string` | `boolean` |

### 🆔 NIKFormatter

| Method          | Deskripsi                         | Parameter     | Return    |
|----------------|-----------------------------------|---------------|-----------|
| `parse(nik)`   | Parsing dan ekstraksi info NIK    | `nik: string` | `object`  |
| `format(nik)`  | Format NIK agar terbaca rapi      | `nik: string` | `string`  |
| `validate(nik)`| Validasi panjang dan tanggal NIK  | `nik: string` | `boolean` |

### 📅 DateFormatter

| Method                    | Deskripsi                           | Parameter                                                         | Return    |
|---------------------------|-------------------------------------|-------------------------------------------------------------------|-----------|
| `format(date, format?)`   | Format tanggal Indonesia            | `date: Date`, `format?: 'long' | 'medium' | 'short' | 'monthYear'` | `string`  |
| `relative(date, base?)`   | Relative time dalam Bahasa Indonesia| `date: Date`, `baseDate?: Date`                                  | `string`  |

### 🌙 CalendarFormatter

| Method                            | Deskripsi                      | Parameter                 | Return        |
|----------------------------------|--------------------------------|---------------------------|----------------|
| `toJavanese(date)`               | Konversi ke kalender Jawa      | `date: Date`              | `JavaneseDate` |
| `formatJavanese(date, withDate)`| Format kalender Jawa           | `date: Date`, `includeGregorian?: boolean` | `string` |
| `toHijri(date)`                  | Konversi ke kalender Hijriah   | `date: Date`              | `HijriDate`    |
| `formatHijri(date, withDate)`   | Format kalender Hijriah        | `date: Date`, `includeGregorian?: boolean` | `string` |

---

## 🧠 Kontribusi

1. Fork repo ini
2. Buat branch fitur baru  
   `git checkout -b feature/nama-fitur`
3. Commit perubahan  
   `git commit -m 'Tambah fitur xyz'`
4. Push ke branch  
   `git push origin feature/nama-fitur`
5. Buka Pull Request ke branch `main`

---

## 🦾 Testing

```bash
npm test
```

---

> Untuk request fitur tambahan, bug report, atau pull request, silakan buka issue.
