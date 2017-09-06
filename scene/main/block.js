class Block {
  constructor(game, position) {
    this.game = game;
    this.x = position[0];
    this.y = position[1];
    this.alive = true;
    this.lives = position[2] || 1;

    this.img = this.game.imageByName('block');
    this.image = this.img.image;
    this.w = this.img.w;
    this.h = this.img.h;
  }

  static instance(...args) {
    this.i = new this(...args);
    return this.i;
  }

  kill () {
    let o = this;
    o.lives--;
    if (o.lives < 1) {
      o.alive = false;
    }
  };

  collide(b) {
    let o = this;
    return o.alive && ( rectIntersects(o, b) || rectIntersects(b, o));
  };
}
