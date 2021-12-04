import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import typefaceFont from 'three/examples/fonts/optimer_regular.typeface.json'
// console.log(typefaceFont)
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

import GUI from 'lil-gui'
// import {Pane} from 'tweakpane';


/**
 * Debug UI
 */

const gui = new GUI()
// const pane = new Pane();

/**
 * Textures
 */
const textureloader = new THREE.TextureLoader()

const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureloader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureloader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureloader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureloader.load('/textures/door/height.jpg')
const doorNormalTexture = textureloader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureloader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureloader.load('/textures/door/roughness.jpg')

const matcapTexture = textureloader.load('/textures/matcaps/3.png')
const matcapTexture1 = textureloader.load('/textures/matcaps/8.png')
const gradientTexture = textureloader.load('/textures/gradients/3.jpg')

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false


const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg',
])



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
plane.position.z = -2


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.y = 1

//


const material1 = new THREE.MeshMatcapMaterial()
material1.matcap = matcapTexture
const torus1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    material1
)
torus1.position.y = -1


//

const material3 = new THREE.MeshMatcapMaterial()
material3.matcap = matcapTexture1
const plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(70, 33),
    material3
)
plane1.position.z = -3

//

const material2 = new THREE.MeshNormalMaterial()
const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.0, 0.4, 40, 132, 32),
    material2
)
material2.wireframe = true
torus2.position.z = 3
//




const material4 = new THREE.MeshDepthMaterial()
const material4a = new THREE.MeshDepthMaterial()
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 150, 150),
    material4
)
material4.wireframe = true
// sphere1.position.x = -2
sphere1.position.z = 9
// OVER HERE LAST

/**
 * Mesh Lambert Material - requires ambient lighting and point light, ie requires occlusion to look right. Has good performance but strange visual effect.
 */
const material5 = new THREE.MeshLambertMaterial()
material5.color = new THREE.Color('yellow')
const torus3 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    material5
)

torus3.position.z = 2

// here now


/**
 * Phong Material - just the opposite of Lambert, use phong for objects that need higher definition/quality than objects out of focus or not of focal value
 */
const material6 = new THREE.MeshPhongMaterial()
material6.shininess = 800
material6.specular = new THREE.Color(0x1188ff)
material6.color = new THREE.Color('green')
const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 15, 15),
    material6
)

sphere2.position.z = 3.5

// done

/**
 * Toon Material - just the opposite of Lambert, use phong for objects that need higher definition/quality than objects out of focus or not of focal value
 */


const material7 = new THREE.MeshToonMaterial()
material7.gradientMap = gradientTexture
material7.color = new THREE.Color('violet')
const torus4 = new THREE.Mesh(
    new THREE.TorusGeometry(0.4, 0.2, 16, 32),
    material7,

)
torus4.position.x = -1
// torus4.position.z = 11


// done

/**
 * 
 */
/**
 * Standard Material - more realistic than phong and lambert. * has features like metalness and roughness *
 */
const material8 = new THREE.MeshStandardMaterial()
material8.metalness = 0.5
material8.roughness = 0.5
material8.map = doorColorTexture
material8.aoMap = doorAmbientOcclusionTexture
material8.aoMapIntensity = 1
material8.displacementMap = doorHeightTexture
material8.displacementScale = 0.05
material8.metalnessMap = doorMetalnessTexture
material8.roughnessMap = doorRoughnessTexture
material8.normalMap = doorNormalTexture
material8.normalScale.set(0.5, 0.5)

material8.transparent = true
material8.alphaMap = doorAlphaTexture


gui.add(material8, 'metalness').min(0).max(1).step(0.0001)
gui.add(material8, 'roughness').min(0).max(1).step(0.0001)
gui.add(material8, 'aoMapIntensity').min(0).max(10).step(0.001)
gui.add(material8, 'displacementScale').min(0).max(1).step(0.0001) //displace is also normal

