type HashMap = {
  [key: string | number]: string;
};

/* eslint-disable unicorn/prefer-spread */
function replaceMappedChars(value: string, hashMap: HashMap): string {
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

/* eslint-disable unicorn/no-unsafe-regex, no-param-reassign */
export function formatPrice(inputNumber: number, isRials = false) {
  const tomans = isRials ? Math.floor(inputNumber / 10) : inputNumber;
  // If number only
  if (!Number.isNaN(tomans)) {
    return enToFa(String(tomans).replace(/\B(?=(\d{3})+(?!\d))/g, '٫'));
  }

  // Text that contains number
  const text = `${inputNumber} `;
  let result = text;

  // eslint-disable-next-line unicorn/better-regex
  const prices = (text.match(/[0-9]+/g) || []).map((price) => {
    price = price.trim();
    const leftPad = 3 - ((price.length - (isRials ? 1 : 0)) % 3);

    if (leftPad !== 3) {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < leftPad; index++) {
        price = ` ${price}`;
      }
    }

    const temporary = [];
    // eslint-disable-next-line no-underscore-dangle
    for (let index = 0, index_ = 3; index_ <= price.length + 1; index += 3, index_ += 3) {
      temporary.push(price.slice(index, index_));
    }

    return [price.trim(), temporary.join('٫').trim()];
  });

  prices.forEach(([original, formatted]) => {
    result = result.replace(original, formatted);
  });

  return enToFa(result);
}
