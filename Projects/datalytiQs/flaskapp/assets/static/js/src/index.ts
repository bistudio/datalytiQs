
const createDiv = (number:number, text:string) => {
  const div = document.createElement('div');
  div.innerText = text;
  div.id = `div-${number}-${text}`;
  return div;
}