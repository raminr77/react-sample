function replaceMappedChars(value, hashMap) {
  return value
    .split('')
    .map((char) => (hashMap[char] ? hashMap[char] : char))
    .join('');
}

export function arToFa(value) {
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

export function enToFa(value) {
  if (!value && parseInt(value) !== 0) return;
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

export function faToEn(value) {
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

export function faPriceToEnNumber(value) {
  return faToEn(value)?.replaceAll?.(',', '');
}

export function formatPrice(num, isRials = false) {
  const tomans = isRials ? Math.floor(num / 10) : num;
  // If number only
  if (!isNaN(tomans)) {
    return enToFa(String(tomans).replace(/\B(?=(\d{3})+(?!\d))/g, '٫'));
  }

  // Text that contains number
  let text = num + '';
  let result = text;

  const prices = (text.match(/[0-9]+/g) || []).map((price) => {
    price = price.trim();
    const leftPad = 3 - ((price.length - (isRials ? 1 : 0)) % 3);

    if (leftPad !== 3) {
      for (let i = 0; i < leftPad; i++) {
        price = ' ' + price;
      }
    }

    const tmp = [];
    for (let i = 0, j = 3; j <= price.length + 1; i += 3, j += 3) {
      tmp.push(price.slice(i, j));
    }

    return [price.trim(), tmp.join('٫').trim()];
  });

  prices.forEach(([original, formatted]) => {
    result = result.replace(original, formatted);
  });

  return enToFa(result);
}
