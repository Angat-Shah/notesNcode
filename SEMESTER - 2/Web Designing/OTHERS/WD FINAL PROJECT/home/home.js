let bg = document.getElementById("bg");
let bgg = document.getElementById("bgg");
let colors = ["linear-gradient(60deg,#21004c,#a0a5ff)","linear-gradient(60deg,#380011,#ff7ecd)","linear-gradient(60deg,#273e00,#98ff86)"]
var current = 0;
var cmode = false;

class load {
  constructor() {
    this.rtl = {
      "transition-timing-function": "ease-in-out",
      "left": "50%",
      "top": "50%",
      "transform": "translate(-50%, -50%)"
    };
    this.ltr = {
      "transition-timing-function": "ease-in-out",
      "left": "50%",
      "top": "50%",
      "transform": "translate(-50%, -70%) rotateZ(10deg)",
      "animation": "hovering 4s infinite cubic-bezier(0.74, 0.06, 0.27, 0.95)"
    };
    this.ltrfs = {
      "transition-timing-function": "ease-in-out",
      "left": "35%",
      "top": "55%",
      "width": "26rem",
    }
    this.btt = {
      "transition-timing-function": "ease-in-out",
      "bottom": "0",
      "left": "50%",
      "transform": "translate(-50%,0) rotateX(0turn)",
      "opacity": "1"
    }
  }
}

class nextp {
  constructor() {
    this.ltr = {
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "left": "150svw"
    }
    this.rtl = {
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "left": "-200svw"
    }
    this.ttb = {
      "transition-duration": "1s",
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "bottom": "-100vh"
    }
  }
}

class backp {
  constructor() {
    this.rtl = {
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "left": "-40rem",
      "transform": "translate(0, -70%) rotateZ(60deg)",
    }
    this.ltr = {
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "left": "100%",
      "transform": "translate(0, -50%)"
    }
    this.ltrfs = {
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "left": "-40rem",
    }
    this.ttb = {
      "transition-timing-function": "cubic-bezier( 0.2, -0.1, 1, -0.07 )",
      "bottom": "-60svh",
      "transform": "translate(-50%,0) rotateX(0.5turn)",
      "opacity": "1"
    }
  }
}

class reload {
  constructor() {
    this.rtl = {
      "transition-timing-function": "ease-in-out",
      "left": "50%",
      "top": "50%",
      "transform": "translate(-50%, -50%)"
    };
    this.ltr = {
      "transition-timing-function": "ease-in-out",
      "left": "50%",
      "top": "50%",
      "transform": "translate(-50%, -70%) rotateZ(10deg)",
      "animation": "hovering 4s infinite cubic-bezier(0.74, 0.06, 0.27, 0.95)"
    };
    this.ltrfs = {
      "transition-timing-function": "ease-in-out",
      "left": "35%",
      "top": "55%",
      "width": "26rem",
    }
    this.btt = {
      "transition-timing-function": "ease-in-out",
      "bottom": "0",
      "left": "50%",
      "transform": "translate(-50%,0) rotateX(0turn)",
      "opacity": "1"
    }
  }
}

function hamburgerMenu() {
  this.x = document.getElementById("navh");
  if (x.className === "navh") {
    x.className = "navs";
  } else {
    x.className = "navh";
  }
}

document.getElementById("th").addEventListener("click", function(e) {
  e.preventDefault();
  if(cmode){
    cmode = false
    bg.style.background = "#000";
    document.getElementById("th").innerText = "THEME:B";
  }else{
    cmode = true
    bg.style.background = colors[current]
    document.getElementById("th").innerText = "THEME:C";
  }
});

function innnnn() {
  var l = new load();
  current = 0;
  bgg.style.display = "none";
  var div = document.getElementById("content0");
  Object.assign(div.childNodes[1].style, l.rtl);
  Object.assign(div.childNodes[3].style, l.ltr);
  Object.assign(div.childNodes[5].style, l.rtl);
  Object.assign(div.childNodes[7].style, l.ltrfs);
  Object.assign(div.childNodes[9].style, l.btt);
}

function next() {
  if ((current + 1) > 2) {
    return
  }
  var n = new nextp();
  var cu = document.getElementById("content" + current);
  Object.assign(cu.childNodes[1].style, n.rtl);
  Object.assign(cu.childNodes[3].style, n.ltr);
  Object.assign(cu.childNodes[5].style, n.rtl);
  Object.assign(cu.childNodes[7].style, n.ltr);
  Object.assign(cu.childNodes[9].style, n.ttb);
  if(cmode){
    setTimeout(() => {
      bgg.style.display = 'block'
    }, 500);
    setTimeout(() => {
      bg.style.background = colors[current]
    }, 700);
    setTimeout(() => {
      bgg.style.display = 'none'
    }, 1200);
  }
  var l = new load();
  current++;
  setTimeout(function () {
    var div = document.getElementById("content" + current);
    Object.assign(div.childNodes[1].style, l.rtl);
    Object.assign(div.childNodes[3].style, l.ltr);
    Object.assign(div.childNodes[5].style, l.rtl);
    Object.assign(div.childNodes[7].style, l.ltrfs);
    Object.assign(div.childNodes[9].style, l.btt);
  }, 1500);
}

function back() {
  if ((current - 1) < 0) {
    return
  }
  var b = new backp();
  var cu = document.getElementById("content" + current);
  Object.assign(cu.childNodes[1].style, b.ltr);
  Object.assign(cu.childNodes[3].style, b.rtl);
  Object.assign(cu.childNodes[5].style, b.ltr);
  Object.assign(cu.childNodes[7].style, b.ltrfs);
  Object.assign(cu.childNodes[9].style, b.ttb);
  if(cmode){
    setTimeout(() => {
      bgg.style.display = 'block'
    }, 500);
    setTimeout(() => {
      bg.style.background = colors[current]
    }, 700);
    setTimeout(() => {
      bgg.style.display = 'none'
    }, 1200);
  }
  var l = new reload();
  current--;
  setTimeout(function () {
    var div = document.getElementById("content" + current);
    Object.assign(div.childNodes[1].style, l.rtl);
    Object.assign(div.childNodes[3].style, l.ltr);
    Object.assign(div.childNodes[5].style, l.rtl);
    Object.assign(div.childNodes[7].style, l.ltrfs);
    Object.assign(div.childNodes[9].style, l.btt);
  }, 1500);
}

function checkKey(e) {

  e = e || window.event;

  if (e.keyCode == '37') {
    back();
  }
  else if (e.keyCode == '39') {
    next();
  }

}

function move(di) {
  var div_moving = document.getElementById(di.childNodes[1].childNodes[1].id);
  document.getElementById(di.id).addEventListener('mousemove', function (e) {
    let xPos = (e.clientX) % document.getElementById("arr").clientWidth;
    let yPos = (e.clientY) % document.getElementById("arr").clientHeight;
    var x = xPos - 20 + "px";
    var y = yPos - 20 + "px";
    var set = {
      "left": x,
      "top": y
    }
    Object.assign(div_moving.style, set);
  });

  document.getElementById(di.id).addEventListener('mouseleave', function (e) {
    var set = {
      "left": document.getElementById("arr").clientWidth / 4 + "px",
      "top": document.getElementById("arr").clientHeight / 4 + "px"
    }
    Object.assign(div_moving.style, set);
  });
}