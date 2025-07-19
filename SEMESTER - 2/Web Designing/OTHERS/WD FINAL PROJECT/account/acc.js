function hamburgerMenu() {
    var x = document.getElementById("navh");
    if (x.className === "navh") {
      x.className = "navs";
    } else {
      x.className = "navh";
    }
  }
class User{
  constructor(name,pass){
    this.name = name;
    this.pass = pass;
  }
}

$(".create").on("click",function(){
  $(".login").hide(200,"swing",function(){$(".bgb").animate({top: '+=10%'})});
  $(".content").animate({top: "-=46%"})
  $(".cret").show(1000)
});

$(".lo").on("click",function(){
  $(".cret").hide(200,"swing",function(){$(".bgb").animate({top: '-=10%'})});
  $(".content").animate({top: "+=46%"})
  $(".login").show(1000)
});

function validateIsNotEmpty(){
  var username = document.getElementById("usernamel").value;
  var password = document.getElementById("passl").value;
  if(username == "" || password == ""){
    alert("Please fill all fields");
  }else{
    var users = JSON.parse(localStorage.getItem("users"));
    if(users == null){
      alert("No accounts found");
      return false;
    }
    var flag = 0;
    for(var i = 0; i < users.length; i++){
      if(users[i].name == username && users[i].pass == password){
        flag = 1;
        break;
      }
    }
    if(flag == 1){
      window.open("../home/home.html");
      return true;
    }else{
      alert("Invalid username or password");
      return false;
    }
  }

}

function save(){
  var username = document.getElementById("userc").value;
  var password = document.getElementById("passc").value;
  if(username == "" || password == ""){
    alert("Please fill all fields");
    Event.preventDefault();
    return false;
  }
  else{
    var user = new User(username,password);
    var users = JSON.parse(localStorage.getItem("users"));
    if(users == null){
      users = [];
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    alert("Account created successfully");
    $(".cret").hide(200,"swing",function(){$(".bgb").animate({top: '-=10%'})});
    $(".content").animate({top: "+=46%"})
    $(".login").show(1000)
  }
}


$("#vpassc").on("input",function(){
  var passc = document.getElementById("passc");
  var vpassc = document.getElementById("vpassc");
  if(passc.value != vpassc.value){
    vpassc.setCustomValidity("Passwords Don't Match");
    vpassc.reportValidity();
  } else{
    vpassc.setCustomValidity("");
    vpassc.reportValidity();
  }
});