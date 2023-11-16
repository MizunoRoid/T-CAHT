document.getElementById('previewButton').addEventListener('click', function() {
    var imageContainer = document.getElementById('imageContainer');
    var selectedImage = document.getElementById('selectedImage');
    var imageCode = document.getElementById('imageCode');
    var input = document.getElementById('imageInput');
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
            imageCode.textContent = e.target.result;
            imageContainer.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    }
});

// Close button event listener
document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('imageContainer').style.display = 'none';
});