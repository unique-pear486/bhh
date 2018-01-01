/* eslint-env browser */
function getTransform(el, m) {
  'use strict'

  let m1 = m || new DOMMatrix();
  if (el.parentElement == null) {
    return m;
  }
  let m2 = window.getComputedStyle(el.parentElement, null).transform;
  try {
    m2 = new DOMMatrix(m2);
  } catch (e) {
    m2 = new DOMMatrix();
  }
  m1 = m2.multiply(m1);
  return getTransform(el.parentElement, m1);
}


class Draggable {
  constructor(el, { axis = null, grid = [1, 1], limits = {} } = {}) {
    // el is a page element
    // axis must be 'x' or 'y' or undefined/null to limit movement to that axis
    // grid must be an array [x, y] (even if limited to one axis) of px per step
    // limits should be an object with some of xmin, xmax, ymin, ymax defined
    this.el = el;
    this.mouseDown = Draggable.mouseDown.bind(this);
    this.mouseUp = Draggable.mouseUp.bind(this);
    this.mouseMove = Draggable.mouseMove.bind(this);
    el.addEventListener('mousedown', this.mouseDown);
    this.axis = axis;
    this.grid = grid;
    this.index = { x: 0, y: 0 };
    this.xmin = limits.xmin;
    this.ymin = limits.ymin;
    this.xmax = limits.xmax;
    this.ymax = limits.ymax;
    this.callbacks = [];

    // set top and left to 0px if not already set
    this.el.style.top = window.getComputedStyle(this.el, null).top;
    if (this.el.style.top === 'auto') { this.el.style.top = '0px'; }
    this.el.style.left = window.getComputedStyle(this.el, null).left;
    if (this.el.style.left === 'auto') { this.el.style.left = '0px'; }
  }

  registerFunc(f) {
    this.callbacks.push(f);
  }

  static roundAndLimit(input, round, index, min, max) {
    // rounds the value to nearest "round", and limits the number of clicks to
    // between min and max.
    let val = Math.round(input / round) + index;
    if (min != null) {
      val = Math.max(val, min);
    }
    if (max != null) {
      val = Math.min(val, max);
    }
    return (val - index) * round;
  }

  static mouseDown(e) {
    //
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);

    // get the transformation matrices
    this.m = getTransform(this.el);
    this.mInv = this.m.inverse();

    // store the initial positions
    this.startX = parseInt(this.el.style.left, 10);
    this.startY = parseInt(this.el.style.top, 10);
    this.mouseStartX = e.clientX;
    this.mouseStartY = e.clientY;

    // reset x and y
    this.x = 0;
    this.y = 0;
  }

  static mouseMove(e) {
    e.preventDefault();
    // get mouse move since start of drag
    const x = e.clientX - this.mouseStartX;
    const y = e.clientY - this.mouseStartY;
    // transform it into local axes
    const p = this.mInv.transformPoint({ x, y });

    // Apply tranforms to element
    if (this.axis !== 'y') {
      this.x = Draggable.roundAndLimit(
        p.x,
        this.grid[0],
        this.index.x,
        this.xmin,
        this.xmax,
      );
    }
    if (this.axis !== 'x') {
      this.y = Draggable.roundAndLimit(
        p.y,
        this.grid[1],
        this.index.y,
        this.ymin,
        this.ymax,
      );
    }
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  static mouseUp(e) {
    e.preventDefault();

    // (permanently) Set transformation
    const x = this.startX + this.x;
    const y = this.startY + this.y;
    this.el.style.transform = '';
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;

    // Update index if grid set
    if (this.grid) {
      this.index.x += (this.x / this.grid[0]);
      this.index.y += (this.y / this.grid[1]);
    }

    // call any callbacks registered
    this.callbacks.forEach(f => f.call(this));

    // Remove listener
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}
