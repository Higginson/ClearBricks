var Scene = function (game) {
  var s = {
    game: game,
  };

  //初始化
  var paddle = Paddle(game);

  var ball = Ball(game);

  var score = 0;

  var blocks = loadLevel(game, 1);

  game.registerAction('a', function () {
    paddle.moveLeft();
  });
  game.registerAction('d', function () {
    paddle.moveRight();
  });
  game.registerAction('f', function () {
    ball.fire();
  });

  s.update = function () {

    if (window.paused) {
      ball.move();
    }
    //判断游戏结束
    if (ball.y > paddle.y) {
      // 跳转到 游戏结束 的场景
      var end = SceneEnd.new(game);
      game.replaceScene(end);
    }

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
  s.draw = function () {
    //draw背景
    game.context.fillStyle = "#8e7f86";
    game.context.fillRect(0, 0, 400, 300);

    //draw
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
    enableDrag = false;
  });

  return s;
};