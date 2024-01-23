//モーダルウィンドウ
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

document.getElementById("unsolved").onclick = function () {
    document.getElementById("box1").style.display = "block";
    document.getElementById("box2").style.display = "none";
    document.getElementById("box3").style.display = "none";
};

document.getElementById("Notanswered").onclick = function () {
    document.getElementById("box1").style.display = "none";
    document.getElementById("box2").style.display = "block";
    document.getElementById("box3").style.display = "none";
};

document.getElementById("answered").onclick = function () {
    document.getElementById("box1").style.display = "none";
    document.getElementById("box2").style.display = "none";
    document.getElementById("box3").style.display = "block";
};

document.getElementById("full").onclick = function () {
    document.getElementById("box1").style.display = "block";
    document.getElementById("box2").style.display = "block";
    document.getElementById("box3").style.display = "block";
};