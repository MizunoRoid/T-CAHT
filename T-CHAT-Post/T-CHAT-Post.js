

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

const editor2 = new Quill("#editor_area", {
  bounds: "#edito",
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder:
    "ここに質問したいことを記載してください\n例）\nFirebaseのデータベースを使用してログイン画面を作っています。\nその途中で問題が発生しました。その問題とはFirebaseの構成が理解出来ないんですよ～、\nなんで教えてほしいですね～。",

  theme: "snow",
});
