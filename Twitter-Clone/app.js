let audience_btn = document.getElementById("audience_btn");
let show_bx_1 = document.getElementsByClassName("show_bx_1")[0];
audience_btn.addEventListener("click", () => {
  show_bx_1.classList.toggle("show_bx_active");
});
function auto_grow(e) {
  e.style.height = "5px";
  e.style.height = e.scrollHeight + "px";
}
const audience_check_off = () => {
  Array.from(document.getElementsByClassName("check_audience_i")).forEach(
    (i) => {
      i.style.color = "#fff";
    }
  );
};
Array.from(document.getElementsByClassName("check_audience")).forEach(
  (i, a) => {
    i.addEventListener("click", () => {
      audience_check_off();
      document.getElementsByClassName("check_audience_i")[a].style.color =
        "#1ca1f1";
      if (a === 0) {
        audience_btn.innerHTML = `Everyone <i class="fa-solid fa-angle-down">`;
        audience_btn.style.color = "#1ca1f1";
        audience_btn.style.borderColor = "1ca1f1";
      } else {
        audience_btn.innerHTML = `Twitter Circle <i class="fa-solid fa-angle-down">`;
        audience_btn.style.color = "green";
        audience_btn.style.borderColor = "green";
      }
      show_bx_1.classList.toggle("show_bx_active");
    });
  }
);
let select_reply_btn = document.getElementsByClassName("select_reply_btn")[0];
let who_can_reply_bx = document.getElementsByClassName("who_can_reply_bx")[0];
select_reply_btn.addEventListener("click", () => {
  who_can_reply_bx.classList.toggle("show_bx_active");
});
const who_can_reply_off = () => {
  Array.from(document.getElementsByClassName("who_can_reply_i")).forEach(
    (i) => {
      i.style.color = "#fff";
    }
  );
};
Array.from(document.getElementsByClassName("who_can_reply")).forEach((i, a) => {
  i.addEventListener("click", () => {
    who_can_reply_off();
    document.getElementsByClassName("who_can_reply_i")[a].style.color =
      "#1ca1f1";
    if (a === 0) {
      select_reply_btn.innerHTML = ` <i class="fa-solid fa-earth-asia"></i> Everyone Can reply`;
    } else if (a === 1) {
      select_reply_btn.innerHTML = ` <i class="fa-solid fa-user-check who_can_reply_i"></i> People you follow `;
    } else {
      select_reply_btn.innerHTML = ` <i style="font-style: normal;" >@</i> Only people you mention `;
    }
    who_can_reply_bx.classList.toggle("show_bx_active");
  });
});
let tweet_text_area = document.getElementById("tweet_text_area");
let tweet_post = document.getElementById("tweet_post");
let text_limit = document.getElementById("text_limit");
tweet_text_area.addEventListener("keyup", () => {
  if (tweet_text_area.value.length > 0) {
    tweet_post.style.background = "rgb(28,160,242)";
  } else {
    tweet_post.background = "rgb(28,160,242,.5)";
  }
  let a = tweet_text_area.value.length;
  let b = parseInt(a / 2);
  let c = 100 - b;
  text_limit.innerText = c + "%";
  if (c === 0) {
    text_limit.style.color = "red";
  } else {
    text_limit.style.color = "rgb(0,0,0,0.8)";
  }
});
// Edit functionality
function handleEditButtonClick(event) {
  const postCard = event.target.closest(".post_card_bx");
  const contentBox = postCard.querySelector(".content");
  const editButtons = contentBox.querySelector(".edit-delete-buttons");
  const tweetText = contentBox.querySelector("h3");

  const editTextArea = document.createElement("textarea");
  editTextArea.value = tweetText.textContent;
  editTextArea.classList.add("edit-textarea");

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.classList.add("update-button");
  updateButton.addEventListener("click", handleUpdateButtonClick);

  contentBox.replaceChild(editTextArea, tweetText);
  editButtons.replaceChild(updateButton, event.target);
}

// Update functionality
function handleUpdateButtonClick(event) {
  const postCard = event.target.closest(".post_card_bx");
  const contentBox = postCard.querySelector(".content");
  const editButtons = contentBox.querySelector(".edit-delete-buttons");
  const editTextArea = contentBox.querySelector(".edit-textarea");

  const tweetText = document.createElement("h3");
  tweetText.textContent = editTextArea.value;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", handleEditButtonClick);

  contentBox.replaceChild(tweetText, editTextArea);
  editButtons.replaceChild(editButton, event.target);
}

// Delete functionality
function handleDeleteButtonClick(event) {
  const postCard = event.target.closest(".post_card_bx");
  postCard.remove();
}

// Add event listeners for Edit buttons
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((editButton) => {
  editButton.addEventListener("click", handleEditButtonClick);
});

// Add event listeners for Delete buttons
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", handleDeleteButtonClick);
});
