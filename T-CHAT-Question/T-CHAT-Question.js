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