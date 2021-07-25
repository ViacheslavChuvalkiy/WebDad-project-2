window.onload = (function () {

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

      if(arrowItem.classList.contains('left') || arrowItem.classList.contains('right')) {
        arrowItem.addEventListener('click', moveSliderBlock)
      }
    }

  }

  function moveSliderBlock() {

    let directionleft = this.classList.contains('left');

    let parrentBlock =  directionleft ? this.nextElementSibling.firstElementChild : this.previousElementSibling.firstElementChild;

    moveBlock(parrentBlock, directionleft);

    function moveBlock(parrentBlock, directionleft) {

      let arrChilds = Array.from(parrentBlock.children);
      let widthparrentBlock = parrentBlock.parentElement.offsetWidth;
      let widthAllChilds = 0;
      let lastActiveBlock = undefined;

      arrChilds.forEach( (item,index) => {
        widthAllChilds += item.offsetWidth;
        if(item.classList.contains('active')){
          lastActiveBlock = index === arrChilds.length -1 ? index + 1 :index;
        }
      });

      let widthChild = widthAllChilds / arrChilds.length;
      let CountVisibleBlocks = Math.round(widthparrentBlock/widthChild);

      if(directionleft && lastActiveBlock === undefined){
          arrChilds[0].classList.add('active');
          lastActiveBlock = 0;
      }

      if(lastActiveBlock === undefined && arrChilds.length >= CountVisibleBlocks){
        arrChilds[CountVisibleBlocks-1].classList.add('active');
        lastActiveBlock = CountVisibleBlocks;
      }

      if (parrentBlock.localName === 'div') {

        let styleValue = parrentBlock.style.transform;
        let inx = styleValue.indexOf('(') + 1;

        styleValue = styleValue.slice(inx, styleValue.length - 3);

        if (styleValue === '') {

          if (directionleft) {

            if(lastActiveBlock === 0){
              return;
            }
            else{
              arrChilds[lastActiveBlock].classList.remove('active');
              lastActiveBlock -= 1;
              arrChilds[lastActiveBlock].classList.add('active');
            }

            parrentBlock.setAttribute('style', 'transform:translateX( ' + widthChild + 'px)');
          } else {

            if(lastActiveBlock > arrChilds.length){
              return;
            }
            else{
              arrChilds[lastActiveBlock-1].classList.remove('active');
              arrChilds[lastActiveBlock].classList.add('active');
              lastActiveBlock += 1;
            }

            parrentBlock.setAttribute('style', 'transform:translateX( -' + widthChild + 'px)');
          }

        } else {
          let newValue;

          if (directionleft) {
            if(lastActiveBlock === 0){
              return;
            }
            else{
              arrChilds[lastActiveBlock].classList.remove('active');
              lastActiveBlock -= 1;
              arrChilds[lastActiveBlock].classList.add('active');
            }

            newValue = (Number(styleValue) + widthChild);
          } else {

            if(lastActiveBlock > arrChilds.length){
              return;
            }
            else{
              arrChilds[lastActiveBlock - 1].classList.remove('active');
              arrChilds[lastActiveBlock].classList.add('active');
              lastActiveBlock += 1;

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

});