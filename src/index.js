import './main.scss';

import './js/slider.js';
import './js/calc.js';

import img1 from './img/chrome.png';
import img2 from './img/explorer.png';
import img3 from './img/facebook.png';
import img4 from './img/firefox.png';
import img5 from './img/instagarm.png';
import img6 from './img/messenger.png';
import img7 from './img/netflix.png';
import img8 from './img/opera.png';
import img9 from './img/safari.png';
import img10 from './img/snapChat.png';
import img11 from './img/ticTok.png';
import img12 from './img/whatsApp.png';
import img13 from './img/youTube.png';
import img14 from './img/js.png';

import audio1 from './audio/timeFinished.mp3';
import audio2 from './audio/timePaused.mp3';

function InitSliderBlockFunction() {

  let sliderData = [
    {
      name: 'browsers',
      collection: [
        'img/chrome.png',
        'img/explorer.png',
        'img/firefox.png',
        'img/opera.png',
        'img/safari.png',
        'img/chrome.png',
        'img/explorer.png',
        'img/firefox.png'
      ]
    },
    {
      name: 'apps',
      collection: [
        'img/netflix.png',
        'img/snapChat.png',
        'img/ticTok.png',
        'img/messenger.png',
        'img/whatsApp.png'
      ]
    },
    {
      name: 'social',
      collection: [
        'img/instagarm.png',
        'img/facebook.png',
        'img/snapChat.png',
        'img/youTube.png'
      ]
    },
    {
      name: 'apps',
      collection: [
        'img/netflix.png',
        'img/snapChat.png',
        'img/ticTok.png',
        'img/messenger.png',
        'img/whatsApp.png'
      ]
    },
    {
      name: 'browsers',
      collection: [
        'img/chrome.png',
        'img/explorer.png',
        'img/firefox.png',
        'img/opera.png',
        'img/safari.png'
      ]
    },
    {
      name: 'social',
      collection: [
        'img/instagarm.png',
        'img/facebook.png',
        'img/snapChat.png',
        'img/youTube.png'
      ]
    }
  ];
  let sliderRowBlocks = document.getElementsByClassName('sliderRowBlocks')[0];

  function initSlider() {

    sliderData.forEach((elem, index) => {

      let sliderBlock = document.createElement('div');
      sliderBlock.classList.add('sliderBlock');

      let sliderblock__left = document.createElement('span');
      sliderblock__left.classList.add('slider-block__left');
      sliderblock__left.classList.add('left');
      sliderblock__left.innerHTML = '<';

      let sliderblock__right = document.createElement('span');
      sliderblock__right.classList.add('slider-block__right');
      sliderblock__right.classList.add('right');
      sliderblock__right.innerHTML = '>';

      sliderBlock.appendChild(sliderblock__left);

      let sliderblock__container = document.createElement('div');
      sliderblock__container.classList.add('sliderblock__container');

      let container_img = document.createElement('div');
      container_img.classList.add('slider_container_img');

      for (let i = 0; i < elem.collection.length; i++) {
        let sliderblock__img = document.createElement('img');
        sliderblock__img.src = elem.collection[i];
        container_img.appendChild(sliderblock__img);
      }

      sliderblock__container.appendChild(container_img);
      sliderBlock.appendChild(sliderblock__container);
      sliderBlock.appendChild(sliderblock__right);
      sliderRowBlocks.appendChild(sliderBlock);

    });

    addMarks();
  }

  function addMarks() {

    let sliderMarks = document.getElementsByClassName('sliderMarks')[0];

    for (let i = 0; i < sliderData.length; i++) {
      let sliderMark = document.createElement('span');
      sliderMark.classList.add('sliderMark');
      sliderMarks.appendChild(sliderMark);
    }

  }

  function initActionArrow() {

    let arrArrow = document.getElementsByTagName('span');

    for (let i = 0; i < arrArrow.length; i++) {

      let arrowItem = arrArrow[i];

      if (arrowItem.classList.contains('left') || arrowItem.classList.contains('right')) {
        arrowItem.addEventListener('click', moveSliderBlock)
      }
    }

  }

  function moveSliderBlock() {

    let directionleft = this.classList.contains('left');

    let parrentBlock = directionleft ? this.nextElementSibling.firstElementChild : this.previousElementSibling.firstElementChild;

    moveBlock(parrentBlock, directionleft);

    function moveBlock(parrentBlock, directionleft) {

      let arrChilds = Array.from(parrentBlock.children);
      let widthparrentBlock = parrentBlock.parentElement.offsetWidth;
      let widthAllChilds = 0;
      let activeBlock = undefined;

      arrChilds.forEach((item, index) => {
        widthAllChilds += item.offsetWidth;
        if (item.classList.contains('active')) {
          activeBlock = item;
        }
      });

      let widthChild = widthAllChilds / arrChilds.length;
      let CountVisibleBlocks = Math.round(widthparrentBlock / widthChild);

      if (directionleft && activeBlock === undefined) {
        arrChilds[0].classList.add('active');
        activeBlock = arrChilds[0];
      }

      if (activeBlock === undefined && arrChilds.length >= CountVisibleBlocks) {
        arrChilds[CountVisibleBlocks - 1].classList.add('active');
        activeBlock = arrChilds[CountVisibleBlocks - 1];
      }

      if (parrentBlock.localName === 'div') {

        let styleValue = parrentBlock.style.transform;
        let inx = styleValue.indexOf('(') + 1;

        styleValue = styleValue.slice(inx, styleValue.length - 3);

        if (styleValue === '') {

          if (directionleft) {

            if (arrChilds.indexOf(activeBlock) === 0) {
              return;
            } else {
              activeBlock.classList.remove('active');
              activeBlock = arrChilds[arrChilds.indexOf(activeBlock) - 1];
              activeBlock.classList.add('active');
            }

            parrentBlock.setAttribute('style', 'transform:translateX( ' + widthChild + 'px)');
          } else {

            if (arrChilds.indexOf(activeBlock) + 1 === arrChilds.length && widthAllChilds < widthparrentBlock + (-styleValue)) {
              return;
            } else {
              if (arrChilds.indexOf(activeBlock) + 1 !== arrChilds.length) {
                activeBlock.classList.remove('active');
                activeBlock = arrChilds[arrChilds.indexOf(activeBlock) + 1];
                activeBlock.classList.add('active');
              }
            }

            parrentBlock.setAttribute('style', 'transform:translateX( -' + widthChild + 'px)');
          }

        } else {
          let newValue;

          if (directionleft) {
            if (arrChilds.indexOf(activeBlock) === 0) {
              return;
            } else {
              activeBlock.classList.remove('active');
              activeBlock = arrChilds[arrChilds.indexOf(activeBlock) - 1];
              activeBlock.classList.add('active');
            }

            newValue = (Number(styleValue) + widthChild);
          } else {

            if (arrChilds.indexOf(activeBlock) + 1 === arrChilds.length && widthAllChilds < widthparrentBlock + (-styleValue)) {
              return;
            } else {
              if (arrChilds.indexOf(activeBlock) + 1 !== arrChilds.length) {
                activeBlock.classList.remove('active');
                activeBlock = arrChilds[arrChilds.indexOf(activeBlock) + 1];
                activeBlock.classList.add('active');
              }
            }
            newValue = (Number(styleValue) - widthChild);
          }

          parrentBlock.setAttribute('style', 'transform:translateX( ' + newValue + 'px)');
        }
      }

    }
  }

  function initInputHandler() {

    let container_labels = document.getElementsByClassName('container_label');

    for (let i = 0; i < container_labels.length; i++) {

      let labelItem = container_labels[i];

      labelItem.addEventListener('click', showAppBlocks);
    }

  }

  function showAppBlocks() {

    let container_blocks = document.getElementsByClassName('container-block');

    let currentBlockID = this.previousElementSibling.value;

    for (let i = 0; i < container_blocks.length; i++) {

      let tempBlock = container_blocks[i];

      if (tempBlock.classList.contains('hideBlock') && tempBlock.id === currentBlockID) {
        tempBlock.classList.remove('hideBlock');
      } else {
        tempBlock.classList.add('hideBlock');
      }
    }

  }

  initSlider();
  initActionArrow();
  initInputHandler();
}

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

