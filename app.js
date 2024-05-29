import './style.css'
import { Renderer, Camera, Transform } from 'ogl'

export default class App {
  constructor() {
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createMesh()

    this.onResize()
    this.update()
    this.addListeners()
  }
  /*
   * Creates
   */

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    this.gl = this.renderer.gl
    this.gl.clearColor(1, 0, 1, 1)
    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createMesh() {
    this.geometry = new Transform()
    this.geometry.position.y = 1
    this.scene.addChild(this.geometry)

    this.geometry.addChild(new Transform())
  }

  /**
   * Events
   */



  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: this.renderer.width / this.renderer.height
    })
  }

  update() {
    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    })

    requestAnimationFrame(this.update.bind(this))
  }

  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

}

new App()