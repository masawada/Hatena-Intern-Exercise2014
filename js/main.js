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
