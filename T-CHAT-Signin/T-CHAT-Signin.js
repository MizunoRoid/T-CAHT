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

register_button.addEventListener("click", async function(){
    if(username.value !="" && password.value != "" && mailaddress.value != ""){
        
    await user_register.add({
        UserName: username.value,
        PassWord: password.value,
        MailAddress: mailaddress.value
    });
    };
});