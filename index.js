calculate(){
 let desired = document.querySelector('#desired').value;
 let given = document.querySelector('#given').value;
 let try = document.querySelector('#try').value;
 let operands = document.querySelector('#operands').value;
 if (desired.length === 0 || given.length === 0 || try.length === 0 || operands.length === 0) {
  alert("Alle Felder müssen ausgefüllt sein!");
  return;
 }
 operands = operands.split(';');
 for(let i=0; i < (int) try; i++) {
  
 }
}
