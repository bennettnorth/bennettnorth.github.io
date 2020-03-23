// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Class is exported (eslint flag)
/* exported Bird */

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.1;
    this.lift = -5;
    this.velocity = 0;

    this.icon = birdSprite;
<<<<<<< HEAD
    this.width = 42;
    this.height = 42;
=======
    this.width = 32;
    this.height = 32;

>>>>>>> fde8ba4d5786c9a7e4a0b5e2a65d50e49fa2ed44
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  up() {
    this.velocity = this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }
}
