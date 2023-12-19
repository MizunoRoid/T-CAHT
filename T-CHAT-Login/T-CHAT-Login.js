var firebaseConfig = {
    apiKey: "AIzaSyARxI5dZXILhMkMDTDE5MyK88yJlCh-A_Y",
    authDomain: "t-chat-d4c62.firebaseapp.com",
    projectId: "t-chat-d4c62",
    storageBucket: "t-chat-d4c62.appspot.com",
    messagingSenderId: "276479107458",
    appId: "1:276479107458:web:329742b4d052a975d16f9b",
    measurementId: "G-WPZGDY4H0F"
    };

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const user_register = firestore.collection('UserRegister');
const username_or_mail = document.getElementById("username_or_mail");
const password = document.getElementById("password");
const register_button = document.getElementById("register_button");
const error_message = document.getElementById("error-message");

register_button.addEventListener("click", async function(){
    const input_UserInfo = username_or_mail.value;
    const input_PassWord = password.value;
    // ユーザー情報の重複をチェック
    const querySnapshot = await user_register
    .get();
    let isDuplicate = false;

    querySnapshot.forEach(doc => {
      const user = doc.data();
      if (user.UserName === input_UserInfo || user.MailAddress === input_UserInfo) {
          isDuplicate = true;
      }
  });

  if (username_or_mail.value !== "" && password.value !== "") {
      if (isDuplicate) {
          // 重複がある場合の処理
          console.log("ログイン");
        } else {
          // 重複がない場合の処理
          console.log("ログイン失敗");
      }
  } else {
      // 入力が不足している場合の処理
      console.log("入力が不足しています。失敗");
  }
});