let desired = null;
let given = null;
let trys = null;
let operands = null;
let output = null;

const op_ids = ['+', '']

let buttons = document.querySelector('.numbers');
for(let i = 1; i < 10; i++){
  button = document.createElement('input');
  button.setAttribute('onClick', 'addToInput(' + i + ')');
  button.setAttribute('type', 'button');
  button.setAttribute('value', i);
  buttons.appendChild(button);
}
button = document.createElement('input');
button.setAttribute('onClick', 'addToInput(' + 0 + ')');
button.setAttribute('type', 'button');
button.setAttribute('value', 0);
buttons.appendChild(button);

function addToInput(string){
  document.querySelector('#operands').value += string; 
}

function init (params) {

  desired = parseInt(document.querySelector('#desired').value);
  given = parseInt(document.querySelector('#given').value);
  trys = parseInt(document.querySelector('#try').value);
  operands = document.querySelector('#operands').value;
  output = document.querySelector('.routes');
  output.innerHTML="";
  if (isNaN(desired) || isNaN(given) || isNaN(trys) || operands.length === 0) {
    alert("Alle Felder müssen ausgefüllt sein!");
    return;
  }
  calculate();
}

function calculate(){
  operands = operands.split(';');
  operations = [];
  operands.forEach(element => {
    operations.push(generateOperation(element));
  });
  ops = [];
  for(let i=0; i < trys; i++) {
    ops.push(operations);
  }
  possible_routes = product(...ops);
  console.log(possible_routes);
  possible_routes.forEach(route => {
    route = executeRoute(route);
    if (route.value === desired) {
      (output.innerHTML += route.history.join(' -> ') + '<br />')
    }
    console.log('route done: ' + route.value)
  });
}

function generateOperation(op) {
  if (op.match(/[\+\-\*xX\/]\d{1,2}/)){
    return {
        operand: op[0],
        value: parseInt(op.substring(1, op.length)),
        toString(){
          return (op[0] + op.substring(1, op.length));
        }
      };
  } else if (op.match(/\d=>\d/)){
    return {
      operand: 'replace',
      from: op.split('=>')[0],
      to: op.split('=>')[0],
      toString(){
        return (op[0]+'=>'+op[3]);
      }
    };
  } else if (op.match(/<</)) {
    return {
      operand: 'delete',
      toString(){
        return ('<<');
      }
    };
  } else if (op.match(/\d{1}/)){
    return {
      operand: 'append',
      value: op,
      toString(){
        return ('A' + op);
      }
    };
  } else if (op.match(/\^\d{1}/)){
    return {
      operand: 'pow',
      value: op,
      toString(){
        return ('^' + op);
      }
    };
  }
  else {
    alert('unbekannter Operator: \''+ op + '\'!');
  }
}

function executeRoute(route) {
  let value = parseInt(given);
  let history = [];
  route.forEach((element) => {
    value = executeOperation(element, value);

    if(value > 5000000){
      throw new FatalError('Value too high');

    }; // No one needs that big numbers!
    history.push(element);
  });

  return {value: value, history: history};

}

function executeOperation(op, value){
  switch (op.operand) {
    case '+':
      return value + parseInt(op.value);
    case '-':
      return value - parseInt(op.value);
    case '*':
    case 'x':
    case 'X':
      return value * parseInt(op.value);
    case '/':
      return value / parseInt(op.value);
    case 'replace':
      return parseInt(value.toString().replace(op.from, op.to));
    case 'append':
      return parseInt(value.toString() + op.value);
    case 'delete':
      if (value.toString().length === 1) {
        return 0;
      }
      return parseInt(value.toString().substring(0,value.toString().length-1));
    default:
      break;
  }
}
const flatten = (arr) => [].concat.apply([], arr);

const product = (...sets) =>
  sets.reduce((acc, set) =>
    flatten(acc.map(x => set.map(y => [ ...x, y ]))),
    [[]]);