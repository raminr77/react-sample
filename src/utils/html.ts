export function htmlDecode(inputText: string) {
  const element = document.createElement('textarea');
  element.innerHTML = inputText;
  return element.childNodes.length === 0 ? '' : element.childNodes[0].nodeValue;
}