function initTimerblockFunction() {

  let rest_time = '15:00';
  let status = 'stop';
  let timing = '';
  let dateVal = '45:00';

  let setting_icon = document.getElementsByClassName('fa-cog')[0];
  let update_icon = document.getElementsByClassName('fa-circle-notch')[0];
  let timing_block = document.getElementsByClassName('timing-block')[0];
  let timing_options = document.getElementsByClassName('timing-options')[0].children;
  let timing_btn = document.getElementsByClassName('timing-btn');
  let footer_p = document.getElementsByClassName('timing-footer')[0].children[0];
  let start_btn = document.getElementById('start');
  let setting_inputs = document.getElementsByClassName('setting-input');

  setting_icon.addEventListener('click', showSettingBlock);

  update_icon.addEventListener('click', () => {
    window.location.reload();
  });

  for (let i = 0; i < timing_options.length; i++) {

    timing_options[i].addEventListener('click', setTimingOptions);

  }

  for (let i = 0; i < timing_btn.length; i++) {

    let temp_btn = timing_btn[i];

    temp_btn.addEventListener('click', actionsTiming);

  }

  for(let i = 0; i < setting_inputs.length; i++){
    setting_inputs[i].addEventListener('keypress', validationInput)
  }

  function validationInput(event) {

    if (event.key.toLowerCase() !== 'enter') {

      event.preventDefault();

      let val = this.value;
      let key = val + event.key;

      if (Number.isNaN(Number(key)) || Number(key) < 0 || Number(key) > 60 || key.length > 2) {
        this.value = val;
      } else {
        this.value = key;
      }
    }
    else {
      this.blur();
    }
  }

  function showSettingBlock() {

    if(status !== 'stop'){
      return;
    }

    let setting_block = document.getElementsByClassName('timing-setting')[0];

    setting_block.classList.toggle('timing-setting-visible');
    timing_block.classList.toggle('block-timing-opacity');
    document.getElementsByClassName('timing-options')[0].classList.toggle('block-timing-opacity');
    document.getElementsByClassName('timing-footer')[0].classList.toggle('block-timing-opacity');
  }

  function setTimingOptions(event) {

    if(status !== 'stop'){
      return;
    }

    for (let i = 0; i < timing_options.length; i++) {

      let temp_option = timing_options[i];

      if (temp_option == event.target && !temp_option.classList.contains('active-time')) {
        temp_option.classList.add('active-time');
      } else if (temp_option.classList.contains('active-time')) {
        temp_option.classList.remove('active-time');
      }
    }

    dateVal = event.target.innerHTML;

    setTiming();
    footer_p.innerHTML = 'Time to work!!!';
  }

  function actionsTiming(event) {

    let action = event.target.id;

    switch(action) {

      case 'go':

        showSettingBlock();
        status = 'start';
        let setting_work_min = document.getElementById('timing-work-min').value;
        let setting_work_sec = document.getElementById('timing-work-sec').value;

        let setting_rest_min = document.getElementById('timing-rest-min').value;
        let setting_rest_sec = document.getElementById('timing-rest-sec').value;

        dateVal = setting_work_min + ':' + setting_work_sec;
        rest_time = setting_rest_min + ':' + setting_rest_sec;
        footer_p.innerHTML = 'Time to work';
        start_btn.innerText = 'Пауза';
        setTiming();
        StartPauseTiming('go');

        break;

      case 'start':

        if(status !== 'stop'){
          clearTimeout(timing);
          status = 'stop';
          start_btn.innerText = 'Продолжить';
          StartPauseTiming('pause');
          break;
        }

        status = 'start';
        let divMinuts = document.getElementsByClassName('timing-clock-min')[0].children[0];

        divMinuts.innerHTML = Number(divMinuts.innerHTML) - 1 < 10 ? '0' + (Number(divMinuts.innerHTML) - 1).toString() : Number(divMinuts.innerHTML) - 1;
        divMinuts.classList.toggle('rotate_block');

        start_btn.innerText = 'Пауза';

        setTiming();
        StartPauseTiming('go');

        break;

      case 'stop':
        clearTimeout(timing);
        status = 'stop';
        setDefaultTime();
        break;

      case 'cancel':
        showSettingBlock();
        status = 'stop';
        setDefaultTime();
        break;
    }

  }

  function setDefaultTime() {

    let active_time = document.getElementsByClassName('active-time')[0].innerHTML;

    dateVal = active_time.split('/')[0] + ':00';
    start_btn.innerText = 'Старт';
    setTiming();
  }

  function setTiming() {

    let arrDate = dateVal.split('/');

    let arr_work_time = arrDate[0].split(':');


    let setMinuts = document.getElementsByClassName('timing-clock-min')[0].children[0];
    let setSeconds = document.getElementsByClassName('timing-clock-sec')[0].children[0];

    setMinuts.innerHTML = arr_work_time[0];
    setSeconds.innerHTML = arr_work_time.length > 1 ? arr_work_time[1] : '00';

    dateVal = setMinuts.innerHTML + ':' + setSeconds.innerHTML;

  }

  function countingTime() {

    if(status ==='stop'){
      return
    }

    let divMinuts = document.getElementsByClassName('timing-clock-min')[0].children[0];
    let divSeconds = document.getElementsByClassName('timing-clock-sec')[0].children[0];

    let minutValue = divMinuts.innerHTML;
    let secValue = divSeconds.innerHTML;

    if (secValue === '00' && minutValue !=='00'){
      divMinuts.innerHTML = Number(minutValue) - 1 < 10 ? '0' + (Number(minutValue) - 1).toString() : Number(minutValue) - 1;
      divSeconds.innerHTML = '59';

      divMinuts.classList.toggle('rotate_block');
      divSeconds.classList.toggle('rotate_block');

    }
    else if (secValue !== '00') {
      divSeconds.innerHTML = Number(secValue) - 1 < 10 ? '0' + (Number(secValue) - 1).toString() : Number(secValue) - 1;
      divSeconds.classList.toggle('rotate_block');
    }

    if(minutValue ==='00' && secValue === '00'){

      if( rest_time === '00:00'){
        showTimeFinished('all');
        status = 'stop';
      }
      else {
        dateVal = rest_time;
        rest_time = '00:00';
        setTiming();
        showTimeFinished('rest');
      }

    }
    else {
      dateVal = divMinuts.innerHTML  + ':' + divSeconds.innerHTML;
    }

    timing = setTimeout(countingTime,1000);
  }

  function StartPauseTiming(action) {

    if (action === 'go' || action === 'start') {

      timing = setTimeout(countingTime, 0);

    }
    else {
      clearTimeout(timing);
    }

  }

  function showTimeFinished(action) {

    let audio = new Audio;

    if(action ==='all'){
      audio.src = audio1;
      footer_p.innerHTML = 'Well done!!!';
      clearTimeout(timing);
    }
    else {
      audio.src = audio2;
      footer_p.innerHTML = 'Time to rest';
    }

    audio.play();
  }

};

InitSliderBlockFunction();
InitCalcBlockFunction();
initTimerblockFunction();




