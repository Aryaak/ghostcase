document.querySelector('.play-button').addEventListener('click', () => {
    document.querySelector('.play-modal').classList.add('scroll-top');
});


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);

const spriteImage = new Image();
spriteImage.src = 'img/hantu.png';

const spriteWidth = 2415;
const spriteHeight = 5976;
const columns = 5;
const rows = 12;
const frameWidth = spriteWidth / columns;
const frameHeight = spriteHeight / rows;
let currentFrame = 0;
let frameCount = columns * rows;
const animationSpeed = 30;
const scaleFactor = 0.1;

let x = 5;
let y = 15;
let moveRightInterval, moveLeftInterval, moveDownInterval, moveUpInterval;
let rightClick = false;
let leftClick = false;
let downClick = false;
let upClick = false;

function drawGhost() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const column = currentFrame % columns;
    const row = Math.floor(currentFrame / columns);

    console.log(x, y);


    ctx.drawImage(
        spriteImage,
        column * frameWidth, row * frameHeight,
        frameWidth, frameHeight,
        x, y,
        frameWidth * scaleFactor, frameHeight * scaleFactor
    );

    currentFrame = (currentFrame + 1) % frameCount;
}

function update() {
    drawGhost();
    setTimeout(update, animationSpeed);
}

spriteImage.onload = function () {
    update();
};

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
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowRight') {
        rightClick = true;
        leftClick = false;
        clearInterval(moveLeftInterval);
    }
    if (event.key === 'ArrowLeft') {
        leftClick =true;
        rightClick = false;
        clearInterval(moveRightInterval);
    }
    if (event.key === 'ArrowDown') {
        upClick = false;
        clearInterval(moveUpInterval);
    }
    if (event.key === 'ArrowUp') {
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
    if (x <5 || ((x > 574 && x < 575) && y < 160)) {
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