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
  constructor(el, { axis = null, grid = [1, 1], limits = {}, rotate = 0 } = {}) {
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
    this.rotate = rotate;
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

  setIndex(index) {
    const dx = (index.x - this.index.x) * this.grid[0];
    const dy = (index.y - this.index.y) * this.grid[1];
    const startX = parseInt(this.el.style.left, 10);
    const startY = parseInt(this.el.style.top, 10);
    this.index = index;
    this.el.style.top = `${startY + dy}px`;
    this.el.style.left = `${startX + dx}px`;
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
    this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotate}deg)`;
  }

  static mouseUp(e) {
    e.preventDefault();

    // (permanently) Set transformation
    const x = this.startX + this.x;
    const y = this.startY + this.y;
    this.el.style.transform = `rotate(${this.rotate}deg)`;
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
  get rotate() {
    return this._rotate;
  }
  set rotate(val) {
    this._rotate = val;
    this.el.style.transform = `rotate(${val}deg)`;
  }
}

class DragZoomable {
  constructor(el) {
    // el is a page element
    this.el = el;
    this.mouseDown = DragZoomable.mouseDown.bind(this);
    this.mouseUp = DragZoomable.mouseUp.bind(this);
    this.mouseMove = DragZoomable.mouseMove.bind(this);
    this.mouseWheel = DragZoomable.mouseWheel.bind(this);
    el.addEventListener('mousedown', this.mouseDown);
    el.addEventListener('wheel', this.mouseWheel);

    // set top and left to 0px if not already set
    this.el.style.top = window.getComputedStyle(this.el, null).top;
    if (this.el.style.top === 'auto') { this.el.style.top = '0px'; }
    this.el.style.left = window.getComputedStyle(this.el, null).left;
    if (this.el.style.left === 'auto') { this.el.style.left = '0px'; }
    this.el.style.transformOrigin = 'top left';

    this.x = 0;
    this.y = 0;
    this.zoom = 1;
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

    this.x = p.x;
    this.y = p.y;

    this.el.style.transform = this.getMatrix();
  }

  static mouseUp(e) {
    e.preventDefault();

    // (permanently) Set transformation
    const x = this.startX + this.x;
    const y = this.startY + this.y;
    this.x = 0;
    this.y = 0;
    this.el.style.transform = this.getMatrix();
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;

    // Remove listener
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }

  static mouseWheel(e) {
    // get the offset relative to the Zoomable element
    let { offsetX, offsetY } = e;
    let element = e.target;
    while (element !== this.el) {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
      element = element.parentElement;
    }

    let factor = 1;
    if (e.deltaY > 0) {
      factor = 1.2;
    }
    if (e.deltaY < 0) {
      factor = 1 / 1.2;
    }
    this.startX = parseInt(this.el.style.left, 10);
    this.startY = parseInt(this.el.style.top, 10);
    const x = this.startX - (this.zoom * offsetX * (factor - 1));
    const y = this.startY - (this.zoom * offsetY * (factor - 1));
    this.zoom *= factor;
    this.el.style.transform = this.getMatrix();
    this.el.style.left = `${x.toFixed(1)}px`;
    this.el.style.top = `${y.toFixed(1)}px`;
  }

  getMatrix() {
    const zoom = this.zoom.toFixed(5);
    const x = this.x.toFixed(0);
    const y = this.y.toFixed(0);
    return `translate(${x}px, ${y}px) scale(${zoom})`;
  }
}

class Overlay {
  constructor(el) {
    this.el = el;
    this.title = document.querySelector(`#${el.id} > div:nth-child(1)`);
    this.content = document.querySelector(`#${el.id} > div:nth-child(2)`);
    this.text = document.querySelector(`#${el.id} > div:nth-child(3)`);
    this.exit = document.querySelector(`#${el.id} > div:nth-child(4)`);
    this.keyBindings = Overlay.keyBindings.bind(this);
    this.hide = Overlay.hide.bind(this);
    this.isShowing = false;

    this.onClick = Overlay.onClick.bind(this);
    this.exit.addEventListener('click', this.hide);
  }

  static onClick(e) {
    if (e.target === this.el) {
      this.hide();
    }
  }
  static hide() {
    this.el.classList.add('hidd');
    this.isShowing = false;
  }
  static keyBindings(e) {
    if (e.key === 'Escape') {
      this.hide();
    }
  }

  display(title, content, text, showExit = false) {
    // Clear elements
    this.title.innerHTML = '';
    this.content.innerHTML = '';
    this.text.innerHTML = '';

    // Set values
    this.title.innerHTML = title;
    if (content) { this.content.appendChild(content); }
    this.text.innerHTML = text;

    if (showExit) {
      this.exit.classList.remove('hidd');
      this.el.addEventListener('click', this.onClick);
      window.addEventListener('keypress', this.keyBindings);
    } else {
      this.el.removeEventListener('click', this.onClick);
      this.exit.classList.add('hidd');
    }

    this.el.classList.remove('hidd');
    this.isShowing = true;
  }
}
