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
function getSearchWordFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("searchWord") || null;
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
const post_button = document.getElementById("post_button");
const searchTextInput = document.getElementById("search_text");
const searchButton = document.getElementById("search_button");

const post = db.collection("Post");

function clearSearchWordParameter() {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.delete("searchWord");
  window.history.replaceState({}, document.title, currentURL.toString());
}

function clearTagParameter() {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.delete("tag");
  window.history.replaceState({}, document.title, currentURL.toString());
}

searchButton.addEventListener("click", function (event) {
  clearTagParameter();
  const searchWord = searchTextInput.value.trim();
  console.log("Search Word:", searchWord);

  const currentURL = window.location.href;
  const updatedURL = updateQueryStringParameter(
    currentURL,
    "searchWord",
    searchWord
  );
  window.location.href = updatedURL;

  const tag = getTagFromURL();
  const searchWordFromURL = getSearchWordFromURL();
  console.log("Tag:", tag);
  console.log("Search Word from URL:", searchWordFromURL);

  if (tag) {
    getData(post, [tag], searchWordFromURL);
  } else {
    getData(post, null, searchWordFromURL);
  }
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

function getData(postCollection, selectedTags, searchWord) {
  var add_element = document.getElementById("add-element");
  // 既存の要素をクリア
  add_element.innerHTML = "";

  postCollection
    .get()
    .then((doc) => {
      let addData = "";
      doc.forEach((docData) => {
        const tags = docData
          .data()
          .Tag.split(",")
          .map((tag) => tag.trim());
        let boxClass = "";
        const titleContainsSearchWord =
          !searchWord || docData.data().Title.includes(searchWord);
        const tagsContainSearchWord = tags.some((tag) =>
          tag.includes(searchWord)
        );
        const tagsMatch =
          !selectedTags ||
          selectedTags.every((selectedTag) => tags.includes(selectedTag));

        if ((titleContainsSearchWord || tagsContainSearchWord) && tagsMatch) {
          const hasUnsolvedTag = tags.includes("未回答");
          const hasNotansweredTag = tags.includes("未解決");
          const hasAnsweredTag = tags.includes("解決");

          if (hasUnsolvedTag || hasNotansweredTag || hasAnsweredTag) {
            boxClass = hasUnsolvedTag
              ? "box1"
              : hasNotansweredTag
              ? "box2"
              : "box3";
          }

          addData += `<div class="${boxClass}">`;
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
            let articleCategoryClass = "";
            if (tag === "未回答" && hasUnsolvedTag) {
              articleCategoryClass = "unsolved-category";
            } else if (tag === "未解決" && hasNotansweredTag) {
              articleCategoryClass = "Notanswered-category";
            } else if (tag === "解決" && hasAnsweredTag) {
              articleCategoryClass = "answered-category";
            }

            addData += `<span class="article-category ${articleCategoryClass}">${tag}</span>`;

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

window.onload = async function () {
  setTagClickEvent();
  try {
    // Trend コレクションの参照
    const trendCollection = db.collection("Trend");

    // Trend コレクション内の全てのドキュメントを取得
    const trendDocs = await trendCollection.get();

    // ランキングデータの配列を初期化
    const rankingData = [];

    // 各ドキュメントに対して処理を行う
    trendDocs.forEach((doc) => {
      const tagName = doc.id; // ドキュメント名がタグを表す
      const viewCount = doc.data().View || 0; // View フィールドが存在しない場合は 0 として扱う
      rankingData.push({ tag: tagName, view: viewCount });
    });

    // View 数の降順でソート
    rankingData.sort((a, b) => b.view - a.view);

    // ランキング表示を構築
    displayRanking(rankingData);
  } catch (error) {
    console.error("Error fetching Trend data:", error);
  }

  const tag = getTagFromURL();
  const searchWordFromURL = getSearchWordFromURL();
  console.log("Tag:", tag);
  console.log("Search Word from URL:", searchWordFromURL);

  if (tag) {
    getData(post, [tag], searchWordFromURL);
  } else if (searchWordFromURL) {
    getData(post, null, searchWordFromURL);
  } else {
    getData(post);
  }
};

// ランキングの表示
function displayRanking(rankingData) {
  console.log("Displaying Trend Tags:", rankingData);
  const asideElement = document.querySelector("aside");
  if (!asideElement) {
    console.error("Element with tag 'aside' not found.");
    return;
  }

  // ヘッダーの追加
  const headElement = document.createElement("div");
  headElement.className = "item-list";
  headElement.innerHTML = `<div class="head">📈 Trend</div>`;
  asideElement.appendChild(headElement);

  // ランキングの表示
  rankingData.slice(0, 10).forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item-list";
    if (index < 3) {
      // 1~3位は画像を表示
      itemElement.innerHTML = `
      <h4>
        <img src="./T-CHAT-Image/no${index + 1}.png" />
      </h4>
      <div class="item">${item.tag}</div>
    `;
    } else {
      // 4位以降は順位を表示
      itemElement.innerHTML = `
      <div class="rank">${index + 1}</div>
      <div class="item">${item.tag}</div>
    `;
    }
    asideElement.appendChild(itemElement);
  });
}
// URLにパラメータを追加または更新する関数
function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

// 2つの配列が等しいかどうかを判定する関数
function areArraysEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function setTagClickEvent() {
  const tagElements = document.querySelectorAll(".article-category");

  tagElements.forEach((tagElement) => {
    tagElement.addEventListener("click", function (event) {
      clearSearchWordParameter();
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
      const searchWordFromURL = getSearchWordFromURL();
      console.log("Tag:", tag);
      console.log("Search Word from URL:", searchWordFromURL);

      if (tag) {
        getData(post, [tag], searchWordFromURL);
      } else {
        getData(post, null, searchWordFromURL);
      }
    });
  });
}
