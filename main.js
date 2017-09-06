var loadLevel = function (game, n) {
  n = n - 1;
  var level = levels[n];
  var blocks = [];
  for (var i = 0; i < level.length; i++) {
    var p = level[i];
    var b = Block(game, p);
    blocks.push(b);
  }
  return blocks;
};

var enableDebugMode = function (game, enable) {
  if (!enable) {
    return;

  }
  //为了debug
  window.addEventListener('keydown', function (event) {
    var k = event.key;
    if (event.key === 'p') {
      //暂停
      window.paused = !window.paused;
    } else if ('123'.includes(event.key)) {//stringObj.includes() 返回一个布尔值，该值指示传入字符串是否包含在字符串对象中。
      //为了debug临时加的载入关卡功能
      var blocks = loadLevel(game, Number(k));
    }
  });

  //控制速度
  document.querySelector("#id-input-speed").addEventListener('input', function (event) {
    var input = event.target;
    window.fps = Number(input.value);
  });
};

var __main = function () {

  var images = {
    ball: 'ball.png',
    block: 'block.png',
    paddle: 'paddle.png'
  };


  var game = GuaGame(60, images, function (g) {
    var s = Scene(g);
    g.runWithScene(s);
  });


  enableDebugMode(game, true);

};

__main();