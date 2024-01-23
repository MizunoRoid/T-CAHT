function showModal() {
  var overlay = document.getElementById("overlay");
  var modal = document.getElementById("modal");

  overlay.style.display = "block";
  modal.style.display = "flex";
}

function closeModal() {
  var overlay = document.getElementById("overlay");
  var modal = document.getElementById("modal");

  overlay.style.display = "none";
  modal.style.display = "none";
}

function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, `\\$&`);
  var regex = new RegExp(`[?&]` + name + `(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, ` `));
}

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

const db = firebase.firestore();
const search_button = document.getElementById("search_button");
const post_button = document.getElementById("post_button");
const post = db.collection("Post");

getData();

search_button.addEventListener("click", function () {
  let result = document.getElementById("search_text");
  location.href = `./`;
  result.value = "";
});

post_button.addEventListener("click", function (event) {
  // 特定のパラメータ名
  const targetParameter1 = "UserName";
  const targetParameter2 = "UserID";

  // URLからパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);

  // 特定のパラメータが存在しない場合、アラートを表示
  if (!urlParams.has(targetParameter1) || !urlParams.has(targetParameter2)) {
    alert("ログインしてください");
    // デフォルトのイベントをキャンセルして遷移を防止
    event.preventDefault();
  } else {
    const userName = urlParams.get(targetParameter1);
    const userId = urlParams.get(targetParameter2);
    window.location.href = `./T-CHAT-Post/T-CHAT-Post.html?UserName=${userName}&UserID=${userId}`;
  }
});

function getData() {
  post
    .get()
    .then((doc) => {
      let addData = "";
      doc.forEach((docData) => {
        addData += `<div class="box1">`;
        addData += `<section>`;
        addData += `<h3>${docData.data().UserName}</h3>`;
        addData += `<h1>投稿日:${docData.data().PostDay}</h1>`;
        // 既存のパラメータを取得
        const existingParams = new URLSearchParams(window.location.search);
        // 既存のパラメータにPostIDが含まれていない場合に追加
        if (!existingParams.has("PostID")) {
          existingParams.append("PostID", docData.id);
        }
        // Detail.htmlへのリンク
        const detailLink = `T-CHAT-Detail/T-CHAT-Temp.html?${existingParams.toString()}`;
        addData += `<a href="${detailLink}" class="article"> <article>${
          docData.data().Title
        }</article> </a>`;
        // タグを区切り文字「,」で分割
        const tags = docData.data().Tag.split(",");
        // 各タグに対してHTML要素を生成
        tags.forEach((tag, index) => {
          addData += `<span class="article-category">${tag.trim()}</span>`;
          if (index < tags.length - 1) {
            addData += " "; // ここで適切なスペースを追加する
          }
        });
        addData += `</section>`;
        addData += `</div>`;
      });
      var add_element = document.getElementById("add-element");
      add_element.innerHTML += addData;
    })
    .catch((error) => {
      console.log("データ取得失敗:", error);
    });
}
