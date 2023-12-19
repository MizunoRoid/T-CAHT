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
const username = document.getElementById("username");
const password = document.getElementById("password");
const mailaddress = document.getElementById("mailaddress");
const register_button = document.getElementById("register_button");
const error_message = document.getElementById("error-message");

register_button.addEventListener("click", async function(){
    const newUser = {
        UserName : username.value,
        PassWord : password.value,
        MailAddress : mailaddress.value
    }
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

    
    if (username.value !== "" && password.value !== "" && mailaddress.value !== "") {
        if (!querySnapshotName.empty || !querySnapshotMail.empty || !querySnapshotPass.empty) {
          // 重複がある場合の処理
        error_message.textContent = "既にそのユーザー情報は登録されています。";
        } else {
          // 重複がない場合の処理
        await user_register.add(newUser);
          // 成功時の処理
        // window.location.href = './../T-CHAT-Login/T-CHAT-Login.html';
        error_message.textContent = "成功";
        }
    } else {
        // 入力が不足している場合の処理
        error_message.textContent = "入力してください";
    }
    });