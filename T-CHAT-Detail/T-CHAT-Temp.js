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

// ファイルが選択されたときに呼ばれる関数
function updateFileDetails() {
  const input = document.getElementById("imageInput");
  const fileNameExtensionDisplay = document.getElementById("fileNameExtension");
  const imageContainer = document.getElementById("imageContainer");
  const selectedImage = document.getElementById("selectedImage");
  const closeButton = document.getElementById("closeButton");
  const previewButton = document.getElementById("previewButton");

  const fileName = input.files[0] ? input.files[0].name : "ファイルを選択";
  const fileExtension = fileName.split(".").pop(); // 拡張子を抽出
  fileNameExtensionDisplay.textContent = ` ファイル名: ${fileName} `;
  previewButton.style.display = "inline-block"; // プレビューボタンを表示

  // 画像が選択された場合、表示する
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
    imageContainer.style.display = "block"; // 画像コンテナを表示
    closeButton.style.display = "block"; // 閉じるボタンを表示
  } else {
    selectedImage.src = ""; // 画像が選択されていない場合、表示をクリア
    imageContainer.style.display = "none"; // 画像コンテナを非表示
    closeButton.style.display = "none"; // 閉じるボタンを非表示
  }
}

// 画像を閉じる関数
function closeImage() {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.style.display = "none"; // 画像コンテナを非表示
}

// プレビューボタンを切り替える関数
function toggleImage() {
  const imageContainer = document.getElementById("imageContainer");
  // Toggle the visibility of the image container
  imageContainer.style.display =
    imageContainer.style.display === "none" ? "block" : "none";
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

// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

// Firestoreの参照取得
const db = firebase.firestore();

// URLからPostIDを取得する関数
function getPostIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("PostID");
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
    } else {
      // 一致するドキュメントが見つからなかった場合
      console.error("Document not found in Firestore with PostID:", postID);
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
}

// PostIDを取得して検索
const postID = getPostIDFromURL();
console.log("PostID:", postID);
if (postID) {
  findDocumentByPostID(postID);
} else {
  console.error("PostID not provided in the URL parameters.");
}
