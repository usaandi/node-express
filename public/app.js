let word = document.getElementById("word");
let xhr = new XMLHttpRequest();
let score = document.getElementById("score");
let submit = document.getElementById("submit");

submit.addEventListener("click", log);
//Katsetus niisama
function log() {
  let submitGet = "/add/" + word.value + "/" + score.value;
  fetch(submit,{
      method:"POST",
      body: JSON.stringify({

      })
  })
  xhr.open("GET", submitGet);
  xhr.send();
}
