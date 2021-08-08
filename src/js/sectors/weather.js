
function initWeatherBlockFunction() {

  let selectCityElement = document.getElementById('city-select');
  let addCityElement = document.getElementById('addCity');
  let weatherImgElement = document.getElementById('weather-img');
  let weatherInfoElement = document.getElementsByClassName('weather-inf')[0];
  let weatherTextElement = document.getElementsByClassName('weather-city')[0];

  let apiKey = "2ea5327b4b95846b033cd41567e09ed1";
  let city = "Kyiv";
  let url = '';

  selectCityElement.addEventListener('change', selectHandler);
  addCityElement.addEventListener('change', addCity);
  addCityElement.addEventListener('blur', blurInputCity);


  function validationInput(str) {

    if(str ===''){
      return false;
    }

    return true;
  }

  function selectHandler(event) {

    let val = event.target.value;
    let selectedEl = '';

    for (let i = 0; i< selectCityElement.children.length; i++){

      if (val.toLocaleLowerCase() === selectCityElement.children[i].value.toLocaleLowerCase()){
        selectedEl = selectCityElement.children[i];
        break;
      }

    }

    if(val === 'addCity'){
      addCityHendler();
    }

    else if(val !== city){
      city = val;
      refreshInfoWeather();
      weatherTextElement.innerHTML = selectedEl.innerHTML;
    }
  }

  function blurInputCity() {
    addCityElement.classList.toggle('hideBlock');
    addCityElement.value = '';
    addCityElement.blur();
  }

  function addCityHendler() {

    addCityElement.classList.toggle('hideBlock');
    addCityElement.focus();

  }

  function addCity(event) {

    if(!validationInput(event.target.value)){
      return;
    }

    event.preventDefault();

    let current_value = event.target.value;
    let current_id = event.target.value.split(',')[0];
    let elExist = false;
    let chosenEl = '';

    if(current_id === ''){
      return;
    }

    for (let index = 0; index < selectCityElement.children.length; index++) {

      let el = selectCityElement.children[index];

      if (el.id.toLocaleLowerCase() == current_id.toLocaleLowerCase()) {
        elExist = true;
        chosenEl = el;
      }
    }

    if(!elExist) {
      let new_select = document.createElement('option');
      new_select.innerHTML = current_value;
      new_select.value = current_id;
      new_select.id = current_id;

      addCityOption(new_select);
      chosenEl = new_select;
    }

    city = chosenEl.id;
    weatherTextElement.innerHTML = chosenEl.innerHTML;
    addCityHendler();
    refreshInfoWeather();
    selectCityElement.value = chosenEl.value;
    blurInputCity();
  }

  function refreshInfoWeather() {

    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

    $.ajax({
      url: url,
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function(wth) {

        let text = wth.weather[0].description;
        setImageWeather(wth.weather[0].icon);

        text = text + `\n` + wth.main.temp + ' ' + `&#8451`;

        weatherInfoElement.innerHTML  = text;
      },
      error : function(e) {

        let message = document.getElementsByClassName('input-message')[0];
        message.innerHTML = 'ошибка получения данных, возможно не правильно указали город.';
        message.classList.remove('hideBlock');
        setTimeout(()=> {
          message.classList.add('hideBlock');
        },2000)
        ;
      }
    });
  }

  function setImageWeather(icon_img) {

    switch (icon_img) {

      case '01d' :
        weatherImgElement.src = '../img/sun.png';
        break;
      case '02d' :
        weatherImgElement.src = '../img/sun_cloud.png';
        break;
      case '03d' :
        weatherImgElement.src = '../img/cloud.png';
        break;
      case '04d' :
        weatherImgElement.src = '../img/mainlyCloud.png';
        break;
      case '10d' :
        weatherImgElement.src = '../img/rainy.png';
        break;
      case '11d' :
        weatherImgElement.src = '../img/tunder.png';
        break;
      case '13d' :
        weatherImgElement.src = '../img/snow.png';
        break;
      case 'default' :
        weatherImgElement.src = 'https://openweathermap.org/img/w/' + icon_img +'.png ';
        break;
    }

  }

  function addCityOption(newCity) {

    selectCityElement.insertBefore(newCity, selectCityElement[selectCityElement.children.length -1]);
  }

  function setLoction() {

    let elFound = false;

    $.ajax({
      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function(location) {

        city = location.city;

        for (let index = 0; index < selectCityElement.children.length; index++) {

          if(elFound){
            return;
          }

          let el = selectCityElement.children[index];

          if (el.id.toLocaleLowerCase() === city.toLocaleLowerCase()) {
            elFound = true;
            selectCityElement.value = el;
          }
        }


        if(!elFound){
          let new_select = document.createElement('option');
          new_select.innerHTML = location.city + ', ' + location.country_name;
          new_select.value = location.city;
          new_select.id = location.city;
        }

        refreshInfoWeather();
      }
    });

  }

  setLoction();
}