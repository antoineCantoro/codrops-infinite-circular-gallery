import Image1 from './sources/images/1.jpg'
import Image2 from './sources/images/2.jpg'
import Image3 from './sources/images/3.jpg'
import Image4 from './sources/images/4.jpg'
import Image5 from './sources/images/5.jpg'
import Image6 from './sources/images/6.jpg'

import './style.css'
import { Renderer, Camera, Transform, Plane } from 'ogl'
import Media from './sources/scripts/classes/Media'

export default class App {
  constructor() {
    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0
    }
    
    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

    this.createGeometry()
    this.createMedias()

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
    this.gl.clearColor(0.79607843137, 0.79215686274, 0.74117647058, 1)
    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    })
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    })
  }

  createMedias() {
    this.mediaImages = [
      { image: Image1, title: 'Image 1' },
      { image: Image2, title: 'Image 2' },
      { image: Image3, title: 'Image 3' },
      { image: Image4, title: 'Image 4' },
      { image: Image5, title: 'Image 5' },
      { image: Image6, title: 'Image 6' }
    ]

    this.medias = this.mediaImages.map(({ image, title }, index) => {
      const media = new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image,
        index,
        length: this.mediaImages.length,
        scene: this.scene,
        screen: this.screen,
        title,
        viewport: this.viewport
      })

      return media
    })
  }

  /**
   * Events
   */

  onTouchDown (event) {
      
  }
 
  onTouchMove (event) {
      
  }
 
  onTouchUp (event) {
      
  }
 
  onWheel (event) {
      
  }

  onResize() {

    // Get new screen sizes
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth
    }
    
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.viewport = {
      height,
      width
    }

    // Update all meshes
    if (this.medias) {
      this.medias.forEach(media => media.onResize({
        screen: this.screen,
        viewport: this.viewport
      }))
    }
  }

  /**
   * Update
   */

  update() {
    window.requestAnimationFrame(this.update.bind(this))
    
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, this.direction))
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    })
  }

  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this))

    window.addEventListener('mousewheel', this.onWheel.bind(this))
    window.addEventListener('wheel', this.onWheel.bind(this))
 
    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))
 
    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))
  }

}

new App()