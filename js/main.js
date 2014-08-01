// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
var parseLTSVLog = function(logStr){
  var result = [];
  var records = logStr.split('\n');
  var i;

  var parser = function (splitted) {
    var i, index;
    var item = {};

    for (i = 0; i < splitted.length; i++) {
      index = splitted[i].indexOf(':');
      item[splitted[i].slice(0, index)] = splitted[i].slice(index+1);
    }

    item.reqtime_microsec = Number(item.reqtime_microsec);
    return item;
  };

  for (i = 0; i < records.length; i++) {
    if(records[i].length === 0) { continue; }
    result.push(parser(records[i].split('\t')));
  }

  return result;
};

// 課題 JS-2: 関数 `createLogTable` を記述してください
var createLogTable = function (dst, logs) {
  var i;

  var row_template = function (log) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.innerText = log.path;
    td2.innerText = log.reqtime_microsec;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
  };

  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  table.innerHTML = '<thead><tr><th>path</th><th>reqtime_microsec</th></tr></thead>';

  for (i = 0; i < logs.length; i++) {
    tbody.appendChild(row_template(logs[i]));
  }

  table.appendChild(tbody);
  dst.appendChild(table);
};
