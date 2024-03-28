let level = 1;
let start = false;

const levels = [{
        title: 'Saya harus menemukan petunjuk 1',
        description: 'Petunjuk 1 berada pada sebuah tempat duduk'
    },
    {
        title: 'Wuih, saya menemukan petunjuk 1',
        description: 'Petunjuk 2 berada di rak, tetapi bukan sebuah buku'
    },
    {
        title: 'Keren, saya menemukan petunjuk 2',
        description: 'Petunjuk 3 berada di sesuatu yang menyala pertama'
    },
    {
        title: 'Buuh, saya menemukan petunjuk 3',
        description: 'Petunjuk 4 dilindungi oleh pedang'
    },
    {
        title: 'Yey, Itu adalah petunjuk terakhir',
        description: 'Pintu surga telah terbuka, namun harus dikejar'
    },
    {
        title: 'Hore, dadaagh aku sudah bebas',
        description: 'SELAMAT, Arwah penasaran telah tenang'
    }
];

function showInfoModal(level) {
    level -= 1;
    document.querySelector('.info-modal').classList.remove('none');
    document.querySelector('.info-modal h3').innerText = levels[level].title;
    document.querySelector('.info-modal p').innerText = levels[level].description;
}

document.querySelector('.play-button').addEventListener('click', () => {
    document.querySelector('.play-modal').classList.add('scroll-top');
    setTimeout(() => {
        showInfoModal(1);
    }, 500);
});


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);

const ghostImage = new Image();
ghostImage.src = 'img/hantu.png';

const ghostWidth = 2415;
const ghosttHeight = 5976;
const columns = 5;
const rows = 12;
const frameWidth = ghostWidth / columns;
const frameHeight = ghosttHeight / rows;
let currentFrame = 0;
let frameCount = columns * rows;
const animationSpeed = 30;
const scaleFactor = 0.1;

const heavenImage = new Image();
heavenImage.src = 'img/heaven.png';
let heavenX = 5; // X coordinate
let heavenY = 15; // Y coordinate
const heavenWidth = 100; // Width of the image
const heavenHeight = 100;
let heavenMove = 1;

let x = 5;
let y = 15;
let moveRightInterval, moveLeftInterval, moveDownInterval, moveUpInterval;
let heavenMoveRightInterval, heavenMoveLeftInterval, heavenMoveDownInterval, heavenMoveUpInterval;
let rightClick = false;
let leftClick = false;
let downClick = false;
let upClick = false;
let heavenRightClick = false;
let heavenLeftClick = false;
let heavemDownClick = false;
let heavenUpClick = false;

function drawGhost() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const column = currentFrame % columns;
    const row = Math.floor(currentFrame / columns);

    ctx.drawImage(
        ghostImage,
        column * frameWidth, row * frameHeight,
        frameWidth, frameHeight,
        x, y,
        frameWidth * scaleFactor, frameHeight * scaleFactor
    );

    currentFrame = (currentFrame + 1) % frameCount;
}

function drawHeaven() {
    ctx.drawImage(
        heavenImage,
        heavenX,
        heavenY,
        heavenWidth,
        heavenHeight
    );
}

function update() {
    if (level < 6) drawGhost();
    if (level == 5) drawHeaven();
    setTimeout(update, animationSpeed);
}