const material8a = new THREE.MeshStandardMaterial()
material8a.metalness = 0.5
material8a.roughness = 0.5
material8a.map = doorColorTexture
material8a.aoMap = doorAmbientOcclusionTexture
material8a.aoMapIntensity = 1
// material8a.displacementMap = doorHeightTexture
// material8a.displacementScale = 0.05
material8a.metalnessMap = doorMetalnessTexture
material8a.roughnessMap = doorRoughnessTexture
material8a.normalMap = doorNormalTexture
// material8a.normalScale.set(0.5, 0.5)
// material8a.transparent = true
// material8a.alphaMap = doorAlphaTexture


// const torus5 = new THREE.Mesh(
//     new THREE.TorusGeometry(0.9, 0.2, 64, 64, 64),
//     material8
// )
// torus5.position.z = 5.5

// torus5.geometry.setAttribute(
//     'uv2', 
//     new THREE.BufferAttribute(torus5.geometry.attributes.uv.array, 2))


const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 5, 5),
    material8
)
plane2.position.z = 11

// console.log(plane2.geometry.attributes.uv.array)
plane2.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane2.geometry.attributes.uv.array, 2))

// here
/**
 * Physical Material - provides clearcoat, more gpu intensive
 */
 const material9 = new THREE.MeshPhysicalMaterial()
 material9.clearcoat = 0.5
 material9.color = new THREE.Color('orange')
 material9.smoothShading =true
 const sphere3 = new THREE.Mesh(
     new THREE.SphereGeometry(0.5, 16, 16),
     material9
 )
 
 sphere3.position.z = 6.5

// here

/**
 * EnvironmentMap
 */
 const material10 = new THREE.MeshStandardMaterial()
 material10.metalness = 0.7
 material10.roughness = 0.2
material10.envMap = environmentMapTexture

 gui.add(material10, 'metalness').min(0).max(1).step(0.0001)
 gui.add(material10, 'roughness').min(0).max(1).step(0.0001)

 const sphere4 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material10
)
sphere4.position.x = 1
sphere4.position.z = 15

const plane3 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    material10
)
plane3.position.x = -2
plane3.position.z = 15

const torus5 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material10
)
torus5.position.y = 1
torus5.position.z = 15
// done

scene.add(sphere, sphere1, sphere2, sphere3, sphere4, plane, plane1, plane2, plane3, torus, torus1, torus2, torus3, torus4, torus5)



