const sonic = document.querySelector('.sonic')
const pipe = document.querySelector('.pipe')
let score = 0;

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./audio/metalgear.mp3')
audioGameOver = new Audio('./audio/gameover.mp3')

const updateScore = () => {
    document.getElementById('score').innerText = score;
};

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';

    // audio
    audioStart.play()

}

const restartGame = () => {
    score = 0; 
    updateScore(); 

    gameOver.style.display = 'none'
    pipe.style.left = ''
    pipe.style.right = '0'
    sonic.src = './imagens/sonic.gif';  
    sonic.style.width = '150px';       
    sonic.style.bottom = '0';

    start.style.display = 'none'

    audioGameOver.pause()
    audioGameOver.currentTime = 0;

    audioStart.play()
    audioStart.currentTime = 0;
}

const jump = () => {
    sonic.classList.add('jump')
    score++; 
    updateScore(); 
    setTimeout(() => {
        sonic.classList.remove('jump')
    }, 800)
}

function desenharLua() {
  var canvas = document.getElementById("luaCanvas");
  var ctx = canvas.getContext("2d");

  
  ctx.beginPath();
  ctx.arc(250, 250, 50, 0, 2 * Math.PI);

 
  var gradient = ctx.createRadialGradient(250, 250, 0, 250, 250, 50);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

function integrarLuaNoJogo() {
  desenharLua();
  console.log("Lua integrada ao jogo!");
}


window.onload = integrarLuaNoJogo

const loop = () => {
    setInterval(() => {
const pipePosition = pipe.offsetLeft
const sonicPosition = window.getComputedStyle(sonic).bottom.replace('px', ' ')

if (pipePosition <= 120 && pipePosition > 0 && sonicPosition < 80) {
      pipe.classList.remove('.pipe-animation');
      pipe.style.left = `${pipePosition}px`;
      sonic.classList.remove('.jump');
      sonic.style.bottom = `${sonicPosition}px`;

      sonic.src = './imagens/sonicdead.jpg';
      sonic.style.width = '80px';
      sonic.style.marginLeft = '50px';


      function stopAudioStart() {
          audioStart.pause()
      }
        stopAudioStart()

        audioGameOver.play()

        function stopAudio() {
        audioGameOver.pause()
        }
          setTimeout(stopAudio, 7000)

          gameOver.style.display = 'flex'

          clearInterval(loop)
        }
    }, 10)
}

loop()

document.addEventListener('keypress', e => {
    const tecla = e.key
    if (tecla === ' ') {
        jump()
    }
})

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump() 
    }
})

document.addEventListener('keypress', e => {
    const tecla = e.key
    if (tecla === 'Enter') {
        startGame()
    }
})
