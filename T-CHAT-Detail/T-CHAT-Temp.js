//モーダルウィンドウ
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
  placeholder: "テキストを入力",
  theme: "snow",
});
// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

// Firestoreの参照取得
const db = firebase.firestore();

// URLからPostIDを取得する関数
function getPostIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("PostID");
}

document
  .getElementById("answer-button")
  .addEventListener("click", async function (event) {
    // URLパラメータからUserNameとUserIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("UserName");
    const userID = urlParams.get("UserID");

    // UserNameまたはUserIDが存在しない場合、アラートを表示して処理を中断
    if (!userName || !userID) {
      alert("ログインしてください");
      event.preventDefault();
      return;
    }

    // ql-editorからHTMLコンテンツを取得
    const qlEditorDiv = document.querySelector(".ql-editor");
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

    // Firestoreに回答を追加
    try {
      const postID = getPostIDFromURL(); // URLからPostIDを取得
      await db.collection("Post").doc(postID).collection("Answers").add({
        Content: tagsInfo,
        UserID: userID,
        UserName: userName,
        PostDay: new Date(), // 現在の日付
      });

      // 回答追加後、ページをリロード
      window.location.reload();
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  });

async function displayAnswers(postID) {
  try {
    const answersSnapshot = await db
      .collection("Post")
      .doc(postID)
      .collection("Answers")
      .get();
    if (answersSnapshot.empty) {
      console.log("回答はまだありません。");
      return;
    }

    const responsesContainer = document.querySelector(".responses"); // 複数回答を格納するコンテナを取得
    if (!responsesContainer) {
      console.error("Responses container not found.");
      return;
    }

    answersSnapshot.forEach((doc) => {
      const answer = doc.data();
      const formattedDate = formatTimestamp(answer.PostDay); // タイムスタンプのフォーマット

      // 回答内容がオブジェクトの場合、HTML文字列に変換
      let contentHtml = "";
      if (Array.isArray(answer.Content)) {
        contentHtml = answer.Content.map(
          (item) => `<${item.tagName}>${item.content}</${item.tagName}>`
        ).join("");
      } else {
        contentHtml = answer.Content; // 文字列の場合はそのまま使用
      }

      const responseSection = document.createElement("section");
      responseSection.classList.add("response");

      responseSection.innerHTML = `
          <p class="name">${answer.UserName}</p>
          <p class="date">${formattedDate}</p>
          <p class="reply">${contentHtml}</p>
        `;

      responsesContainer.appendChild(responseSection); // 各回答を個別のセクションとして追加
    });
  } catch (error) {
    console.error("Error displaying answers:", error);
  }
}

// PostIDでデータを検索する関数
async function findDocumentByPostID(postID) {
  try {
    console.log("Searching for PostID:", postID);
    const collectionRef = await db
      .collection("Post")
      .where("UserID", "==", postID)
      .get();

    if (!collectionRef.empty) {
      // 一致するドキュメントが見つかった場合
      const doc = collectionRef.docs[0];
      const data = doc.data();
      const postElement = document.getElementById("post-element");
      const displayContainer = document.getElementById("display-container");
      const boxParent = document.getElementsByClassName("box")[0]; // "box" クラスの要素を取得
      if (!boxParent) {
        console.error("Element with class 'box' not found.");
        return;
      }

      var add_element_data = "";
      add_element_data += `<p class="name">${data.UserName}</p>`;
      add_element_data += `<p class="date">投稿日:${data.PostDay}</p>`;
      add_element_data += `<p class="large">${data.Title}</p>`;
      // タグを区切り文字「,」で分割
      const tags = data.Tag.split(",");

      let boxClass = ""; // ボックスのクラスを格納する変数
      tags.forEach((tag) => {
        let articleCategoryClass = "";
        if (tag.trim() === "未回答") {
          articleCategoryClass = "unsolved-category";
          boxClass = "box1";
        } else if (tag.trim() === "未解決") {
          articleCategoryClass = "Notanswered-category";
          boxClass = "box2";
        } else if (tag.trim() === "解決") {
          articleCategoryClass = "answered-category";
          boxClass = "box3";
        }

        add_element_data += `<span class="article-category ${articleCategoryClass}" style="cursor: pointer;">${tag.trim()}</span>`;
        add_element_data += " "; // ここで適切なスペースを追加する
      });

      // boxのクラスを適用
      boxParent.className = boxClass;

      postElement.innerHTML = add_element_data;
      if (Array.isArray(data.Content)) {
        const htmlContent = data.Content.map(
          (item) => `<${item.tagName}>${item.content}</${item.tagName}>`
        ).join("");
        displayContainer.innerHTML = htmlContent;
      } else {
        // Contentが配列でない場合は通常の表示
        displayContainer.innerHTML = data.content;
      }
      // Post/PostID ドキュメント内にViewフィールドが存在するか確認
      if (!data.hasOwnProperty("View")) {
        // View フィールドが存在しない場合は新たに作成
        await doc.ref.update({
          View: 1,
        });
      } else {
        // View フィールドが存在する場合はインクリメント
        await doc.ref.update({
          View: firebase.firestore.FieldValue.increment(1),
        });
      }

      // 更新された投稿のタグに対してTrend/TagのViewを更新
      await updateTrendTags(tags);
    } else {
      // 一致するドキュメントが見つからなかった場合
      console.error("Document not found in Firestore with PostID:", postID);
    }
    // 回答数を取得
    const answersCountSnapshot = await db
      .collection("Post")
      .doc(postID)
      .collection("Answers")
      .get();
    const answersCount = answersCountSnapshot.size; // 回答数

    // 回答数をHTMLに表示
    const answerCountElement = document.querySelector(".ans-count");
    if (answerCountElement) {
      answerCountElement.textContent = `${answersCount}件の回答`;
    } else {
      console.error("Answer count element not found.");
    }
    await displayAnswers(postID);
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
}

// Trend/TagのViewを更新する関数
async function updateTrendTags(tags) {
  try {
    const trendTagCollection = db.collection("Trend");

    // 各タグに対して処理を行う
    tags.forEach(async (tag) => {
      // Trend/Tag内にタグが存在するか確認
      const tagDoc = await trendTagCollection.doc(tag.trim()).get();

      if (tagDoc.exists) {
        // タグが存在する場合はViewを更新
        trendTagCollection.doc(tag.trim()).update({
          View: firebase.firestore.FieldValue.increment(1),
        });
      } else {
        // タグが存在しない場合は新たにドキュメントを作成
        trendTagCollection.doc(tag.trim()).set({
          View: 1,
        });
      }
    });
  } catch (error) {
    console.error("Error updating Trend/Tag:", error);
  }
}

// タイムスタンプをフォーマットする関数
function formatTimestamp(timestamp) {
  const date = timestamp.toDate(); // TimestampをDateオブジェクトに変換
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

window.addEventListener("load", function () {
  const postID = getPostIDFromURL();
  if (postID) {
    findDocumentByPostID(postID);
  } else {
    console.error("PostID not provided in the URL parameters.");
  }
});
