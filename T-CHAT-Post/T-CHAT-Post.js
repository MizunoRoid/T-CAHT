var tooltipTimer;
var tooltipVisible = false;

function showTooltip(text, event) {
  clearTimeout(tooltipTimer);
  var tooltip = event.currentTarget.querySelector(".tooltip"); // Get the tooltip element within the current target
  tooltip.children[0].textContent = text; // Change only the text content
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = 1;
  tooltipVisible = true;
}

function hideTooltip(event) {
  tooltipTimer = setTimeout(function () {
    var tooltip = event.currentTarget.querySelector(".tooltip"); // Get the tooltip element within the current target
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
    tooltipVisible = false;
  }, 200);
}

function handleTooltipMouseLeave(event) {
  if (tooltipVisible) {
    hideTooltip(event);
  }
}

function openModal() {
  // モーダルウィンドウが閉じられた際にもツールチップを非表示にする
  var tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach(function (tooltip) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
  });
  tooltipVisible = false;

  // その他の closeModal の処理を追加...

  // モーダルウィンドウが閉じられた際の処理を追加
  // 例えば、モーダルウィンドウのスタイルを変更するなど
}
function closeModal() {
  // モーダルウィンドウが閉じられた際にもツールチップを非表示にする
  var tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach(function (tooltip) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
  });
  tooltipVisible = false;

  // その他の closeModal の処理を追加...
}

// ここからモーダルウィンドウのjs
function previewPhotos() {
  var modal = document.getElementById("myModal");
  var input = document.getElementById("photoInput");
  var previewContainer = document.getElementById("previewContainer");

  // プレビューをクリア
  previewContainer.innerHTML = "";

  if (input.files && input.files.length > 0) {
    for (var i = 0; i < input.files.length; i++) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("loaded");
        previewContainer.appendChild(img);
      };

      reader.readAsDataURL(input.files[i]);
    }

    modal.classList.add("fade-in");
    modal.style.display = "block";

    setTimeout(function () {
      var previewImages = document.querySelectorAll(".modal-content img");
      previewImages.forEach(function (image) {
        image.classList.add("loaded");
      });
    }, 100);
  }
}

function closeModal() {
  var modal = document.getElementById("myModal");
  var previewContainer = document.getElementById("previewContainer");

  modal.classList.add("fade-out");

  // フェードアウトのトリガーを追加し、アニメーション後にモーダルを非表示にする
  setTimeout(function () {
    modal.style.display = "none";
    modal.classList.remove("fade-out");

    // モーダルを閉じたらプレビューをクリア
    previewContainer.innerHTML = "";
  }, 400);
}
// ここまでがモーダルウィンドウのjs

const save_button = document.getElementById("save");

save_button.addEventListener("click", async function () {});
// ここのツールバーはカスタムできます。
var toolbarOptions = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline"], // toggled buttons
  /* [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown　*/
  ["blockquote"],
  ["image"],
  [{ list: "ordered" }, { list: "bullet" }], // superscript/subscript
  [{ align: [] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  /* ['clean']                                         // remove formatting button*/
];

const editor = new Quill("#editor_area", {
  bounds: "#edito",
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder:
    "ここに質問したいことを記載してください\n例）\nFirebaseのデータベースを使用してログイン画面を作っています。\nその途中で問題が発生しました。その問題とはFirebaseの構成が理解出来ないんですよ～、\nなんで教えてほしいですね～。",

  theme: "snow",
});

// ここのツールバーはカスタムできます。
var toolbarOptions = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline"], // toggled buttons
  /* [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown　*/
  ["blockquote"],
  ["image"],
  [{ list: "ordered" }, { list: "bullet" }], // superscript/subscript
  [{ align: [] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  /* ['clean']                                         // remove formatting button*/
];

var firebaseConfig = {
  apiKey: "AIzaSyARxI5dZXILhMkMDTDE5MyK88yJlCh-A_Y",
  authDomain: "t-chat-d4c62.firebaseapp.com",
  projectId: "t-chat-d4c62",
  storageBucket: "t-chat-d4c62.appspot.com",
  messagingSenderId: "276479107458",
  appId: "1:276479107458:web:329742b4d052a975d16f9b",
  measurementId: "G-WPZGDY4H0F",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const user_register = firestore.collection("UserRegister");
const post_register = firestore.collection("Post");
const format_content = document.getElementById("format");
const title_content = document.getElementById("title");
const post_button = document.getElementById("post");
const question_tag_content = document.getElementById("question_tag");
const textarea_content = document.getElementById("textarea");
post_button.addEventListener("click", async function () {
  const postContent = {
    Title: title_content,
    Content: textarea_content,
    Format: format_content,
  };
});
