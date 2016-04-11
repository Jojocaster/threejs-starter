import THREE from 'three';
window.THREE = THREE;
import WAGNER from '@superguigui/wagner';
// const VignettePass = require('./postprocessing/vignette-white/VignettePass');
const FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPASS');
const VignettePass = require('@superguigui/wagner/src/passes/vignette/VignettePass');
import Cube from './objects/Cube';

export default class Webgl {
  constructor(params) {
    this.params = {
      postProcessing: params.postProcessing || false,
      keyboard: params.keyboard || false,
      mouse: params.mouse || false,
      touch: params.touch || false,
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, params.size.width / params.size.height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(params.size.width, params.size.height);
    this.renderer.setClearColor(0x262626);

    this.composer = null;
    this.initPostprocessing();

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);
  }

  initPostprocessing() {
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    window.composer = this.composer;

    // Passes
    this.fxaaPass = new FXAAPass();
    this.vignettePass = new VignettePass();

  }
  render() {
    if (this.params.postProcessing) {
      this.composer.reset();
      this.composer.render(this.scene, this.camera);

      // Passes
      this.composer.pass(this.fxaaPass);
      this.composer.pass(this.vignettePass);
      this.composer.toScreen();

    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.cube.update();
  }
  // Events
  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
  keyPress() {
    if (!this.params.keyboard) return;
    console.log('keyPress');
  }
  keyDown() {
    if (!this.params.keyboard) return;
    console.log('keyDown');
  }
  keyUp() {
    if (!this.params.keyboard) return;
    console.log('keyUp');
  }
  click() {
    if (!this.params.mouse) return;
    console.log('click');
  }
  mouseMove() {
    if (!this.params.mouse) return;
    console.log('mousemove');
  }
  touchStart() {
    if (!this.params.touch) return;
    console.log('touchstart');
  }
  touchEnd() {
    if (!this.params.touch) return;
    console.log('touchend');
  }
  touchMove() {
    if (!this.params.touch) return;
    console.log('touchmove');
  }

}
