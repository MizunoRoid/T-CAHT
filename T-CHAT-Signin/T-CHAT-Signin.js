var firebaseConfig = {
  apiKey: "AIzaSyARxI5dZXILhMkMDTDE5MyK88yJlCh-A_Y",
  authDomain: "t-chat-d4c62.firebaseapp.com",
  projectId: "t-chat-d4c62",
  storageBucket: "t-chat-d4c62.appspot.com",
  messagingSenderId: "276479107458",
  appId: "1:276479107458:web:329742b4d052a975d16f9b",
  measurementId: "G-WPZGDY4H0F",
};

// ユーザー名の正規表現
var usernameRegex = /^.{4,16}$/;
//4文字以上16文字以下の長さ 英大小文字、数字のいずれかの文字だけで構成されている

var mailaddressRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
//トップレベルドメイン(TLD)が例えば "com" や "net" のように2文字以上で構成さているか

// パスワードの正規表現
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$-?#])[A-Za-z\d!$-?#]{6,}$/;
//英字、数字、特殊文字のいずれかが6文字以上繰り返されていることを示す

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const user_register = firestore.collection("UserRegister");
const username = document.getElementById("username");
const password = document.getElementById("password");
const mailaddress = document.getElementById("mailaddress");
const register_button = document.getElementById("register_button");
const error_message = document.getElementById("error-message");

password.addEventListener("click", async function () {});
register_button.addEventListener("click", async function () {
  const newUser = {
    UserName: username.value,
    PassWord: password.value,
    MailAddress: mailaddress.value,
  };
  // ユーザー情報の重複をチェック
  const querySnapshotName = await user_register
    .where("UserName", "==", newUser.UserName)
    .get();

  const querySnapshotMail = await user_register
    .where("MailAddress", "==", newUser.MailAddress)
    .get();

  const querySnapshotPass = await user_register
    .where("PassWord", "==", newUser.PassWord)
    .get();

  if (
    username.value !== "" &&
    password.value !== "" &&
    mailaddress.value !== ""
  ) {
    if (
      usernameRegex.test(newUser.UserName) &&
      mailaddressRegex.test(newUser.MailAddress) &&
      passwordRegex.test(newUser.PassWord)
    ) {
      if (
        !querySnapshotName.empty ||
        !querySnapshotMail.empty ||
        !querySnapshotPass.empty
      ) {
        // 重複がある場合の処理
        alert("既にそのユーザー情報は登録されています。");
      } else {
        // 重複がない場合の処理
        await user_register.add(newUser);
        // 成功時の処理
        alert("サインインが完了しました。");
        window.location.href = "./../T-CHAT-Login/T-CHAT-Login.html";
      }
    } else {
      alert("ユーザー名、メールアドレス、パスワードが無効です。");
    }
  } else {
    alert("ユーザー名、メールアドレス、パスワードを入力して下さい。");
  }
});

// パスワードの目の処理
let eye = document.getElementById("eye");
eye.addEventListener("click", function () {
  if (this.previousElementSibling.getAttribute("type") == "password") {
    this.previousElementSibling.setAttribute("type", "text");
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  } else {
    this.previousElementSibling.setAttribute("type", "password");
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  }
});
