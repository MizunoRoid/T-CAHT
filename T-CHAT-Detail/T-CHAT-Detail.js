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
  imageContainer.style.display = imageContainer.style.display === "none" ? "block" : "none";
}
var toolbarOptions = [
  [{ header: [2, 3, false] }],
  ['bold', 'italic', 'underline'], // toggled buttons
  /* [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown　*/
  ['blockquote'],
  ['image'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }], // superscript/subscript
  [{ 'align': [] }],
  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  /* ['clean']                                         // remove formatting button*/
];

const editor = new Quill('#editor_area', {
  bounds: '#edito',
  modules: {
      toolbar: toolbarOptions
  },
  placeholder: 'テキストを入力',
  theme: 'snow'
});

