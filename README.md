✨indonesia-formatter 🇮🇩
A comprehensive TypeScript/JavaScript library for formatting Indonesian-specific data including phone numbers, NPWP, NIK, dates, and calendar conversions (Javanese & Hijri).

👀 Installation
npm install indonesia-formatter
# or
yarn add indonesia-formatter
# or
pnpm add indonesia-formatter

🚀 Features
📱 Phone Number Formatter - Format Indonesian phone numbers with various styles
💳 NPWP Formatter - Format and validate tax identification numbers
🆔 NIK Parser - Parse and validate Indonesian ID numbers with demographic info extraction
📅 Date Formatter - Format dates in Indonesian with relative time support
🌙 Calendar Converter - Convert dates to Javanese (with Pasaran) and Hijri calendars


🎉 Usage
1. Phone Number Formatting
import { PhoneFormatter } from 'indonesia-formatter';

// Format phone numbers
PhoneFormatter.format('081234567890');  
// Output: "0812-3456-7890"

PhoneFormatter.format('6281234567890', { format: 'spaces' });  
// Output: "+62 812 3456 7890"

PhoneFormatter.format('081234567890', { format: 'dots' });  
// Output: "0812.3456.7890"

// Validate phone numbers
PhoneFormatter.validate('081234567890');  // true
PhoneFormatter.validate('1234');           // false

2. NPWP Formatting
import { NPWPFormatter } from 'indonesia-formatter';

// Format NPWP
NPWPFormatter.format('123456789012345');  
// Output: "12.345.678.9-012.345"

// Validate NPWP
NPWPFormatter.validate('123456789012345');  // true
NPWPFormatter.validate('12345');            // false

3. NIK (KTP) Parsing
import { NIKFormatter } from 'indonesia-formatter';

// Parse NIK to extract information
const nikInfo = NIKFormatter.parse('3201231507900001');
console.log(nikInfo);
// Output: {
//   nik: '3201231507900001',
//   provinceCode: '32',
//   cityCode: '01',
//   districtCode: '23',
//   birthDate: Date(1990-07-15),
//   gender: 'male',
//   uniqueCode: '0001'
// }

// Format NIK for display
NIKFormatter.format('3201231507900001');  
// Output: "3201 2315 0790 0001"

// Validate NIK
NIKFormatter.validate('3201231507900001');  // true

4. Date Formatting
import { DateFormatter } from 'indonesia-formatter';

const date = new Date('2024-12-31');

// Various date formats
DateFormatter.format(date, 'long');     
// Output: "Selasa, 31 Desember 2024"

DateFormatter.format(date, 'medium');   
// Output: "31 Desember 2024"

DateFormatter.format(date, 'short');    
// Output: "31/12/2024"

DateFormatter.format(date, 'monthYear'); 
// Output: "Desember 2024"

// Relative time
DateFormatter.relative(new Date('2024-12-30'));  
// Output: "kemarin"

DateFormatter.relative(new Date('2024-12-25'));  
// Output: "6 hari yang lalu"

DateFormatter.relative(new Date('2025-01-05'));  
// Output: "dalam 5 hari"

5. Calendar Conversion
import { CalendarFormatter } from 'indonesia-formatter';

const date = new Date('2024-12-31');

// Convert to Javanese calendar
const javanese = CalendarFormatter.toJavanese(date);
console.log(javanese);
// Output: {
//   year: 1957,
//   month: 'Besar',
//   day: 29,
//   pasaran: 'Wage'
// }

// Format Javanese date
CalendarFormatter.formatJavanese(date);
// Output: "Wage, 29 Besar 1957 (31 Desember 2024)"

// Convert to Hijri calendar
const hijri = CalendarFormatter.toHijri(date);
console.log(hijri);
// Output: {
//   year: 1446,
//   month: 'Jumadil Akhir',
//   monthNumber: 6,
//   day: 29
// }

// Format Hijri date
CalendarFormatter.formatHijri(date);
// Output: "29 Jumadil Akhir 1446 H (31 Desember 2024)"

⚓ API reference
1. Phone Formatter

| Method                         | Description                     | Parameters                                                                 | Returns  |
|-------------------------------|---------------------------------|----------------------------------------------------------------------------|----------|
| `format(phone, options?)`     | Format phone number             | `phone: string`,<br>`options?: { format: 'standard' \| 'dots' \| 'spaces' }` | `string` |
| `validate(phone)`             | Validate Indonesian phone number| `phone: string`                                                            | `boolean`|

2. NPWP Formatter

| Method              | Description                         | Parameters         | Returns  |
|---------------------|-------------------------------------|---------------------|----------|
| `format(npwp)`      | Format NPWP to `XX.XXX.XXX.X-XXX.XXX` | `npwp: string`      | `string` |
| `validate(npwp)`    | Validate NPWP (15 digits)            | `npwp: string`      | `boolean`|

3. NIK (KTP) Formatter

| Method            | Description                          | Parameters     | Returns   |
|-------------------|--------------------------------------|----------------|-----------|
| `parse(nik)`      | Parse NIK and extract information     | `nik: string`  | `NIKInfo` |
| `format(nik)`     | Format NIK with spaces                | `nik: string`  | `string`  |
| `validate(nik)`   | Validate NIK format and date          | `nik: string`  | `boolean` |


4. Date Formatter

| Method                        | Description                    | Parameters                                                                                     | Returns  |
|-------------------------------|--------------------------------|------------------------------------------------------------------------------------------------|----------|
| `format(date, format?)`       | Format date to Indonesian      | `date: Date`,<br>`format?: 'long' \| 'medium' \| 'short' \| 'monthYear'`                        | `string` |
| `relative(date, baseDate?)`   | Get relative time in Indonesian| `date: Date`,<br>`baseDate?: Date`                                                              | `string` |


5. Calendar Formatter
| Method                                 | Description                   | Parameters                                                                 | Returns        |
|----------------------------------------|-------------------------------|----------------------------------------------------------------------------|----------------|
| `toJavanese(date)`                     | Convert to Javanese calendar | `date: Date`                                                               | `JavaneseDate` |
| `toHijri(date)`                        | Convert to Hijri calendar    | `date: Date`                                                               | `HijriDate`    |
| `formatJavanese(date, includeGregorian?)` | Format Javanese date          | `date: Date`,<br>`includeGregorian?: boolean`                             | `string`       |
| `formatHijri(date, includeGregorian?)`    | Format Hijri date             | `date: Date`,<br>`includeGregorian?: boolean`                             | `string`       |


🧠 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

🦾 Testing
npm test