

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