/**
 * Fonts
 */
 const fontLoader = new FontLoader()

 fontLoader.load(
     '/fonts/optimer_regular.typeface.json',
     (font) =>
     {

         const textGeometry = new TextGeometry(
             'Sphere Mesh Normal Material with SmoothShading',
             {
                font,
                size: 0.07,
                height: 0.01,
                curveSegments: 4,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,
 
             }
         );
         const textGeometry1 = new TextGeometry(
            'Plane Mesh Normal Material with SmoothShading',
            {
                font,
                size: 0.1,
                height: 0.02,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 3,

            }
        );
         const textGeometry2 = new TextGeometry(
            'Torus Mesh Normal Material',
            {
                font,
                size: 0.1,
                height: 0.02,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 3,

            }
        )
         const textGeometry3 = new TextGeometry(
            'Torus Mesh Matcap Material',
            {
                font,
                size: 0.1,
                height: 0.02,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 3,

            }
        )
         const textGeometry4 = new TextGeometry(
            'Plane Mesh Matcap Material',
            {
                font,
                size: 1,
                height: 0.13,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 3,

            }
        )
         const textGeometry5 = new TextGeometry(
            'Torus Mesh Normal Material - Wireframe',
            {
                font,
                size: 0.2,
                height: 0.04,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry6 = new TextGeometry(
            'Sphere Mesh Depth Material - Wireframe',
            {
                font,
                size: 0.07,
                height: 0.01,
                curveSegments: 4,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry7 = new TextGeometry(
            'Torus Mesh Lambert Material',
            {
                font,
                size: 0.06,
                height: 0.01,
                curveSegments: 3,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry8 = new TextGeometry(
            'Sphere Mesh Phong Material',
            {
                font,
                size: 0.06,
                height: 0.01,
                curveSegments: 3,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry9 = new TextGeometry(
            'Torus Mesh Toon Material',
            {
                font,
                size: 0.07,
                height: 0.01,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry10 = new TextGeometry(
            'Plane Mesh Standard Material with maps',
            {
                font,
                size: 0.075,
                height: 0.015,
                curveSegments: 5,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry11 = new TextGeometry(
            'Sphere Mesh Physical Material with Clearcoat',
            {
                font,
                size: 0.075,
                height: 0.015,
                curveSegments: 5,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometry12 = new TextGeometry(
            ' Environment Maps',
            {
                font,
                size: 0.09,
                height: 0.02,
                curveSegments: 5,
                bevelEnabled: false,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
         const textGeometryLink = new TextGeometry(
            'Explore Threejs Basic Geometries & Textures',
            {
                font,
                size: 0.7,
                height: 0.04,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        )
        

        //  const textMaterial = new THREE.MeshBasicMaterial()
        //  textMaterial.normalMap = true
         const text = new THREE.Mesh(textGeometry, material)
         text.position.x = 2.7
         textGeometry.center()


         const text1 = new THREE.Mesh(textGeometry1, material)
         text1.position.z = -2
         textGeometry1.center()


         const text2 = new THREE.Mesh(textGeometry2, material)
         text2.position.y = 1
         textGeometry2.center()


         const text3 = new THREE.Mesh(textGeometry3, material1)
         text3.position.y = -2
         textGeometry3.center()



         const text4 = new THREE.Mesh(textGeometry4, material3)
         text4.position.z = -2.95
         text4.position.y = -5
         textGeometry4.center()


         const text5 = new THREE.Mesh(textGeometry5, material2)
         text5.position.z = 3.5
         text5.position.y = 1
         textGeometry5.center()


         const text6 = new THREE.Mesh(textGeometry6, material4a)
         text6.position.z = 9
        //  text6.position.y = 1
         textGeometry6.center()


         const text7 = new THREE.Mesh(textGeometry7, material5)
         text7.position.z = 2.9
        //  text6.position.y = 1
         textGeometry7.center()


         const text8 = new THREE.Mesh(textGeometry8, material6)
         text8.position.z = 4
        //  text6.position.y = 1
         textGeometry8.center()


         const text9 = new THREE.Mesh(textGeometry9, material7)
         text9.position.x = - 2.3
         textGeometry9.center()


         const text10= new THREE.Mesh(textGeometry10, material8a)
         text10.position.z =  11.3
         textGeometry10.center()


         const text11= new THREE.Mesh(textGeometry11, material9)
         text11.position.z =  7.1
         textGeometry11.center()


         const text12= new THREE.Mesh(textGeometry12, material10)
         text12.position.z =  15
         textGeometry12.center()
 
         const textLink = new THREE.Mesh(textGeometryLink, material3)
         
        //  textLink.position.x = -8
         textLink.position.z = 8
         textGeometryLink.center()

         // text.rotation.y = 0.1 rotation here only affexcts the positioning
         scene.add(text, text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12, textLink )
 
     }
 )
 


/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = -2
pointLight.position.y = 3
pointLight.position.z = 4


const pointLight1 = new THREE.PointLight(0xffffff, 0.6)
pointLight1.position.x = 2
pointLight1.position.y = -1
pointLight1.position.z = 17


const pointLight2 = new THREE.PointLight(0xffffff, 0.3)
pointLight2.position.x = -1
pointLight2.position.y = -1
pointLight2.position.z = 1

scene.add(pointLight, pointLight1, pointLight2)


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
camera.position.z = 12.5
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

    // Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    sphere.rotation.x = 0.17 * elapsedTime
    sphere1.rotation.y = 0.17 * elapsedTime
    plane.rotation.y = 0.11 * elapsedTime
    plane.rotation.x = 0.3 * elapsedTime
    torus.rotation.y = -0.16 * elapsedTime
    torus.rotation.z = -0.12 * elapsedTime
    torus1.rotation.y = 0.16 * elapsedTime
    torus1.rotation.z = -0.12 * elapsedTime
    torus2.rotation.z = -0.16 * elapsedTime
    // torus2.rotation.z = 0.12 * elapsedTime
    torus4.rotation.x = 0.09 * elapsedTime
    // text.rotation.x = 0.09 * elapsedTime



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