ghostImage.onload = function () {
    update();
};

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.info-modal').classList.add('none');
    if (level == 6) {
        document.location.reload();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        if (!rightClick) {
            moveRightInterval = setInterval(moveRight, 1);
        }
    }
    if (event.key === 'ArrowLeft') {
        if (!leftClick) {
            leftClick = true;
            moveLeftInterval = setInterval(moveLeft, 1);
        }
    }
    if (event.key === 'ArrowDown') {
        if (!downClick) {
            downClick = true;
            moveDownInterval = setInterval(moveDown, 1);
        }
    }
    if (event.key === 'ArrowUp') {
        if (!upClick) {
            upClick = true;
            moveUpInterval = setInterval(moveUp, 1);
        }
    }
    if (event.key === ' ') {
        rightClick = false;
        leftClick = false;
        downClick = false;
        upClick = false;
        clearInterval(moveRightInterval);
        clearInterval(moveLeftInterval);
        clearInterval(moveDownInterval);
        clearInterval(moveUpInterval);
    }

    if (event.key === 'Enter') {
        if (level == 1 && ((x >= 80 && x <= 110) && (y > 400 && y < 480))) {
            level += 1;
            showInfoModal(level);
        }
        if (level == 2 && ((x >= 900 && x <= 950) && (y > 305 && y < 350))) {
            level += 1;
            showInfoModal(level);
        }
        if (level == 3 && ((x >= 4 && x <= 6) && (y > 50 && y < 70))) {
            level += 1;
            showInfoModal(level);
        }
        if (level == 4 && ((x >= 460 && x <= 500) && (y > 240 && y < 400))) {
            level += 1;
            showInfoModal(level);
        }
        if (level == 5 && ((x >= (heavenX - 50) && x <= (heavenX + 50)) && (y >= (heavenY - 50) && y <= (heavenY + 50)))) {
            level += 1;
            showInfoModal(level);
        }

        if(level == 5){
            setInterval(() => {
                console.log('HEAVEN', heavenX, heavenY);
                heavenMove = Math.floor(Math.random() * 4) + 1;
            
                if (heavenMove == 1) {
                    if (!hevenRightClick) {
                        heavenMoveRightInterval = setInterval(heavenMoveRight, 1);
                    }
                }
                if (heavenMove == 2) {
                    if (!heavenLeftClick) {
                        heavenLeftClick = true;
                        heavenMoveLeftInterval = setInterval(heavenMoveLeft, 1);
                    }
                }
                if (heavenMove == 3) {
                    if (!heavemDownClick) {
                        heavemDownClick = true;
                        heavenMoveDownInterval = setInterval(heavenMoveDown, 1);
                    }
                }
                if (heavenMove == 4) {
                    if (!heavenUpClick) {
                        heavenUpClick = true;
                        heavenMoveUpInterval = setInterval(heavenMoveUp, 1);
                    }
                }
            
                if (heavenMove == 1) {
                    hevenRightClick = true;
                    heavenLeftClick = false;
                    clearInterval(moveLeftInterval);
                }
                if (heavenMove == 2) {
                    heavenLeftClick = true;
                    hevenRightClick = false;
                    clearInterval(moveRightInterval);
                }
                if (heavenMove == 3) {
                    heavemDownClick = true;
                    heavenUpClick = false;
                    clearInterval(moveUpInterval);
                }
                if (heavenMove == 4) {
                    heavenUpClick = true;
                    heavemDownClick = false;
                    clearInterval(moveDownInterval);
                }
            }, 1000);
        }
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowRight') {
        rightClick = true;
        leftClick = false;
        clearInterval(moveLeftInterval);
    }
    if (event.key === 'ArrowLeft') {
        leftClick = true;
        rightClick = false;
        clearInterval(moveRightInterval);
    }
    if (event.key === 'ArrowDown') {
        downClick = true;
        upClick = false;
        clearInterval(moveUpInterval);
    }
    if (event.key === 'ArrowUp') {
        upClick = true;
        downClick = false;
        clearInterval(moveDownInterval);
    }
});



function moveRight() {
    if (x > 960 || ((x > 390 && x < 391) && y < 160)) {
        clearInterval(moveRightInterval);
        rightClick = false;
    } else {
        leftClick = false;
        x += 0.5;
    }
}

function moveLeft() {
    if (x < 5 || ((x > 574 && x < 575) && y < 160)) {
        clearInterval(moveLeftInterval);
        leftClick = false;
    } else {
        rightClick = false;
        x -= 0.5;
    }
}

function moveDown() {
    if (y < 535) {
        upClick = false;
        y += 0.5;
    } else {
        clearInterval(moveDownInterval);
        downClick = false;
    }
}

function moveUp() {
    if (y < 15 || ((x > 410 && x < 550) && (y > 160 && y < 161))) {
        clearInterval(moveUpInterval);
        upClick = false;
    } else {
        downClick = false;
        y -= 0.5;
    }
}

function heavenMoveRight() {
    if (heavenX > 900 || ((heavenX > 390 && heavenX < 391) && heavenY < 160)) {
        clearInterval(heavenMoveRightInterval);
        hevenRightClick = false;
    } else {
        heavenLeftClick = false;
        heavenX += 1;
    }
}

function heavenMoveLeft() {
    if (heavenX < 5 || ((heavenX > 574 && heavenX < 575) && heavenY < 160)) {
        clearInterval(heavenMoveLeftInterval);
        heavenLeftClick = false;
    } else {
        hevenRightClick = false;
        heavenX -= 1;
    }
}

function heavenMoveDown() {
    if (heavenY < 500) {
        heavenUpClick = false;
        heavenY += 1;
    } else {
        clearInterval(heavenMoveDownInterval);
        heavenDownClick = false;
    }
}

function heavenMoveUp() {
    if (heavenY < 15 || ((x > 410 && x < 550) && (heavenY > 160 && heavenY < 161))) {
        clearInterval(heavenMoveUpInterval);
        heavenUpClick = false;
    } else {
        heavenDownClick = false;
        heavenY -= 1;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const audioButton = document.querySelector("#sound-control");
    const backgroundAudio = document.querySelector("#background-music");
    backgroundAudio.play();

    audioButton.addEventListener("click", function () {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
            audioButton.setAttribute('src', 'img/sound_on.png');
        } else {
            backgroundAudio.pause();
            audioButton.setAttribute('src', 'img/sound_off.png');
        }
    });
});


setInterval(() => {
    function isSmartphone() {
        var smartphoneRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;

        var userAgent = navigator.userAgent;

        return smartphoneRegex.test(userAgent);
    }

    if (isSmartphone()) {
        document.querySelector('.disable-modal').classList.remove('none');
        document.querySelector('main').classList.add('none');
    } else {
        document.querySelector('.disable-modal').classList.add('none');
        document.querySelector('main').classList.remove('none');
    }

}, 100);