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
const qlEditorDiv = document.querySelector(".ql-editor");

post_button.addEventListener("click", async function () {
  // パラメータを取得
  const { userName, userId } = getParameters();

  // パラメータが存在するかチェック
  if (userName && userId) {
    // パラメータが存在する場合の処理
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

    var selectedOptions = [];
    var selectElement = document.getElementById("question_tag");

    // 選択されたオプションを取得
    for (var i = 0; i < selectElement.options.length; i++) {
      if (selectElement.options[i].selected) {
        selectedOptions.push(selectElement.options[i].text);
      }
    }
    // '未回答' タグを選択されたオプションに追加
    selectedOptions.push("未回答");
    // ql-editorの直下にある全てのタグの情報を取得
    const tagsInfo = [];

    qlEditorDiv.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // ノードが要素ノードである場合
        const tagInfo = {
          tagName: node.tagName.toLowerCase(), // タグ名を小文字で取得
          content: node.innerHTML, // タグの中のHTMLコンテンツを取得
        };
        tagsInfo.push(tagInfo);
      }
    });

    const postContent = {
      UserID: userId,
      Format: format_content.value,
      Content: tagsInfo,
      PostDay: formattedDateTime,
      Tag: selectedOptions.join(", "),
      Title: title_content.value,
      UserName: userName,
    };

    // 新しいPostドキュメントを追加し、ドキュメントIDを取得
    const postDocRef = await post_register.add(postContent);
    const postDocId = postDocRef.id;

    // 対応するドキュメントのUserIDを更新
    await post_register.doc(postDocId).update({
      UserID: postDocId, // ドキュメントIDをuserIDとして使用
    });
    console.log("Postが追加されました。");
    window.location.href = `./../T-CHAT-Home.html?UserName=${userName}&UserID=${userId}`;
  } else {
    // パラメータが存在しない場合の処理
    alert("本当にログインしましたか？");
  }
});

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

function getParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("UserName");
  const userId = urlParams.get("UserID");
  return { userName, userId };
}

document.querySelector(".logo").addEventListener("click", function () {
  const { userName, userId } = getParameters();
  if (userName !== null && userId !== null) {
    window.location.href = `./../T-CHAT-Home.html?UserName=${userName}&UserID=${userId}`;
  } else {
    // パラメータが不適切な場合は、遷移せずにユーザーに通知するなどの処理を行う
    console.log("ユーザー名またはユーザーIDのパラメータが不足しています。");
  }
});
