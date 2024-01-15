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
  // 現在日時を取得
  var now = new Date();
  // 日付をフォーマット
  var year = now.getFullYear();
  var month = padZero(now.getMonth() + 1); // 月は0-indexedなので+1する
  var day = padZero(now.getDate());

  // 時刻をフォーマット
  var hours = padZero(now.getHours());
  var minutes = padZero(now.getMinutes());
  var seconds = padZero(now.getSeconds());

  // 結果をHTMLに表示
  var formattedDateTime =
    year +
    "/" +
    month +
    "/" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const postContent = {
    UserID: "", // 一旦空の状態で追加します
    AnswerNum: 0,
    Format: format_content.value,
    Image: "",
    PostDay: formattedDateTime,
    Tag: question_tag_content.value,
    Title: title_content.value,
    UserName: "",
  };

  // 新しいPostドキュメントを追加し、対応するUserIDを設定
  const postDocRef = await post_register.add(postContent);
  const userId = postDocRef.id;

  // 対応するドキュメントのUserIDを更新
  await postDocRef.update({
    UserID: userId,
  });

  console.log("Postが追加されました。");
});

function padZero(num) {
  return num < 10 ? "0" + num : num;
}
