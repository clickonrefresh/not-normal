import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
const textureloader = new THREE.TextureLoader()

const doorColorTexture = textureloader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureloader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureloader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureloader.load('/textures/door/height.jpg')
const doorNormalTexture = textureloader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureloader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureloader.load('/textures/door/roughness.jpg')

const matcapTexture = textureloader.load('/textures/matcaps/7.png')
const matcapTexture1 = textureloader.load('/textures/matcaps/8.png')
const gradientTexture = textureloader.load('/textures/gradients/3.png')



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects - meshes & materials
 */

// Mesh Basic material

// const material = new THREE.MeshBasicMaterial()
// Material Mapping
// material.map = doorColorTexture
// // material.color = new THREE.Color('violet')
// material.color.set('white')
// material.wireframe = true
// material.opacity = 0.6
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.BackSide DoubleSide FrontSide - These arent good for performance


// Mesh Normals material - normals contain data about the direction of reflection and refraction of light of the outside surface of the geometry
const material = new THREE.MeshNormalMaterial()
// material.map = doorNormalTexture
// material.wireframe = true
material.smoothShading = true


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = 1

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    material
)
plane.position.z = -4


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.y = 1

const material1 = new THREE.MeshMatcapMaterial()
material1.matcap = matcapTexture
const torus1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    material1
)
torus1.position.y = -1


const material3 = new THREE.MeshMatcapMaterial()
material3.matcap = matcapTexture1
const plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    material3
)
plane1.position.z = -2

const material2 = new THREE.MeshNormalMaterial()
const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.0, 0.4, 40, 132, 32),
    material2
)
material2.wireframe = true
torus2.position.z = 2


const material4 = new THREE.MeshDepthMaterial()
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 150, 150),
    material4
)
material4.wireframe = true
// sphere1.position.x = -2
sphere1.position.z = 9


scene.add(sphere, sphere1, plane, plane1, torus, torus1, torus2)



/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xfffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = -2
pointLight.position.y = 3
pointLight.position.z = -4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 20
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update Obkects
    sphere.rotation.y = 0.1 * elapsedTime
    sphere.rotation.x = 0.17 * elapsedTime
    sphere1.rotation.y = 0.17 * elapsedTime
    plane.rotation.y = 0.11 * elapsedTime
    plane.rotation.x = 0.3 * elapsedTime
    torus.rotation.y = 0.16 * elapsedTime
    torus.rotation.z = 0.12 * elapsedTime
    torus1.rotation.y = 0.16 * elapsedTime
    torus1.rotation.z = -0.12 * elapsedTime
    torus2.rotation.z = -0.16 * elapsedTime
    // torus2.rotation.z = 0.12 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()