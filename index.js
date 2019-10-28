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
  operands.forEach(element => {
    if(element.length = 2){
      operations.push({
        operand: element[0],
        value: element[1],
        toString(){
          return (element[0]+'|'+element[1]);
        }
      });
    }
    if(element.includes('=>')) {
      split = element.split('=>');
      operations.push({
        operand: 'replace',
        from: split[0],
        to: split[1],
      })
    }
  });
  possible_ops = getAllOperations(operations, trys, 0, new Array(trys));
  for(let i=0; i < trys; i++) {
    for(let l=0; l < operations; l++) {

    }
  }
}
function getAllOperations(operands, len, startPosition, result) {
  console.log(len)
  if (len === 0) {
    console.log(result.toString());
    return result;
  }
  for (let i = startPosition; i <= operands.length-len; i++) {
    result[result.length-len] = operands[i];
    getAllOperations(operands, len, i + 1, result);
  }
}