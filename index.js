function calculate(){
  let desired = parseInt(document.querySelector('#desired').value);
  let given = parseInt(document.querySelector('#given').value);
  let trys = parseInt(document.querySelector('#try').value);
  let operands = document.querySelector('#operands').value;
  if (isNaN(desired) || isNaN(given) || isNaN(trys) || operands.length === 0) {
    alert("Alle Felder müssen ausgefüllt sein!");
    return;
  }
  operands = operands.split(';');
  operations = [];
  operants.forEach(element => {
    if(element.length = 2){
      operations.push({
        operand: element[0],
        value: element[1],
      });
    }
    if(element.contains('=>')) {
      split = element.split('=>');
      operations.push({
        operand: 'replace',
        from: split[0],
        to: split[1],
      })
    }
  });
  possible_ops = [];
  for(let i=0; i < trys; i++) {
    for(let l=0; l < operations; l++) {

    }
  }
}
function getAllOperations(start, others){
  
}