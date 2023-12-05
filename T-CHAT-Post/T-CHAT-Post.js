var tooltipTimer;
var tooltipVisible = false;

function showTooltip(text, event) {
  clearTimeout(tooltipTimer);
  var tooltip = event.currentTarget.querySelector('.tooltip'); // Get the tooltip element within the current target
  tooltip.children[0].textContent = text; // Change only the text content
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = 1;
  tooltipVisible = true;
}

function hideTooltip(event) {
  tooltipTimer = setTimeout(function() {
    var tooltip = event.currentTarget.querySelector('.tooltip'); // Get the tooltip element within the current target
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
    tooltipVisible = false;
  }, 200);
}

function handleTooltipMouseLeave(event) {
  if (tooltipVisible) {
    hideTooltip(event);
  }
}

function openModal() {
  // モーダルウィンドウが閉じられた際にもツールチップを非表示にする
  var tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(function(tooltip) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;

  });
  tooltipVisible = false;

  // その他の closeModal の処理を追加...

  // モーダルウィンドウが閉じられた際の処理を追加
  // 例えば、モーダルウィンドウのスタイルを変更するなど
}
function closeModal() {
  // モーダルウィンドウが閉じられた際にもツールチップを非表示にする
  var tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(function(tooltip) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;

  });
  tooltipVisible = false;

  // その他の closeModal の処理を追加...
}

// ここからモーダルウィンドウのjs
function previewPhotos() {
  var modal = document.getElementById('myModal');
  var input = document.getElementById('photoInput');
  var previewContainer = document.getElementById('previewContainer');

  // プレビューをクリア
  previewContainer.innerHTML = '';

  if (input.files && input.files.length > 0) {
    for (var i = 0; i < input.files.length; i++) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('loaded');
        previewContainer.appendChild(img);
      };

      reader.readAsDataURL(input.files[i]);
    }

    modal.classList.add('fade-in');
    modal.style.display = 'block';

    setTimeout(function() {
      var previewImages = document.querySelectorAll('.modal-content img');
      previewImages.forEach(function(image) {
        image.classList.add('loaded');
      });
    }, 100);
  }
}

function closeModal() {
  var modal = document.getElementById('myModal');
  var previewContainer = document.getElementById('previewContainer');

  modal.classList.add('fade-out');

  // フェードアウトのトリガーを追加し、アニメーション後にモーダルを非表示にする
  setTimeout(function() {
    modal.style.display = 'none';
    modal.classList.remove('fade-out');

    // モーダルを閉じたらプレビューをクリア
    previewContainer.innerHTML = '';
  }, 400);
}

// ここまでがモーダルウィンドウのjs