function initMazeBlockFunction() {

  let btn_start = document.getElementById('start_stop_game');

  let setting_inputs = document.getElementsByClassName('setting-input');
  let maze_table = document.getElementsByClassName('maze-table')[0];
  let maze_setting = document.getElementsByClassName('maze-setting')[0];
  let table__levels = document.getElementsByClassName('table-inf__levels')[0];
  let table__info = document.getElementsByClassName('maze-table__inf')[0];
  let current_el_player = '';
  let next_el_player_id = '';
  let arr_table_rows = [];
  let player_img = '';
  let table_stop_blocks = 0;
  let levels = 0;
  let status = 'newGame';
  let table_div = 0;
  let row_game = 0;
  let colm_game = 0;


  btn_start.addEventListener('click', startGame);
  addEventListener('keydown', gameContols);

  for (let i = 0; i < setting_inputs.length; i++) {

    setting_inputs[i].addEventListener('keypress', validationInputs);

  }

  function validationInputs(event) {
    event.preventDefault();

    let key = event.target.value;

    if (!validationInput(key)) {
      this.value = '';
    }
  }

  function validationInput(key) {

    if (Number.isNaN(Number(key)) || Number(key) < 4 || Number(key) > 8) {
      return false;
    } else {
      return true;
    }

  }

  function startGame() {

    switch (status) {

      case "newGame":
        status = 'start';
        showTableGame();
        createTable();
        break;

      case "start":
        showTableGame();
        createTable();
        break;

      case "next":
        status = 'start';
        createTable();
        break;

      case "end":
        showTableGame();
        createTable();
        status = 'start';
        break;
    }

  }

  function getStopBlocksArray(start, finish, arrStop_blocks, table_div) {

    while (arrStop_blocks.length < table_stop_blocks) {
      let temp_block = Math.floor(Math.random() * table_div);
      if (temp_block !== start && temp_block !== finish && !arrStop_blocks.includes(temp_block)) {
        arrStop_blocks.push(temp_block);
      }
    }
    return arrStop_blocks;
  }

  function showTableGame() {
    maze_table.classList.toggle('hideBlock');
    maze_setting.classList.toggle('hideBlock');
  }

  function createTable() {

    if (maze_table.childNodes.length) {
      cleanTable();
    }

    table_stop_blocks += 1;
    levels += 1;

    let level = document.getElementsByClassName('table-inf__text')[0];

    if (!level) {
      level = document.createElement('p');
      level.classList.add('table-inf__text');
      table__levels.appendChild(level);
    }

    level.innerHTML = levels;

    player_img = document.querySelectorAll('input[name=maze-player]:checked')[0].value;

    row_game = document.getElementById('gameRow').value;
    colm_game = document.getElementById('gameColm').value;

    table_div = row_game * colm_game;

    let start = Math.floor(Math.random() * table_div);
    let finish = Math.floor(Math.random() * table_div);

    while (start === finish) {
      finish = Math.floor(Math.random() * table_div);
    }

    maze_table.setAttribute('style', 'grid-template-columns: repeat(' + colm_game + ', minmax(1.5rem, auto)); grid-template-rows : repeat(' + row_game + ', minmax(1.5rem, auto))');

    let arrStop_blocks = getStopBlocksArray(start, finish, [], table_div);
    let arr_table_colm = [];
    let mazeItemBlock;

    for (let i = 0; i < table_div; i++) {

      if (maze_table.children[i]) {
        mazeItemBlock = maze_table.children[i];
      } else {
        mazeItemBlock = document.createElement('div');
        mazeItemBlock.classList.add('maze-table__item');
        mazeItemBlock.id = 'block_' + i;
      }

      arr_table_colm.push(mazeItemBlock.id);

      if (arr_table_colm.length == colm_game) {
        arr_table_rows.push(arr_table_colm);
        arr_table_colm = [];
      }

      if (i === start) {
        mazeItemBlock.setAttribute('style', `background-image:url('../img/` + player_img);
        mazeItemBlock.classList.add('maze-table__player');
      } else if (i === finish) {
        mazeItemBlock.classList.add('maze-table__finish');
      } else if (arrStop_blocks.includes(i)) {
        mazeItemBlock.classList.add('maze-table__stop');
      }

      if (!maze_table.children[i]) {
        maze_table.appendChild(mazeItemBlock);
      }

    }

    startStopGameinfo();
  }

  function cleanTable() {

    for (let i = 0; i < maze_table.children.length; i++) {
      maze_table.children[i].classList.remove('maze-table__player');
      maze_table.children[i].classList.remove('maze-table__finish');
      maze_table.children[i].classList.remove('maze-table__stop');
      maze_table.children[i].removeAttribute('style');
    }
  }

  function gameContols(event) {

    let key = event.key;

    if (status === "start" && validationMove(key)) {

      event.preventDefault();

      let action = setActionMove(key);

      makeMoveBlock(action);

    }
  }

  function validationMove(key) {

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' ||
      key === '4' || key === '8' || key === '6' || key === '2') {
      return true;
    } else return false;
  }

  function setActionMove(key) {

    switch (key) {

      case 'ArrowUp' :
        return 'up';
        break;

      case '8' :
        return 'up';
        break;

      case 'ArrowRight' :
        return 'right';
        break;

      case '6' :
        return 'right';
        break;

      case 'ArrowDown' :
        return 'down';
        break;

      case '2' :
        return 'down';
        break;

      case 'ArrowLeft' :
        return 'left';
        break;

      case '4' :
        return 'left';
        break;
    }
  }

  function makeMoveBlock(action) {

    current_el_player = document.getElementsByClassName('maze-table__player')[0];

    let elem_found = false;
    let current_pos_row = 0;
    let current_pos_colm = 0;

    arr_table_rows.forEach((row, inx) => {

      if (elem_found) {
        return;
      }

      row.forEach((colmm, index) => {

          if (elem_found) {
            return;
          }

          if (colmm === current_el_player.id) {
            current_pos_colm = index;
            current_pos_row = inx;
            elem_found = true;
          }
        }
      )

    });

    let new_row_pos = current_pos_row;
    let new_colm_pos = current_pos_colm;

    switch (action) {

      case 'up' :
        new_row_pos = current_pos_row - 1;

        if (new_row_pos >= 0) {

          next_el_player_id = arr_table_rows[new_row_pos][new_colm_pos];

          makeValidMove();
        }

        break;

      case 'right' :

        new_colm_pos = new_colm_pos + 1;

        if (new_colm_pos <= Number(colm_game -1)) {

          next_el_player_id = arr_table_rows[new_row_pos][new_colm_pos];

          makeValidMove();
        }

        break;

      case 'down' :

        new_row_pos = current_pos_row + 1;

        if (new_row_pos <= Number(row_game -1)) {

          next_el_player_id = arr_table_rows[new_row_pos][new_colm_pos];

          makeValidMove();
        }
        break;

      case 'left' :

        new_colm_pos = new_colm_pos - 1;

        if (new_colm_pos >= 0) {

          next_el_player_id = arr_table_rows[new_row_pos][new_colm_pos];

          makeValidMove();
        }

        break;

      case 'default':

        return;
        break;

    }
  }

  function makeValidMove() {

    let new_elem_player = document.getElementById(next_el_player_id);

    if (!new_elem_player) {
      return;
    }
    current_el_player.removeAttribute('style');
    current_el_player.classList.remove('maze-table__player');

    if (new_elem_player.classList.contains('maze-table__stop')) {
      wrongStep();
    } else if (new_elem_player.classList.contains('maze-table__finish')) {
      finishStep();
    } else {
      nextStep(new_elem_player);
    }
  }

  function wrongStep() {

    let maze_table_result = document.getElementsByClassName('maze-table-result')[0];
    maze_table_result.innerHTML = 'Wrong!!! You lose((';
    maze_table_result.classList.remove('hideBlock');
    setTimeout(() => {
      maze_table_result.classList.add('hideBlock');
    }, 2000)

    status = 'stop';
    startStopGameinfo();
  }

  function finishStep() {

    let maze_table_result = document.getElementsByClassName('maze-table-result')[0];
    maze_table_result.innerHTML = 'YES!!! You won))';
    maze_table_result.classList.remove('hideBlock');
    setTimeout(() => {
      maze_table_result.classList.add('hideBlock');
    }, 2000)

    status = 'finish';
    startStopGameinfo();
  }

  function nextStep(new_elem_player) {
    new_elem_player.classList.add('maze-table__player');
    new_elem_player.setAttribute('style', `background-image:url('../img/` + player_img);
  }

  function startStopGameinfo() {

    let info_level = document.getElementsByClassName('table-inf__levels')[0];

    switch (status) {

      case 'start':
        table__info.classList.add('maze-table__inf_absolute');
        info_level.classList.remove('hideBlock');
        btn_start.innerText = 'Не могу пройти(((';
        break;

      case 'stop':
        status = 'end';
        levels = 0;
        table_stop_blocks = 0;

        btn_start.innerText = 'Играть заново';
        break;

      case 'finish':
        status = 'next';
        btn_start.innerText = 'Следующий уровень';
        break;

      case 'end':
        levels = 0;
        table_stop_blocks = 0;
        table__info.classList.remove('maze-table__inf_absolute');
        info_level.classList.add('hideBlock');
        btn_start.innerText = 'Старт';
        break;

    }
  }
};