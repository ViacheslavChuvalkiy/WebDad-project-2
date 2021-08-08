
function InitCalcBlockFunction() {

  let calcInput = document.getElementById('calcInput');
  let prevVal;
  let stringVal;
  let action;

  function initEventListener() {

    calcInput.addEventListener('keypress', inputListener);

    let gritItems = document.getElementsByClassName('grid-item');

    for (let i = 0; i < gritItems.length; i++) {

      let el = gritItems[i];
      el.addEventListener('click', clickButtonHandler)
    }

  }

  function inputListener(event) {

    let val = event.key;
    event.preventDefault();

    if (!validationInput(val)) {
      alert('It is not allowed action');

      return;
    } else if (val !== 'Enter') {
      fillStringValue(val);
    }
  }

  function fillStringValue(value) {
    stringVal = (stringVal ? stringVal : prevVal ? prevVal : '') + value;
    calcInput.value = stringVal;
  }

  function validationInput(key) {

    val = calcInput.value;

    if (key === '+' || key === '-' || key === '*' || key === '/') {

      if (val.includes(key) || val === '') {
        return false;
      } else {
        return true;
      }

    } else if (key === 'Enter') {
      return true;
    } else if (Number.isNaN(Number(key)) || Number(key) < 0 || Number(key) > 9999999999) {
      return false;
    } else {
      return true;
    }

  }

  function clickButtonHandler() {

    let activeEl = this.innerHTML;

    switch (activeEl) {

      case '0':
        fillStringValue(activeEl);
        break;
      case '1':
        fillStringValue(activeEl);
        break;
      case '2':
        fillStringValue(activeEl);
        break;
      case '3':
        fillStringValue(activeEl);
        break;
      case '4':
        fillStringValue(activeEl);
        break;
      case '5':
        fillStringValue(activeEl);
        break;
      case '6':
        fillStringValue(activeEl);
        break;
      case '7':
        fillStringValue(activeEl);
        break;
      case '8':
        fillStringValue(activeEl);
        break;
      case '9':
        fillStringValue(activeEl);
        break;
      case '+':
        fillStringValue(activeEl);
        clickActionHandlerDefault();
        break;
      case '-':
        fillStringValue(activeEl);
        clickActionHandlerDefault();
        break;
      case '*':
        fillStringValue(activeEl);
        clickActionHandlerDefault();
        break;
      case '/':
        fillStringValue(activeEl);
        clickActionHandlerDefault();
        break;
      case '=':
        clickActionHandlerDefault();
        break;
      case '&lt':
        clickActionHandlerDefault();
        break;
      case 'C':
        calcInput.value = '';
        action = undefined;
        prevVal = undefined;
        stringVal = undefined;
        break;
      default:
        clickActionHandlerDefault();
        break;
    }
  }

  function clickActionHandlerDefault() {

    setAction(stringVal);

    if (action !== '' || !action) {

      let i = stringVal.indexOf(action);

      if (i === stringVal.length - 1) {
        return;
      }

      prevVal = stringVal.slice(0, i);
      calcInput.value = stringVal.slice(i + 1, stringVal.length);

      if (calcInput.value.includes(action)) {
        console.log('Можно напариться и сделать обработку нескольких событий, но я не стал, просто ограничил одним символом...');
      }

      counterHandler(Number(prevVal), Number(calcInput.value))

    }
  }

  function counterHandler(num1, nam2) {

    switch (action) {

      case '+':
        calcInput.value = num1 + nam2;
        prevVal = calcInput.value;
        stringVal = undefined;
        break;
      case '-':
        calcInput.value = num1 - nam2;
        prevVal = calcInput.value;
        stringVal = undefined;
        break;
      case '*':
        calcInput.value = num1 * nam2;
        prevVal = calcInput.value;
        stringVal = undefined;
        break;
      case '/':
        calcInput.value = num1 / nam2;
        prevVal = calcInput.value;
        stringVal = undefined;
        break;
    }
  }

  function setAction(str) {

    if (str === '') {
      action = '';
    } else if (str.includes('+')) {
      action = '+';
    } else if (str.includes('-')) {
      action = '-';
    } else if (str.includes('*')) {
      action = '*';
    } else if (str.includes('/')) {
      action = '/';
    }
  }

  initEventListener();

}