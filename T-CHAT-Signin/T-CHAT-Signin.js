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
    const querySnapshop = await user_register.get();
    var document_size = querySnapshop.size;
    var username_map = querySnapshop.docs.map(postDoc => postDoc.data().UserName);
    var password_map = querySnapshop.docs.map(postDoc => postDoc.data().PassWord);
    var mailaddress_map = querySnapshop.docs.map(postDoc => postDoc.data().MailAddress);
    if(username.value !="" && password.value != "" && mailaddress.value != ""){
        for(counter=0;counter<document_size;++counter){
            if(username_map[counter]==username.value && password_map[counter]==password.value && mailaddress_map[counter]==mailaddress.value){
                // ログイン失敗時の処理
                document.getElementById("error-message").textContent = "既にそのユーザー情報は登録されています。";
                break;
            }else{
                await user_register.add({
                    UserName: username.value,
                    PassWord: password.value,
                    MailAddress: mailaddress.value
                });

                break;
            };
        };
    }else{
        document.getElementById("error-message").textContent = "入力してください";
    }
});