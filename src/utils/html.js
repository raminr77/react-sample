export function htmlDecode(input) {
  let e = document.createElement('textarea'); // it's must be "textarea" for working.
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}
