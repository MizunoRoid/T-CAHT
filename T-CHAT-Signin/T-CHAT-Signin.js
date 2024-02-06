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
const firestore = firebase.firestore();
const user_register = firestore.collection("UserRegister");
const username = document.getElementById("username");
const password = document.getElementById("password");
const mailaddress = document.getElementById("mailaddress");
const register_button = document.getElementById("register_button");
const error_message = document.getElementById("error-message");

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
    // ユーザー名の正規表現
    var usernameRegex = /^[a-zA-Z0-9]{4,16}$/;
    //4文字以上16文字以下の長さ 英大小文字、数字のいずれかの文字だけで構成されている

    var mailaddressRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    //トップレベルドメイン(TLD)が例えば "com" や "net" のように2文字以上で構成さているか

    // パスワードの正規表現
    var passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$-?#])[A-Za-z\d!$-?#]{6,}$/;
    //英字、数字、特殊文字のいずれかが6文字以上繰り返されていることを示す
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
        error_message.textContent = "既にそのユーザー情報は登録されています。";
      } else {
        // 重複がない場合の処理
        await user_register.add(newUser);
        // 成功時の処理
        window.location.href = "./../T-CHAT-Login/T-CHAT-Login.html";
      }
    } else {
      error_message.textContent =
        "ユーザー名、メールアドレス、パスワードが無効です。";
    }
  } else {
    // 入力が不足している場合の処理
    error_message.textContent = "入力してください";
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

// 登録ボタン押した後の処理
function validateLogin() {
  var username = document.getElementById("username").value;
  var mailaddress = document.getElementById("mailaddress").value;
  var password = document.getElementById("password").value;

  // ユーザー名とメールアドレスとパスワードが正規表現に合致するかを確認
  if (
    usernameRegex.test(username) &&
    mailaddressRegex.test(mailaddress) &&
    passwordRegex.test(password)
  ) {
    location.href = "../T-CHAT-Home.html";
    document.getElementById("loginResult").innerText = alert("ログイン成功！");
  } else {
    document.getElementById("loginResult").innerText = alert(
      "ユーザー名またはメールアドレスまたはパスワードが無効です。"
    );
  }
}
