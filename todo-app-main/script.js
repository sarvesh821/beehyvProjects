const img = document.querySelector("img");
const input = document.querySelector("input");
const list = document.querySelector(".list-items");

let chkbtn = document.querySelectorAll(".list-items");
const cnt_item = document.querySelector(".cnt");

const all_btn = document.querySelector(".all-btn");
const active_btn = document.querySelector(".active-btn");
const complete_btn = document.querySelector(".complete-btn");
const clear_btn = document.querySelector(".clear-btn");

img.addEventListener("click", () => {
  document.body.classList.toggle("theme-1");
  if (document.body.classList.contains("theme-1")) {
    img.src = "./images/icon-moon.svg";
  } else {
    img.src = "./images/icon-sun.svg";
  }
});

let counter = 0;

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && input.value != "") {
    list.innerHTML += `<div class="todo" id="active-status" >
   <div class="circle" style="pointer-events: none;" ></div>
    <p class="text" style="pointer-events: none;">${input.value}</p>
    <img class="cross" src="./images/icon-cross.svg" alt="">
  
 </div>`;
    input.value = "";
    chkbtn = document.querySelectorAll(".todo");

    ++counter;
    setChk();
    setCounter();
  }
});

function setChk() {
  chkbtn.forEach((chk) => {
    console.log(chk);
    chk.addEventListener("click", (e) => {
      if (e.target.tagName == "IMG") {
        list.removeChild(e.target.parentNode);
        if (e.target.parentNode.children[1].classList.length == 1) {
          --counter;
          setCounter();
        }
      } else {
        e.target.children[0].classList.toggle("chk-btn-color");
        e.target.children[1].classList.toggle("todo-done");
        e.target.id =
          e.target.id == "active-status" ? "complete-status" : "active-status";
        if (e.target.children[1].classList.length == 1) {
          e.target.children[0].innerHTML = "";
          counter++;
          setCounter();
        } else {
          e.target.children[0].innerHTML = `<img class="img-des" style="height:10px;"  src="./images/icon-check.svg" alt=""></img>`;
          counter--;
          setCounter();
        }
      }
    });
  });
}

function setCounter() {
  cnt_item.innerHTML = counter;
}
all_btn.addEventListener("click", () => {
  active_btn.classList.remove("active-color");
  all_btn.classList.add("active-color");
  complete_btn.classList.remove("active-color");
  for (let i = 0; i < list.children.length; i++) {
    let ele = list.children[i];
    ele.classList.remove("hide-item");
  }
});
active_btn.addEventListener("click", () => {
  active_btn.classList.add("active-color");
  all_btn.classList.remove("active-color");
  complete_btn.classList.remove("active-color");
  for (let i = 0; i < list.children.length; i++) {
    let ele = list.children[i];
    if (ele.id != "active-status") {
      ele.classList.add("hide-item");
    } else {
      ele.classList.remove("hide-item");
    }
  }
});
complete_btn.addEventListener("click", () => {
  active_btn.classList.remove("active-color");
  all_btn.classList.remove("active-color");
  complete_btn.classList.add("active-color");
  for (let i = 0; i < list.children.length; i++) {
    let ele = list.children[i];
    if (ele.id == "active-status") {
      ele.classList.add("hide-item");
    } else {
      ele.classList.remove("hide-item");
    }
  }
});
clear_btn.addEventListener("click", () => {
  let len = list.children.length;
  for (let i = len - 1; i >= 0; i--) {
    console.log(i);
    let ele = list.children[i];
    if (ele.id == "complete-status") {
      ele.remove();
    }
  }
});
