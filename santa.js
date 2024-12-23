addEventListener("DOMContentLoaded", (event) => {
  (function() {

    var COUNT = 300;
    var masthead = document.querySelector('.sky');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = masthead.clientWidth;
    var height = masthead.clientHeight;
    var i = 0;
    var active = false;

    function onResize() {
      width = masthead.clientWidth;
      height = masthead.clientHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#FFF';

      var wasActive = active;
      active = width > 600;

      if (!wasActive && active)
        requestAnimFrame(update);
    }

    var Snowflake = function() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
      this.r = 0;

      this.reset();
    }

    Snowflake.prototype.reset = function() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.vy = 1 + Math.random() * 3;
      this.vx = 0.5 - Math.random();
      this.r = 1 + Math.random() * 2;
      this.o = 0.5 + Math.random() * 0.5;
    }

    canvas.style.position = 'absolute';
    canvas.style.left = canvas.style.top = '0';

    var snowflakes = [],
      snowflake;
    for (i = 0; i < COUNT; i++) {
      snowflake = new Snowflake();
      snowflake.reset();
      snowflakes.push(snowflake);
    }

    function update() {

      ctx.clearRect(0, 0, width, height);

      if (!active)
        return;

      for (i = 0; i < COUNT; i++) {
        snowflake = snowflakes[i];
        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;

        ctx.globalAlpha = snowflake.o;
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        if (snowflake.y > height) {
          snowflake.reset();
        }
      }

      requestAnimFrame(update);
    }
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    onResize();
    window.addEventListener('resize', onResize, false);

    masthead.appendChild(canvas);
  })();
  let audio = new Audio('https://dl.dropboxusercontent.com/scl/fi/cb8hgqibl718mich3oui4/Christmas-Snow-Long-Version-chosic.com_.mp3?rlkey=zdsvaljo5e0jx40by2unaufd5&e=1&st=0d93145q&dl=0');
  function playAudio(play){
      if(play == 1) {
        audio.play();
        audio.onended = function() {
          setTimeout(()=>audio.play(), 1)
        };
      } else {
        audio.pause();
      }
  }
  let penguinSpeech = [], speaking = false;;
  function penguinSpeaks(text,duration){
    if(!allowButtonActions) return
    let textbox = document.getElementById("chat")
    textbox.innerText = text;
    textbox.style.opacity = 1; //transition 500ms
    speaking = true;
    setTimeout(()=>{
      textbox.style.opacity = 0;
      speaking = false;
    }, duration+500) //ms
  }
  function addQueue(text, duration){
    penguinSpeech.push({
      t: text,
      d: duration
    });
  }
  function managePenguinSpeech(){
    let oldestReq = penguinSpeech[0]
    if(textbox.style.opacity == 0 && !speaking) {
      penguinSpeaks(oldestReq.t, oldestReq.d)
      penguinSpeech.shift()
    }
  }
  setInterval(()=>{
    managePenguinSpeech(); //loop idk if its gonna crash idk idk idk idk idk pls dont crash pls pl spl pls pls i beg 
  })
  function dowhatever(){
    addQueue("MERRY CHRISTMAS :D", 2500)
    addQueue("I have 3 presents for you >:3", 2500)
    addQueue("TAKE A LOOK :D", 2500)
  }
  let allowButtonActions = false;
  window.onload = function (){
    setTimeout(()=>{
      allowButtonActions = true;
      document.getElementById("button").style.opacity = 1
      document.getElementById("loader").style.opacity = 0
    },3000)
  }
  document.getElementById("button").onclick = function(){
    if(allowButtonActions) {
      playAudio(1)
      document.getElementById("load").style.opacity = 0
      setTimeout(()=>{
        document.getElementById("load").style.display = "none"
        dowhatever();
      }, 1500)
    }
  }
});
