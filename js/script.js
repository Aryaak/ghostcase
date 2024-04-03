let level = 1;
let start = false;

const levels = [{
        title: 'Aku harus menemukan petunjuk 1',
        description: 'Petunjuk 1 berada pada sebuah tempat duduk'
    },
    {
        title: 'Wuih, aku menemukan petunjuk 1',
        description: 'Petunjuk 2 berada di rak, tetapi bukan sebuah buku'
    },
    {
        title: 'Keren, aku menemukan petunjuk 2',
        description: 'Petunjuk 3 berada di sesuatu yang menyala pertama'
    },
    {
        title: 'Buuh, aku menemukan petunjuk 3',
        description: 'Petunjuk 4 dilindungi oleh pedang'
    },
    {
        title: 'Yey, Itu adalah petunjuk terakhir',
        description: 'Jawab teka-teki untuk keluar dari perpustakaan'
    },
    {
        title: 'Selamat jawaban kamu benar',
        description: 'Laura kini sudah bebas dari perpustakaan'
    },
];

const wrong = [
    'Tidak ada apa-apa disini',
    'Sepertinya aku salah tempat',
    'Hmmmm',
    'Kok kosong yaaah',
    'Aku salah tempat deh',
    'Bukan disini sepertinya',
    'Tidak ada petunjuk disini',
    'Dimana ya petunjuknya',
    'Aku salah lokasi kayanya',
    'Buuuh'
];

const questions = [{
        question: 'Kamu memakanku mulai dari merah, tapi berhenti saat hijau. Siapa aku?',
        answer: 'Semangka'
    },
    {
        question: 'Aku tinggi ketika masih muda, dan pendek ketika sudah tua. Siapa aku?',
        answer: 'Lilin'
    },
    {
        question: 'Aku memiliki kepala dan ekor yang tidak pernah bertemu. Siapa aku?',
        answer: 'Koin'
    },
    {
        question: 'Aku bercukur setiap hari, tetapi janggutku tetap sama. Siapa aku?',
        answer: 'Tukang Cukur'
    },
    {
        question: 'Aku memiliki cabang, tetapi tidak punya buah, batang, atau daun. Siapa aku?',
        answer: 'Bank'
    },
]

const tekaTeki = questions[(Math.floor(Math.random() * questions.length) + 1) - 1];

function showLevelModal(level) {
    level -= 1;

    document.querySelector('.level-modal').classList.remove('none');
    document.querySelector('.level-modal h3').innerText = levels[level].title;
    document.querySelector('.level-modal p').innerText = levels[level].description;

}

document.querySelector('.play-button').addEventListener('click', () => {
    start = true;
    const timerInterval = setInterval(updateTimer, 1000);

    const countdownDuration = 5;

    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + countdownDuration);

    function updateTimer() {
        const currentTime = new Date();
        const timeDifference = endTime - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = '';
            document.querySelector('.fail-modal').classList.remove('none');
        } else {
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            document.getElementById('timer').innerHTML = `${minutes}:${seconds}`;
        }
    }

    document.querySelector('.play-modal').classList.add('scroll-top');
    setTimeout(() => {
        showLevelModal(1);
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

    ctx.drawImage(
        ghostImage,
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

ghostImage.onload = function () {
    update();
};

var closes = document.querySelectorAll('.close');

closes.forEach(function (element) {
    element.addEventListener('click', function () {
        document.querySelector('.level-modal').classList.add('none');
        document.querySelector('.info-modal').classList.add('none');

        if (level == 5) {
            document.querySelector('.question-modal').classList.remove('none');
            document.querySelector('.question-modal h3').innerText = 'Teka-Teki';
            document.querySelector('.question-modal p').innerText = tekaTeki.question;
        }

        if (level > 5 || !document.querySelector('.fail-modal').classList.contains('none')) {
            window.location.reload();
        }
    });
});

document.addEventListener('keydown', function (event) {
    if (!start) return false;

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
            showLevelModal(level);
        } else if (level == 2 && ((x >= 900 && x <= 950) && (y > 305 && y < 350))) {
            level += 1;
            showLevelModal(level);
        } else if (level == 3 && ((x >= 4 && x <= 6) && (y > 50 && y < 70))) {
            level += 1;
            showLevelModal(level);
        } else if (level == 4 && ((x >= 460 && x <= 500) && (y > 240 && y < 400))) {
            level += 1;
            showLevelModal(level);
        } else if (level == 5 && document.querySelector('input').value.toLowerCase() == tekaTeki.answer.toLowerCase()) {
            level += 1;
            document.querySelector('.question-modal').classList.add('none');
            showLevelModal(level);
        } else {
            if (level < 5) {
                Toastify({
                    text: wrong[(Math.floor(Math.random() * wrong.length) + 1) - 1],
                    className: "info",
                    position: "center",
                    style: {
                        background: "#856359",
                    }
                }).showToast();
            }
            if (level == 5) {
                document.querySelector('input').classList.add('input-wrong');

                setTimeout(() => {
                    document.querySelector('input').classList.remove('input-wrong');
                }, 500);
            }

        }

    }
});



document.addEventListener('keyup', function (event) {
    if (!start) return false;

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

    const infoButton = document.querySelector("#info-control");

    infoButton.addEventListener("click", function () {
        document.querySelector('.info-modal').classList.toggle('none');
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