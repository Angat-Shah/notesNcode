var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
function bih(img){
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
  modal.style.display = "none";
}

$(window).on('scroll',function() {
  if (window.scrollY < window.outerHeight-200) {
    $('#he').addClass('active')
  } else {
    $('#he').removeClass('active')
  }
})

$('#he').on('click',function() {
  $("html, body").animate({ scrollTop: 0 }, 500);
})

$('.main').on('click',function() {
  $("html, body").animate({ scrollTop: 0 }, 500);
})