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
// URLからタグ名を取得する関数
function getTagFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("tag");
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

function getData(postCollection, selectedTag) {
  var add_element = document.getElementById("add-element");
  // 既存の要素をクリア
  add_element.innerHTML = "";

  postCollection
    .get()
    .then((doc) => {
      let addData = "";
      doc.forEach((docData) => {
        const tags = docData.data().Tag.split(",");
        // タグが指定されている場合、一致するもののみ表示
        if (!selectedTag || tags.includes(selectedTag)) {
          addData += `<div class="box1">`;
          addData += `<section>`;
          addData += `<h3>${docData.data().UserName}</h3>`;
          addData += `<h1>投稿日:${docData.data().PostDay}</h1>`;
          const existingParams = new URLSearchParams(window.location.search);
          if (!existingParams.has("PostID")) {
            existingParams.append("PostID", docData.id);
          }
          const detailLink = `T-CHAT-Detail/T-CHAT-Temp.html?${existingParams.toString()}`;
          addData += `<a href="${detailLink}" class="article"> <article>${
            docData.data().Title
          }</article> </a>`;
          tags.forEach((tag, index) => {
            addData += `<span class="article-category">${tag.trim()}</span>`;
            if (index < tags.length - 1) {
              addData += " ";
            }
          });
          addData += `</section>`;
          addData += `</div>`;
        }
      });
      // 既存の要素をクリア
      add_element.innerHTML = addData;
      setTagClickEvent();
    })
    .catch((error) => {
      console.log("データ取得失敗:", error);
    });
}

function setTagClickEvent() {
  const tagElements = document.querySelectorAll(".article-category");

  tagElements.forEach((tagElement) => {
    tagElement.addEventListener("click", function (event) {
      const clickedTag = event.target.textContent.trim();
      console.log("Clicked Tag:", clickedTag);
      const currentURL = window.location.href;
      const updatedURL = updateQueryStringParameter(
        currentURL,
        "tag",
        clickedTag
      );
      window.location.href = updatedURL;

      const tag = getTagFromURL();
      console.log("Tag:", tag);
      if (tag) {
        getData(post, tag);
      } else {
        getData(post);
      }
    });
  });
}

window.onload = function () {
  setTagClickEvent();
  // 最初の読み込み時にデータを取得
  const tag = getTagFromURL();
  console.log("Tag:", tag);
  if (tag) {
    getData(post, tag);
  } else {
    getData(post);
  }
};

function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
