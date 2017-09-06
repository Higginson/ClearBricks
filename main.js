var loadLevel = function (game, n) {
  n = n - 1;
  let level = levels[n];
  let blocks = [];
  for (let i = 0; i < level.length; i++) {
    let p = level[i];
    let b = Block.instance(game, p);
    blocks.push(b);
  }
  return blocks;
};

var enableDebugMode = function (game, enable) {
  if (!enable) {
    return;
  }
  window.paused = true;
  //为了debug
  window.addEventListener('keydown', function (event) {
    if (event.key === 'p') {
      //暂停
      window.paused = !window.paused;
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
    ball: 'img/ball.png',
    block: 'img/block.png',
    paddle: 'img/paddle.png'
  };

  var game = GuaGame.instance(30, images, function (g) {
    var s = SceneTitle.new(g);
    g.runWithScene(s);
  });

  enableDebugMode(game, true);

};

__main();