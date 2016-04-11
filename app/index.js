import WebGL from './WebGL';
import deviceType from 'ua-device-type';
import domReady from 'domready';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

// Vars
window.DEBUG = true;
let device;
let webGL;
let gui;


function animate() {
  raf(animate);
  webGL.render();
}

// Events
function resize() {
  webGL.resize(window.innerWidth, window.innerHeight);
}
// KeyBoard
function keyPress(e) {
  webGL.keyPress(e);
}
function keyDown(e) {
  webGL.keyDown(e);
}
function keyUp(e) {
  webGL.keyUp(e);
}
// Mouse
function click(e) {
  webGL.click(e.clientX, e.clientY, e.timeStamp);
}
function mouseMove(e) {
  webGL.mouseMove(e.touches);
}
// Touch
function touchStart(e) {
  webGL.touchStart(e.touches);
}
function touchEnd(e) {
  webGL.touchEnd(e.touches);
}
function touchMove(e) {
  webGL.touchMove(e.touches);
}

domReady(() => {
  device = deviceType(navigator.userAgent);
  document.querySelector('html').classList.add(device);
  // WebGL
  webGL = new WebGL({
    device,
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    keyboard: false,
    mouse: false,
  });
  document.body.appendChild(webGL.renderer.domElement);

  if (window.DEBUG) {
    gui = new dat.GUI();
    const webGLFolder = gui.addFolder('WebGL');
    webGLFolder.add(webGL.params, 'postProcessing');
    webGLFolder.add(webGL.params, 'keyboard');
    webGLFolder.add(webGL.params, 'mouse');
    webGLFolder.add(webGL.params, 'touch');
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
