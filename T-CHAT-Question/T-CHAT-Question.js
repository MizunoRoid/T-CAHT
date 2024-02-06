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

function getTagFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("tag");
}

function getSearchWordFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("searchWord") || null;
}

const post_button = document.getElementById("post_button");
const searchTextInput = document.getElementById("search_text");
const searchButton = document.getElementById("search_button");

const post = db.collection("Post");

function clearSearchWordParameter() {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.delete("searchWord");
  window.history.replaceState({}, document.title, currentURL.toString());
}

document.querySelector(".logo").addEventListener("click", function () {
  // 現在のURLからパラメータを取得する
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("UserName");
  const userId = urlParams.get("UserID");
  console.log(userName, userId);
  // パラメータが存在するかチェック
  if (userName && userId) {
    window.location.href = `./../T-CHAT-Home.html?UserName=${encodeURIComponent(
      userName
    )}&UserID=${encodeURIComponent(userId)}`;
  } else {
    window.location.href = `./../T-CHAT-Home.html`;
  }
});

document.querySelector(".home").addEventListener("click", function () {
  // 現在のURLからパラメータを取得する
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("UserName");
  const userId = urlParams.get("UserID");
  console.log(userName, userId);
  // パラメータが存在するかチェック
  if (userName && userId) {
    window.location.href = `./../T-CHAT-Home.html?UserName=${encodeURIComponent(
      userName
    )}&UserID=${encodeURIComponent(userId)}`;
  } else {
    window.location.href = `./../T-CHAT-Home.html`;
  }
});

document.querySelector(".question").addEventListener("click", function () {
  // 現在のURLからパラメータを取得する
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("UserName");
  const userId = urlParams.get("UserID");
  console.log(userName, userId);
  // パラメータが存在するかチェック
  if (userName && userId) {
    window.location.href = `T-CHAT-Question.html?UserName=${encodeURIComponent(
      userName
    )}&UserID=${encodeURIComponent(userId)}`;
  } else {
    window.location.href = `T-CHAT-Question.html`;
  }
});

searchButton.addEventListener("click", function (event) {
  const searchWord = searchTextInput.value.trim();
  console.log("Search Word:", searchWord);
  clearTagParameter();
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set("searchWord", searchWord);
  currentURL.searchParams.delete("tag"); // タグパラメータを削除
  window.location.href = currentURL.toString();
  const updatedURL = updateQueryStringParameter(
    currentURL,
    "searchWord",
    searchWord
  );
  window.location.href = updatedURL;
});

post_button.addEventListener("click", async function () {
  // 現在のURLからパラメータを取得する
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("UserName");
  const userId = urlParams.get("UserID");
  console.log(userName, userId);
  // パラメータが存在するかチェック
  if (userName && userId) {
    window.location.href = `./../T-CHAT-Post/T-CHAT-Post.html?UserName=${encodeURIComponent(
      userName
    )}&UserID=${encodeURIComponent(userId)}`;
  } else {
    // パラメータが存在しない場合は、遷移せずに何らかの通知や処理を行う
    alert("ログインしてください。");
  }
});

async function getData(postCollection, selectedTags, searchWord) {
  var add_element = document.getElementById("add-element");
  // 既存の要素をクリア
  add_element.innerHTML = "";

  try {
    const querySnapshot = await postCollection.get();
    let addData = "";
    for (const doc of querySnapshot.docs) {
      const postID = doc.id;
      const docData = doc.data();
      const answersSnapshot = await db
        .collection("Post")
        .doc(postID)
        .collection("Answers")
        .get();
      const answerCount = answersSnapshot.size; // 回答数を取得

      const tags = docData.Tag.split(",").map((tag) => tag.trim());
      let boxClass = "";
      const titleContainsSearchWord =
        !searchWord || docData.Title.includes(searchWord);
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
        addData += `<h3>${docData.UserName}</h3>`;
        addData += `<h1>投稿日:${docData.PostDay}</h1>`;
        const existingParams = new URLSearchParams(window.location.search);
        if (!existingParams.has("PostID")) {
          existingParams.append("PostID", postID);
        }
        const detailLink = `./../T-CHAT-Detail/T-CHAT-Temp.html?${existingParams.toString()}`;
        addData += `<a href="${detailLink}" class="article"> <article>${docData.Title}</article> </a>`;
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
        addData += `<span class="answers-num">回答数：${answerCount}件</span>`; // 回答数を表示
        addData += `</section>`;
        addData += `</div>`;
        // 既存の要素をクリア
      }
    }
    add_element.innerHTML = addData;
    setTagClickEvent();
  } catch (error) {
    console.log("データ取得失敗:", error);
  }
}

window.onload = async function () {
  setTagClickEvent();
  const tag = getTagFromURL();
  const searchWordFromURL = getSearchWordFromURL();

  if (tag) {
    getData(post, [tag], searchWordFromURL);
  } else if (searchWordFromURL) {
    getData(post, null, searchWordFromURL);
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

// 2つの配列が等しいかどうかを判定する関数
function areArraysEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function updateUrlParameterAndReload(key, value) {
  var currentURL = new URL(window.location.href);
  if (value) {
    currentURL.searchParams.set(key, value);
  } else {
    currentURL.searchParams.delete(key);
  }
  window.location.href = currentURL.toString();
}

async function initPage() {
  try {
    const tag = getTagFromURL();
    const searchWordFromURL = getSearchWordFromURL();

    let selectedTags = [];
    if (tag) {
      selectedTags = [tag];
    }

    await getData(post, selectedTags, searchWordFromURL); // データ取得処理
    document.getElementById("body").style.display = "block"; // データ取得後に表示
  } catch (error) {
    console.error("Error initializing page:", error);
  }
  document.getElementById("unsolved").addEventListener("click", function () {
    clearSearchWordParameter();
    updateUrlParameterAndReload("tag", "未回答");
  });
  document.getElementById("Notanswered").addEventListener("click", function () {
    clearSearchWordParameter();
    updateUrlParameterAndReload("tag", "未解決");
  });
  document.getElementById("answered").addEventListener("click", function () {
    clearSearchWordParameter();
    updateUrlParameterAndReload("tag", "解決");
  });
  document.getElementById("full").addEventListener("click", function () {
    clearSearchWordParameter();
    updateUrlParameterAndReload("tag", ""); // URLからtagパラメータを削除して全て表示
  });
}

document.addEventListener("DOMContentLoaded", initPage);

function setTagClickEvent() {
  const tagElements = document.querySelectorAll(".article-category");

  tagElements.forEach((tagElement) => {
    tagElement.addEventListener("click", async function (event) {
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
      try {
        // データ取得が完了するまで待つ
        await getData(post, [tag], searchWordFromURL);
      } catch (error) {
        console.error("Error fetching data:", error);
        // エラーが発生した場合もボタンを有効にする
        tagElement.disabled = false;
      }
    });
  });
}
