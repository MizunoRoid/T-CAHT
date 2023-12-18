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
var auth = firebase.auth();
var db   = firebase.firestore();

function login(email , password){
    auth.signInWithEmailAndPassword(email,password)
    .then((userCredential) => {
        var user = userCredential.user;
        return db.collection("users").doc(user,id).get();
    })
    .then((doc) => {
        var userData = doc.data();
        var username = userData.username;
    })
    .catch((error) => {
        // ログイン失敗時の処理
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
    });
}
document.getElementById("SigninForm").addEventListener("submit", function(event) {
event.preventDefault();

    // const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    // const mailaddress = document.getElementById("mailaddress")

    // firebase
});

    // // ダミーのユーザー情報
    // const dummyUsername = "user";
    // const dummyPassword = "password";

    // if (username === dummyUsername && password === dummyPassword) {
    //     // ログイン成功時の処理
    //     document.getElementById("error-message").textContent = "Login successful!";
    // } else {
    //     // ログイン失敗時の処理
    //     document.getElementById("error-message").textContent = "Invalid username or password";
    // }