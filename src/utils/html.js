import { isServerSide } from '@digikala/utils';

/**
 * @param {string} input String html
 * @return {string} parse things like &lt; to real html
 */
export function htmlDecode(input) {
  if (isServerSide) {
    return input;
  }
  let e = document.createElement('textarea'); // it's must be "textarea" for working.
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}
