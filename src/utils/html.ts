export function htmlDecode(inputText: string) {
  const element = document.createElement('textarea'); // it's must be "textarea" for working.
  element.innerHTML = inputText;
  return element.childNodes.length === 0 ? '' : element.childNodes[0].nodeValue;
}
