
function initTimerBlockFunction() {

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