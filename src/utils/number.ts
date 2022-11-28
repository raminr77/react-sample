function replaceMappedChars(
  value: string,
  hashMap: Record<string | number, string>
): string {
  return value
    .split('')
    .map((char) => hashMap[char] ?? char)
    .join('');
}

export function arToFa(value: string): string {
  const numsMap = {
    '٠': '۰',
    '١': '۱',
    '٢': '۲',
    '٣': '۳',
    '٤': '۴',
    '٥': '۵',
    '٦': '۶',
    '٧': '۷',
    '٨': '۸',
    '٩': '۹'
  };
  return replaceMappedChars(String(value), numsMap);
}

export function enToFa(value: string): string {
  const numsMap = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
  };
  return replaceMappedChars(String(value), numsMap);
}

export function faToEn(value: string): string {
  const numsMap = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
  };
  return replaceMappedChars(String(value), numsMap);
}

export function faPriceToEnNumber(value: string): string {
  return faToEn(value)?.replaceAll?.(',', '');
}

export function formatPrice(inputNumber: number | string, isEnglish = false) {
  /* eslint-disable-next-line unicorn/no-unsafe-regex */
  const result = String(inputNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return isEnglish ? result : enToFa(result);
}
