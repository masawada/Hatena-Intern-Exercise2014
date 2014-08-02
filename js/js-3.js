// 課題 JS-3 の実装をここに記述してください。
(function(){
  var apply_button = document.querySelector('#submit-button');
  var removeChildren = function (dst) {
    while (dst.childNodes.length) {
      dst.removeChild(dst.firstChild);
    }
  };

  apply_button.addEventListener('click', function () {
    var dst = document.querySelector('#table-container');
    var logs = parseLTSVLog(document.querySelector('#log-input').value);

    removeChildren(dst);
    createLogTable(dst, logs);
  });
})();
