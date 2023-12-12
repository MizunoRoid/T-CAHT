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

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, `\\$&`);
    var regex = new RegExp(`[?&]` + name + `(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ` `));
}

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

const db = firebase.firestore();
const search_button =document.getElementById("search_button");
const post = db. collection('Post')
var min = 1 ; var max = 3 ;
//var randam_num = String(Math.floor(Math.random()*(max + 1 - min )) + min) ;

getData();

search_button.addEventListener('click',function(){
    let result = document.getElementById('search_text')
    location.href = `./`;
    result.value = '';
})

function getData() {
    post.get().then((doc) => {
        let addData = `<div class="box1">`;
        addData += `<section>`;
        doc.forEach((docData) => {
            addData += `<h3>投稿者名${docData.data().UserName}</h3>`;
            addData += `<h1>投稿日:${docData.data().PostDay}</h1>`;
            addData += `<article>${docData.data().Title}</article>`
            addData += `<span class="article-category">${docData.data().Tag}</span>`
            addData += `</section>`
            addData += `</div>`
        });
        var add_element = document.getElementById("add-element");
        add_element.innerHTML += addData;
    })
    .catch((error) => {
        console.log("データ取得失敗:",error);
    });
};