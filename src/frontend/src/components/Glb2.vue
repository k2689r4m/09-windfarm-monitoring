<template>
  <div ref="container"></div>
</template>
<script>
import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

let scene = null
let camera = null
let controls = null
let loader = null
let renderer = null
let labelRenderer = null
let mixer = null
let light = null
let clock = null
let animations = []

export default {
  name: 'App',
  props: {
    path: {
      type: String
    },
    cPo: {
      type: Object
    },
    oPo: {
      type: Object
    }
  },
  components: {},
  computed: {},
  data() {
    return {
      renderSize: { w: window.innerWidth, h: window.innerHeight }
    }
  },
  created() {
    // const ddd = require('../assets/yaw_gltf.gltf');
    // console.log(ddd);
  },
  async mounted() {
    // this.init()
    this.testLoader()
  },
  beforeUnmount() {
    // scene.children.forEach((e) => {
    //   e.dispose()
    //   scene.remove(e)
    // })
    // console.log(window.scene)
    // console.log(window.scene.group)
    // renderer.dispose()
    // scene = null
    // camera = null
    // controls = null
    // loader = null
    // renderer = null
    // labelRenderer = null
    // mixer = null
    // light = null
    // clock = null
    // animations = []
  },
  methods: {
    init() {
      clock = new THREE.Clock()
      scene = null
      mixer = null
      animations = []

      this.setRenderer()

      const container = this.$refs.container
      scene = new THREE.Scene()
      container.appendChild(renderer.domElement)

      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = '0px'
      labelRenderer.domElement.style.pointerEvents = 'none'
      container.appendChild(labelRenderer.domElement)

      this.setCamaera()

      controls = new OrbitControls(camera, this.$refs.container)
      controls.enableDamping = true
      // controls.enablePan = false
      controls.update()

      this.setLight()

      this.loadGTLF()
      this.animate()
    },
    setRenderer() {
      renderer = new THREE.WebGLRenderer({
        alpha: true, //배경을 투명하게 처리할지 여부를 설정. true는 투명하게.
        antialias: true
      })

      renderer.setSize(this.renderSize.w, this.renderSize.h)

      renderer.outputEncoding = THREE.sRGBEncoding

      labelRenderer = new CSS2DRenderer()
      labelRenderer.setSize(this.renderSize.w, this.renderSize.h)
    },
    setCamaera() {
      camera = new THREE.PerspectiveCamera(100, this.renderSize.w / this.renderSize.h, 0.1, 1000)

      camera.position.x = this.cPo.x
      camera.position.y = this.cPo.y
      camera.position.z = this.cPo.z

      const axes = new THREE.AxesHelper(5)
      scene.add(axes)
      //window.scene.background = new THREE.Color('white');
    },
    setLight() {
      //   let ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
      //   window.scene.add(ambientLight)
      // let directionalLightBack = new THREE.DirectionalLight(
      //   new THREE.Color('hsl(0, 0%, 100%)'),
      //   0.5
      // )
      // directionalLightBack.position.set(30, 100, 100)
      // scene.add(directionalLightBack)

      // let directionalLightFront = new THREE.DirectionalLight(
      //   new THREE.Color('hsl(0, 0%, 100%)'),
      //   0.25
      // )
      // directionalLightFront.position.set(-30, 100, -100)
      // scene.add(directionalLightFront)

      const light = new THREE.DirectionalLight(0xffffff, 10)
      light.position.set(1, 1, 1).normalize()
      scene.add(light)

      const ambientLight = new THREE.AmbientLight(0xffffff, 1) // 환경광 추가
      scene.add(ambientLight)
    },
    async testLoader() {
      let mesh, renderer, scene, camera, controls
      let gui,
        guiExposure = null

      const params = {
        exposure: 1.0,
        toneMapping: 'AgX',
        blurriness: 0.3,
        intensity: 1.0,

        metalness: 0.1,
        roughness: 0.1,
        ambientIntensity: 0.8,
        lightIntensity: 8.5
      }

      const toneMappingOptions = {
        None: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping,
        AgX: THREE.AgXToneMapping,
        Neutral: THREE.NeutralToneMapping,
        Custom: THREE.CustomToneMapping
      }

      let container = this.$refs.container

      init().catch(function (err) {
        console.error(err)
      })

      async function init() {
        renderer = new THREE.WebGLRenderer({ antialias: true })
        // renderer = new THREE.WebGLRenderer({
        //   alpha: true, //배경을 투명하게 처리할지 여부를 설정. true는 투명하게.
        //   antialias: true
        // })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        container.appendChild(renderer.domElement)
        //document.body.appendChild(renderer.domElement)

        renderer.toneMapping = toneMappingOptions[params.toneMapping]
        renderer.toneMappingExposure = params.exposure

        // Set CustomToneMapping to Uncharted2
        // source: http://filmicworlds.com/blog/filmic-tonemapping-operators/

        THREE.ShaderChunk.tonemapping_pars_fragment =
          THREE.ShaderChunk.tonemapping_pars_fragment.replace(
            'vec3 CustomToneMapping( vec3 color ) { return color; }',

            `#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )

              float toneMappingWhitePoint = 1.0;

              vec3 CustomToneMapping( vec3 color ) {
                color *= toneMappingExposure;
                return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );
            }`
          )

        scene = new THREE.Scene()
        scene.backgroundBlurriness = params.blurriness

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 10)

        controls = new OrbitControls(camera, renderer.domElement)
        controls.addEventListener('change', render) // use if there is no animation loop
        controls.enableZoom = true
        controls.enablePan = false
        controls.target.set(0, 0, -0.2)
        controls.update()

        //////////////////////////////////////////////////////////////////////////

        //   let ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
        //   window.scene.add(ambientLight)
        // let directionalLightBack = new THREE.DirectionalLight(
        //   new THREE.Color('hsl(0, 0%, 100%)'),
        //   0.5
        // )
        // directionalLightBack.position.set(30, 100, 100)
        // scene.add(directionalLightBack)

        // let directionalLightFront = new THREE.DirectionalLight(
        //   new THREE.Color('hsl(0, 0%, 100%)'),
        //   0.25
        // )
        // directionalLightFront.position.set(-30, 100, -100)
        // scene.add(directionalLightFront)

        const light = new THREE.DirectionalLight(0xffffff, params.lightIntensity)
        light.position.set(1, 1, 1).normalize()
        scene.add(light)

        const ambientLight = new THREE.AmbientLight(0xffffff, params.ambientIntensity) // 환경광 추가
        scene.add(ambientLight)

        //////////////////////////////////////////////////////////////////////////

        const rgbeLoader = new RGBELoader().setPath('test/1/')

        const gltfLoader = new GLTFLoader().setPath('test/1/')

        const [texture, gltf] = await Promise.all([
          rgbeLoader.loadAsync('test.hdr'),
          gltfLoader.loadAsync('DamagedHelmet.glb')
        ])
        // environment

        texture.mapping = THREE.EquirectangularReflectionMapping

        scene.background = texture
        scene.environment = texture

        // model
        // gearbox_final
        loader = new GLTFLoader()
        loader.load(
          'test/1/yaw.glb',
          function (gltf) {
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                // 금속성 및 거칠기 값 조정
                // child.material.metalness = 0.1 // 원하는 metalness 값으로 조정
                child.material.roughness = params.roughness // 원하는 roughness 값으로 조정
                child.material.metalness = params.metalness

                // child.material.color.set(0xffffff)

                if (child.material.map) {
                  child.material.map.encoding = THREE.sRGBEncoding
                }
              }
            })

            // console.log(gltf);

            // gltf.scene.position.x = oPo.x
            // gltf.scene.position.y = oPo.y
            // gltf.scene.position.z = oPo.z
            // gltf.scene.rotation.y = oPo.rY
            // gltf.scene.rotation.x = oPo.rX

            // gltf.scene.scale.set(
            //   1 * gltf.scene.scale.x,
            //   1 * gltf.scene.scale.y,
            //   1 * gltf.scene.scale.z
            // )

            scene.add(gltf.scene)

            render()
          },
          function (progress) {
            // console.log((progress.loaded / max) * 100);
            progress
          },
          function (error) {
            console.error(error)
          }
        )

        // mesh = gltf.scene.getObjectByName('node_damagedHelmet_-6514')
        // scene.add(mesh)

        render()

        window.addEventListener('resize', onWindowResize)

        gui = new GUI()
        const toneMappingFolder = gui.addFolder('tone mapping')

        toneMappingFolder
          .add(params, 'toneMapping', Object.keys(toneMappingOptions))

          .onChange(function () {
            updateGUI(toneMappingFolder)

            renderer.toneMapping = toneMappingOptions[params.toneMapping]
            render()
          })

        const backgroundFolder = gui.addFolder('background')

        backgroundFolder
          .add(params, 'blurriness', 0, 1)

          .onChange(function (value) {
            scene.backgroundBlurriness = value
            render()
          })

        backgroundFolder
          .add(params, 'intensity', 0, 1)

          .onChange(function (value) {
            scene.backgroundIntensity = value
            render()
          })

        updateGUI(toneMappingFolder)

        /////////////////////////////////////////////////////////////////////////
        const metalFolder = gui.addFolder('metal')
        metalFolder
          .add(params, 'metalness', 0, 1)

          .onChange(function (value) {
            scene.traverse((child) => {
              if (child.isMesh) {
                child.material.metalness = value
              }
            })

            render()
          })

        metalFolder
          .add(params, 'roughness', 0, 1)

          .onChange(function (value) {
            scene.traverse((child) => {
              if (child.isMesh) {
                child.material.roughness = value
              }
            })

            render()
          })

        const lightFolder = gui.addFolder('light')
        lightFolder
          .add(params, 'ambientIntensity', 0, 10)

          .onChange(function (value) {
            ambientLight.intensity = value

            render()
          })

        lightFolder
          .add(params, 'lightIntensity', 0, 10)

          .onChange(function (value) {
            light.intensity = value

            render()
          })

        /////////////////////////////////////////////////////////////////////////
        gui.open()
      }

      function updateGUI(folder) {
        if (guiExposure !== null) {
          guiExposure.destroy()
          guiExposure = null
        }

        if (params.toneMapping !== 'None') {
          guiExposure = folder
            .add(params, 'exposure', 0, 2)

            .onChange(function () {
              renderer.toneMappingExposure = params.exposure
              render()
            })
        }
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight

        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)

        render()
      }

      function render() {
        renderer.render(scene, camera)
      }
    },
    loadGTLF() {
      loader = new GLTFLoader()

      // const max = 38490280;

      const oPo = this.oPo
      loader.load(
        this.path,
        function (gltf) {
          // console.log(gltf);
          CSS2DObject

          gltf.scene.position.x = oPo.x
          gltf.scene.position.y = oPo.y
          gltf.scene.position.z = oPo.z
          gltf.scene.rotation.y = oPo.rY
          gltf.scene.rotation.x = oPo.rX

          gltf.scene.scale.set(
            1 * gltf.scene.scale.x,
            1 * gltf.scene.scale.y,
            1 * gltf.scene.scale.z
          )

          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              // 금속성 및 거칠기 값 조정
              child.material.metalness = 1 // 원하는 metalness 값으로 조정
              child.material.roughness = 0.1 // 원하는 roughness 값으로 조정

              if (child.material.map) {
                child.material.map.encoding = THREE.sRGBEncoding
              }
            }
          })

          gltf.scene.children.forEach((child) => {
            child.traverse((n) => {
              // Find the hotspots
              // console.log(n)

              // if (n.isMesh) {
              //   n.material.color.set(0xffffff)
              // }

              if (child.isMesh) {
                // child.material.map = texture
                // child.material.metalness = 0
                // child.material.side = THREE.DoubleSide
              }

              if (n.name && n.name.includes('pin')) {
                // console.log(n)
                const hotspot = document.createElement('div')
                hotspot.className = 'annotationLabel'
                hotspot.setAttribute('name', n.name)

                const name_ = n.name

                hotspot.innerHTML = name_.substring(name_.indexOf('{') + 1, name_.indexOf('}'))

                const hotspotLabel = new CSS2DObject(hotspot)
                hotspotLabel.position.set(0, 0, 0)
                n.add(hotspotLabel)
                hotspotLabel.layers.set(0)
              }
            })
          })

          scene.add(gltf.scene)

          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(gltf.scene)
            mixer.clipAction(gltf.animations[0]).play()
          }
        },
        function (progress) {
          // console.log((progress.loaded / max) * 100);
          progress
        },
        function (error) {
          console.error(error)
        }
      )
    },
    animate() {
      mixer?.update(clock.getDelta())
      requestAnimationFrame(this.animate)
      controls.update()
      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
    }
  }
}
</script>
