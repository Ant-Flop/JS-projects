const player1 = {
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['brass knuckles',],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const player2 = {
    name: 'Sonya',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['blades'],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

function createPlayer(className, player) {
    const $player1 = document.createElement('div');
    $player1.classList.add(className);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp +'%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;

    const $img = document.createElement('img');
    $img.src = player.img;

    $player1.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player1.appendChild($character);
    $character.appendChild($img);
    const divArenas = document.querySelector(".arenas");
    divArenas.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);