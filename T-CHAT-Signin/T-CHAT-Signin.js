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
    const querySnapshop = await user_register.get();
    var document_size = querySnapshop.size;
    var username_map = querySnapshop.docs.map(postDoc => postDoc.data().UserName);
    var password_map = querySnapshop.docs.map(postDoc => postDoc.data().PassWord);
    var mailaddress_map = querySnapshop.docs.map(postDoc => postDoc.data().MailAddress);
    for(counter=0;counter<document_size;++counter){
        if(username_map[counter]==username && password_map[counter]==password && mailaddress_map[counter]==mailaddress){
            
        }
    }
});
 // if (username === dummyUsername && password === dummyPassword) {
    //     // ログイン成功時の処理
    //     document.getElementById("error-message").textContent = "Login successful!";
    // } else {
    //     // ログイン失敗時の処理
    //     document.getElementById("error-message").textContent = "Invalid username or password";
    // }