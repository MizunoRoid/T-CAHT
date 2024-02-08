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

document.querySelector(".logo-none").addEventListener("click", function () {
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
    window.location.href = `./../T-CHAT-Question/T-CHAT-Question.html?UserName=${encodeURIComponent(
      userName
    )}&UserID=${encodeURIComponent(userId)}`;
  } else {
    window.location.href = `./../T-CHAT-Question/T-CHAT-Question.html`;
  }
});

document.querySelector(".post").addEventListener("click", async function () {
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
      await updatePostTagIfNeeded(postID);
      // 回答追加後、ページをリロード
      window.location.reload();
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  });

async function displayAnswers(postID) {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const loggedInUserID = urlParams.get("UserID");
    const answersSnapshot = await db
      .collection("Post")
      .doc(postID)
      .collection("Answers")
      .orderBy("PostDay", "desc")
      .get();
    const post_userID = (await db.collection("Post").doc(postID).get()).data()
      .UserID;

    const responsesContainer = document.querySelector(".responses");
    responsesContainer.innerHTML = ""; // 既存の回答をクリア

    answersSnapshot.forEach((doc) => {
      const answer = doc.data();
      const formattedDate = formatTimestamp(answer.PostDay);

      let contentHtml = Array.isArray(answer.Content)
        ? answer.Content.map(
            (item) => `<${item.tagName}>${item.content}</${item.tagName}>`
          ).join("")
        : answer.Content;

      const responseSection = document.createElement("section");
      responseSection.classList.add("response");
      if (answer.situation === "解決") {
        responseSection.classList.add("resolved-answer");
      }

      const namePara = document.createElement("div");
      namePara.classList.add("name");
      namePara.textContent = answer.UserName;

      const datePara = document.createElement("div");
      datePara.classList.add("date");
      datePara.textContent = formattedDate;

      const replyContent = document.createElement("div");
      replyContent.classList.add("reply");
      replyContent.innerHTML = contentHtml;

      const contentAndButtonDiv = document.createElement("div");
      contentAndButtonDiv.classList.add("content-and-button");
      contentAndButtonDiv.appendChild(replyContent);

      responseSection.appendChild(namePara);
      responseSection.appendChild(datePara);
      responseSection.appendChild(contentAndButtonDiv);

      if (
        loggedInUserID === post_userID &&
        loggedInUserID !== answer.UserID &&
        answer.situation !== "解決"
      ) {
        const resolveButton = document.createElement("button");
        resolveButton.innerText = "解決";
        resolveButton.classList.add("response-button");
        resolveButton.addEventListener("click", async () => {
          await markAnswerAsResolved(postID, doc.id);
          resolveButton.style.display = "none";
          responseSection.classList.add("resolved-answer");
          updatePostTag(postID);
        });
        contentAndButtonDiv.appendChild(resolveButton);
      }

      responsesContainer.appendChild(responseSection);
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
      .where("PostID", "==", postID)
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
      add_element_data += `<div class="name">${data.UserName}</div>`;
      add_element_data += `<div class="date">投稿日:${data.PostDay}</div>`;
      add_element_data += `<div class="large">${data.Title}</div>`;
      // タグを区切り文字「,」で分割
      const tags = data.Tag.split(",").map((tag) => tag.trim());
      const format = data.Format;
      if (tags.length > 0) {
        let formatClass = "";
        switch (format) {
          case "プライベート":
            formatClass = "format-private";
            break;
          case "意見交換":
            formatClass = "format-exchange";
            break;
          case "Q＆A":
            formatClass = "format-qa";
            break;
        }
        // formatに応じたクラスを追加
        add_element_data += `<span class="${formatClass}">${format}</span>`;
        add_element_data += " ";
      }

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
    await updatePostTagIfNeeded(postID);
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

// 回答の有無に基づいてタグを更新する関数
async function updatePostTagIfNeeded(postID) {
  const answersSnapshot = await db
    .collection("Post")
    .doc(postID)
    .collection("Answers")
    .get();
  if (answersSnapshot.size > 0) {
    const postDoc = await db.collection("Post").doc(postID).get();
    if (postDoc.exists) {
      let tags = postDoc
        .data()
        .Tag.split(",")
        .map((tag) => tag.trim());
      console.log(`タグ配列: ${tags}`); // タグ配列を出力して確認

      if (tags.includes("未回答")) {
        tags = tags.map((tag) => (tag === "未回答" ? "未解決" : tag));
        await db
          .collection("Post")
          .doc(postID)
          .update({ Tag: tags.join(", ") });
        console.log("タグを未解決に更新しました。");
      } else {
        console.log("タグに未回答が含まれていません。");
      }
    }
  }
}

async function updatePostTag(postID) {
  const postRef = db.collection("Post").doc(postID);

  db.runTransaction(async (transaction) => {
    const postDoc = await transaction.get(postRef);
    if (!postDoc.exists) {
      throw "Document does not exist!";
    }
    const data = postDoc.data();
    const tags = data.Tag.split(",").map((tag) => tag.trim()); // タグを配列に変換

    // "未解決"タグを"解決"に変更
    const updatedTags = tags.map((tag) => (tag === "未解決" ? "解決" : tag));
    transaction.update(postRef, { Tag: updatedTags.join(", ") }); // 更新されたタグを保存
  })
    .then(() => {
      console.log("Document successfully updated");
      window.location.reload(); // データ更新後にページをリロード
    })
    .catch((error) => console.error("Error updating document: ", error));
}

async function markAnswerAsResolved(postID, answerID) {
  const answerRef = db
    .collection("Post")
    .doc(postID)
    .collection("Answers")
    .doc(answerID);

  await answerRef
    .update({
      situation: "解決",
    })
    .then(() => {
      console.log("Answer marked as resolved.");
    })
    .catch((error) => {
      console.error("Error marking answer as resolved:", error);
    });
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

// //ここからコメント返信の処理
// function replyToComment(commentId) {
//   // リプライフォームが既に表示されている場合は非表示にする
//   hideReplyForm(commentId);

//   // リプライフォームを作成し表示する
//   const replyFormContainer = document.getElementById(
//     `replyFormContainer${commentId}`
//   );
//   const replyForm = document.createElement("div");
//   replyForm.innerHTML = `

//   <input type="text" id="replyInput" placeholder="テキストを入力" style="width: 1100px; height: 50px;border: 2px solid #ccc; /* 線の太さを調整 */
//   border-radius: 5px 5px 5px 5px;   font-weight: bold; font-family: あおとゴシック R;">

//     <div style="text-align: right; margin-top: 10px; margin-right:20px; font-family: "あおとゴシック R";">
//     <button  style="  height: 35px; width: 100px;color:#fff; background: #55c500;   font-size:15px;  font-weight: bold;border: 2px solid #ccc; /* 線の太さを調整 */
//     border-radius: 5px 5px 5px 5px; /* 右下と左下だけを丸くする */">送信</button>
//     <button  style="width: 100px; height: 35px;    font-size:15px; font-weight: bold; background: #f5f6f6;  border: 2px solid #ccc; /* 線の太さを調整 */
//     border-radius: 5px 5px 5px 5px; /* 右下と左下だけを丸くする */
//     ">キャンセル</button>

//     </div>
//   `;
//   replyFormContainer.appendChild(replyForm);

//   // テキストボックスを非表示にする
//   const replyButton = document.getElementById(`replyButton${commentId}`);
//   if (replyButton) {
//     replyButton.style.display = "none";
//   }
// }

// function hideReplyForm(commentId) {
//   const replyFormContainer = document.getElementById(
//     `replyFormContainer${commentId}`
//   );
//   replyFormContainer.innerHTML = ""; // 内容をクリア
// }

// function submitReply(commentId) {
//   const replyInput = document.getElementById(`replyInput${commentId}`);
//   const replyText = replyInput.value;

//   // ここでリプライをサーバーに送信したり、表示したりする処理を追加

//   // 送信が完了したら、リプライフォームを非表示にする
//   hideReplyForm(commentId);

//   // テキストボックスを再表示する
//   const replyButton = document.getElementById(`replyButton${commentId}`);
//   if (replyButton) {
//     replyButton.style.display = "inline-block";
//   }
// }

// function cancelReply(commentId) {
//   // リプライフォームを非表示にする
//   hideReplyForm(commentId);

//   // テキストボックスを再表示する
//   const replyButton = document.getElementById(`replyButton${commentId}`);
//   if (replyButton) {
//     replyButton.style.display = "inline-block";
//   }
// }
