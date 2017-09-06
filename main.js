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

var blocks = [];
var paused = false;
var enableDebugMode = function (game, enable) {
  if (!enable) {
    return;

  }
  //为了debug
  window.addEventListener('keydown', function (event) {
    var k = event.key;
    if (event.key === 'p') {
      //暂停
      paused = !paused;
    } else if ('1234567'.includes(event.key)) {//stringObj.includes() 返回一个布尔值，该值指示传入字符串是否包含在字符串对象中。
      //为了debug临时加的载入关卡功能
      blocks = loadLevel(game, Number(k));
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

  var score = 0;

  var game = GuaGame(60, images, function (g) {
    var paddle = Paddle(game);

    var ball = Ball(game);

    blocks = loadLevel(game, 1);

    paused = false;

    game.registerAction('a', function () {
      paddle.moveLeft();
    });
    game.registerAction('d', function () {
      paddle.moveRight();
    });
    game.registerAction('f', function () {
      ball.fire();
    });


    game.update = function () {
      if (paused) {
        return;
      }
      ball.move();
      //判断相撞
      if (paddle.collide(ball)) {
        ball.bounce();
      }

      //判断ball 和blocks相撞
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (block.collide(ball)) {
          block.kill();
          ball.bounce();
          //更新分数
          score += 10;
        }
      }
    };


    //mouse event
    var enableDrag = false;
    game.canvas.addEventListener('mousedown', function () {
      var x = event.offsetX;
      var y = event.offsetY;
      // 检查是否点中了ball
      if (ball.hasPoint(x, y)) {
        //设置拖拽状态
        enableDrag = true;

      }
    });

    game.canvas.addEventListener('mousemove', function () {
      var x = event.offsetX;
      var y = event.offsetY;
      if (enableDrag) {
        ball.x = x;
        ball.y = y;
      }
    });

    game.canvas.addEventListener('mouseup', function () {
      var x = event.offsetX;
      var y = event.offsetY;
      enableDrag = false;
    });


    game.draw = function () {
      //draw背景
      game.context.fillStyle = "#4D4D4D";
      game.context.fillRect(0, 0, 400, 300);

      game.drawImage(paddle);
      game.drawImage(ball);
      //draw block
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (block.alive) {
          game.drawImage(block);
        }
      }
      //draw labels
      game.context.fillText("分数： " + score, 10, 290);
    };
  });

  enableDebugMode(game, true);

};

__main();