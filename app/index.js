import Webgl from './Webgl';
import deviceType from 'ua-device-type';
import domReady from 'domready';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

// Vars
window.DEBUG = true;
let device;
let webgl;
let gui;


function animate() {
  raf(animate);
  webgl.render();
}

// Events
function resize() {
  webgl.resize(window.innerWidth, window.innerHeight);
}
// KeyBoard
function keyPress(e) {
  webgl.keyPress(e);
}
function keyDown(e) {
  webgl.keyDown(e);
}
function keyUp(e) {
  webgl.keyUp(e);
}
// Mouse
function click(e) {
  webgl.click(e.clientX, e.clientY, e.timeStamp);
}
function mouseMove(e) {
  webgl.mouseMove(e.touches);
}
// Touch
function touchStart(e) {
  webgl.touchStart(e.touches);
}
function touchEnd(e) {
  webgl.touchEnd(e.touches);
}
function touchMove(e) {
  webgl.touchMove(e.touches);
}

domReady(() => {
  device = deviceType(navigator.userAgent);
  document.querySelector('html').classList.add(device);

  webgl = new Webgl({
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    keyboard: true,
    mouse: true,
  });
  document.body.appendChild(webgl.renderer.domElement);

  if (window.DEBUG) {
    gui = new dat.GUI();
    const webGLFolder = gui.addFolder('WebGL');
    webGLFolder.add(webgl.params, 'postProcessing');
    webGLFolder.add(webgl.params, 'keyboard');
    webGLFolder.add(webgl.params, 'mouse');
    webGLFolder.add(webgl.params, 'touch');
    webGLFolder.open();
  }

  // Events
  window.addEventListener('resize', resize);
  // KeyBoard
  window.addEventListener('keypress', keyPress);
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  // Mouse
  window.addEventListener('click', click);
  window.addEventListener('mousemove', mouseMove);
  // Touch
  window.addEventListener('touchstart', touchStart);
  window.addEventListener('touchend', touchEnd);
  window.addEventListener('touchmove', touchMove);

  // let's start
  animate();
});
