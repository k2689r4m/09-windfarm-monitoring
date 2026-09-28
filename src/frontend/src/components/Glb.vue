<template>
    <!-- <div> -->
    <!-- <div v-if="loading" class="loading-content">
            <span class="loader"></span>
        </div> -->
    <div ref="container"></div>
    <!-- </div> -->
</template>
<script>
import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { markRaw } from 'vue'

let scene = null
let camera = null
let controls = null
let loader = null
let renderer = null
let labelRenderer = null
let gui,
    guiExposure = null
let mixer = null
let light = null
let clock = null
let animationId = null
let animations = []

const DB_NAME = 'glbDatabase'
const STORE_NAME = 'glb'

export default {
    name: 'App',
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        path: {
            type: String
        },
        cPo: {
            type: Object,
            default: { x: 0, y: 0, z: 0 }
        },
        oPo: {
            type: Object,
            default: { x: 0, y: 0, z: 0, rX: 0, rY: 0 }
        },
        scale: {
            type: Number,
            default: 1
        },
        speed: {
            type: Number,
            default: 0
        },
        videoST: {
            type: Boolean,
            default: true
        }
    },
    components: {},
    computed: {},
    data() {
        return {
            loadingProgress: 0,

            renderSize: { w: window.innerWidth, h: window.innerHeight },
            controller: null,

            abortController: null, // AbortController 인스턴스 저장
            mixer: null, // AnimationMixer를 저장할 변수
            clock: new THREE.Clock(), // 애니메이션 시간을 추적할 Clock
            renderer: null, // 렌더러 저장
            scene: null, // 씬 저장
            camera: null, // 카메라 저장
            animationId: null, // requestAnimationFrame ID 저장
            controls: null,
            model: null,

            pinElements: [],

            params: {
                exposure: 1.0,
                toneMapping: 'AgX',
                blurriness: 0.3,
                intensity: 1.0,

                metalness: 0.1,
                roughness: 0.1,
                ambientIntensity: 0.8,
                lightIntensity: 8.5
            },
            toneMappingOptions: {
                None: THREE.NoToneMapping,
                Linear: THREE.LinearToneMapping,
                Reinhard: THREE.ReinhardToneMapping,
                Cineon: THREE.CineonToneMapping,
                ACESFilmic: THREE.ACESFilmicToneMapping,
                AgX: THREE.AgXToneMapping,
                Neutral: THREE.NeutralToneMapping,
                Custom: THREE.CustomToneMapping
            }
        }
    },
    created() {
        // const ddd = require('../assets/yaw_gltf.gltf');
        // console.log(ddd);
    },
    async mounted() {
        // STORE_NAME = this.path
        this.initThree()
        // this.checkIndexedDBForBack()
        this.checkIndexedDBForGLB()
    },
    beforeUnmount() {
        // console.log('beforeUnmount')
        this.cleanup()
    },
    beforeUnmount() {
        // console.log('beforeDestroy')
        this.cleanup()
    },
    methods: {
        async checkIndexedDBForBack() {
            try {
                const storedGLB = await this.$loadGLBFromIndexedDB('back')

                if (storedGLB) {
                    // console.log('Back found in IndexedDB. Loading from IndexedDB...')
                    this.loadFromBackIndexedDB(storedGLB)
                } else {
                    // console.log('No Back in IndexedDB. Fetching from server...')
                    this.loadBackFromServer()
                }
            } catch (error) {
                // console.error('Error loading Back from IndexedDB:', error)
                this.loadBackFromServer()
            }
        },
        async checkIndexedDBForGLB() {
            try {
                const storedGLB = await this.$loadGLBFromIndexedDB(this.path)

                if (storedGLB) {
                    // IndexedDB에 데이터가 있을 때
                    console.log('GLB found in IndexedDB. Loading from IndexedDB...')
                    this.loadFromIndexedDB(storedGLB)
                } else {
                    // IndexedDB에 데이터가 없을 때
                    console.log('No GLB in IndexedDB. Fetching from server...')
                    this.loadGLBModelFromServer()
                }
            } catch (error) {
                console.error('Error loading GLB from IndexedDB:', error)
                this.loadGLBModelFromServer()
            }
        },
        initThree() {
            // 1. 씬(Scene) 생성
            this.scene = markRaw(new THREE.Scene())
            this.scene.backgroundBlurriness = this.params.blurriness

            // 2. 카메라(Camera) 생성
            this.camera = markRaw(
                new THREE.PerspectiveCamera(
                    75, // 시야각
                    window.innerWidth / window.innerHeight, // 종횡비
                    0.1, // 근경
                    1000 // 원경
                )
            )
            this.camera.position.set(this.cPo.x, this.cPo.y, this.cPo.z)

            // 3. 렌더러(Renderer) 생성
            this.renderer = markRaw(
                new THREE.WebGLRenderer({
                    alpha: true, //배경을 투명하게 처리할지 여부를 설정. true는 투명하게.
                    antialias: true
                })
            )
            this.renderer.shadowMap.enabled = true
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.$refs.container.appendChild(this.renderer.domElement)

            this.renderer.toneMapping = this.toneMappingOptions[this.params.toneMapping]
            this.renderer.toneMappingExposure = this.params.exposure

            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            // controls.addEventListener('change', render) // use if there is no animation loop
            this.controls.enableZoom = true
            this.controls.enablePan = true
            this.controls.target.set(0, 0, -0.2)
            this.controls.update()

            // 4. 조명 추가
            const light = new THREE.DirectionalLight(0xffffff, this.params.lightIntensity)
            light.position.set(1, 1, 1).normalize()
            light.castShadow = true
            this.scene.add(light)

            const ambientLight = new THREE.AmbientLight(0xffffff, this.params.ambientIntensity) // 환경광 추가
            this.scene.add(ambientLight)

            // const axes = new THREE.AxesHelper(5)
            // this.scene.add(axes)

            // const rgbeLoader = new RGBELoader()
            // rgbeLoader.load(`test/1/test.hdr`, (texture) => {
            //     texture.mapping = THREE.EquirectangularReflectionMapping

            //     this.scene.background = texture
            //     this.scene.environment = texture
            // })

            // this.loadBackFromServer()
        },
        loadBackFromServer() {
            fetch(`test/1/test.hdr`)
                .then((response) => response.blob()) // 파일을 Blob으로 변환
                .then((blob) => {
                    // Blob을 가상 URL로 변환
                    this.$storeGLBInIndexedDB('back', blob)
                    const objectURL = URL.createObjectURL(blob)
                    const rgbeLoader = new RGBELoader()

                    rgbeLoader.load(objectURL, (texture) => {
                        texture.mapping = THREE.EquirectangularReflectionMapping

                        this.scene.background = texture
                        this.scene.environment = texture
                    })
                })
        },
        loadFromBackIndexedDB(back) {
            const objectURL = URL.createObjectURL(back)
            const rgbeLoader = new RGBELoader()
            rgbeLoader.load(objectURL, (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping

                this.scene.background = texture
                this.scene.environment = texture
            })
        },
        loadGLBModelFromServer() {
            const manager = new THREE.LoadingManager()

            // 로딩이 시작되었을 때
            manager.onStart = (url, itemsLoaded, itemsTotal) => {
                console.log(`Started loading file: ${url}.`)
                this.loadingProgress = 0 // 초기화
            }

            // 로딩 진행 상황을 업데이트
            manager.onProgress = (url, itemsLoaded, itemsTotal) => {
                this.loadingProgress = (itemsLoaded / itemsTotal) * 100
                console.log(`Loading file: ${url}. Progress: ${this.loadingProgress}%`)
            }

            // 로딩이 완료되었을 때
            manager.onLoad = () => {
                console.log('All files loaded.')
                // this.loading = false // 로딩 상태를 false로 변경

                this.$emit('loadingSet', false)
            }

            // 로딩 오류가 발생했을 때
            manager.onError = (url) => {
                console.error(`There was an error loading ${url}`)
            }

            // 5. AbortController 설정
            this.abortController = new AbortController()
            const { signal } = this.abortController

            fetch(`model/${this.path}`)
                .then((response) => response.blob()) // 파일을 Blob으로 변환
                .then((blob) => {
                    // Blob을 가상 URL로 변환
                    this.$storeGLBInIndexedDB(this.path, blob)
                    const objectURL = URL.createObjectURL(blob)
                    const loader = new GLTFLoader(manager)

                    loader.load(
                        objectURL,
                        (gltf) => {
                            this.model = markRaw(gltf.scene)
                            this.scene.add(this.model)

                            // 7. AnimationMixer 설정
                            this.mixer = new THREE.AnimationMixer(this.model)

                            // 애니메이션 클립이 있을 경우 재생
                            if (gltf.animations.length > 0) {
                                const action = this.mixer.clipAction(gltf.animations[0]) // 첫 번째 애니메이션 클립을 사용
                                action.play() // 애니메이션 재생

                                // action.timeScale = 5
                            }

                            this.model.traverse((child) => {
                                if (child.isMesh) {
                                    child.material.roughness = this.params.roughness
                                    child.material.metalness = this.params.roughness
                                    child.castShadow = true // 그림자를 생성
                                    child.receiveShadow = true // 그림자를 수신

                                    if (child.material.map) {
                                        child.material.map.encoding = THREE.sRGBEncoding
                                    }
                                }
                            })

                            this.model.position.x = this.oPo.x
                            this.model.position.y = this.oPo.y
                            this.model.position.z = this.oPo.z
                            this.model.rotation.y = this.oPo.rY
                            this.model.rotation.x = this.oPo.rX

                            this.model.scale.set(
                                this.scale * this.model.scale.x,
                                this.scale * this.model.scale.y,
                                this.scale * this.model.scale.z
                            )

                            gltf.scene.children.forEach((child) => {
                                child.traverse((node) => {
                                    // Find the hotspots
                                    if (node.isMesh && node.name.includes('pin')) {
                                        // 3D 핀 위치를 가져옴
                                        const pinPosition = node.getWorldPosition(
                                            new THREE.Vector3()
                                        )

                                        // HTML 요소 생성
                                        const pinElement = document.createElement('div')
                                        pinElement.style.position = 'absolute'
                                        pinElement.style.width = '8px' // 동그라미 크기
                                        pinElement.style.height = '8px'
                                        pinElement.style.borderRadius = '50%' // 동그라미 모양
                                        pinElement.style.cursor = 'pointer'
                                        pinElement.setAttribute(
                                            'data-name',
                                            node.name.substring(
                                                node.name.indexOf('{') + 1,
                                                node.name.indexOf('}')
                                            )
                                        )
                                        document.body.appendChild(pinElement)

                                        // 클릭 이벤트 추가
                                        pinElement.addEventListener('click', () => {
                                            this.$btnOnRouter(this.$getAlarmPath(_name))
                                            // console.log(`Pin clicked: ${node.name}`)
                                            // alert(`Pin clicked: ${node.name}`)
                                        })

                                        // 핀 정보를 저장
                                        this.pinElements.push({
                                            element: pinElement,
                                            position: pinPosition
                                        })

                                        // const hotspot = document.createElement('div')
                                        // hotspot.className = 'annotationLabel'
                                        // hotspot.setAttribute('name', n.name)

                                        // const name_ = n.name

                                        // hotspot.innerHTML = name_.substring(
                                        //     name_.indexOf('{') + 1,
                                        //     name_.indexOf('}')
                                        // )

                                        // const hotspotLabel = new CSS2DObject(hotspot)
                                        // hotspotLabel.position.set(0, 0, 0)
                                        // n.add(hotspotLabel)
                                        // hotspotLabel.layers.set(0)
                                    }
                                })
                            })

                            // 초기 렌더링
                            // this.renderer.render(this.scene, this.camera)
                            this.animate()
                            // this.loading = false
                        },
                        (xhr) => {
                            // 로딩 중 진행률 업데이트
                            // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                        },
                        (error) => {
                            if (error.name === 'AbortError') {
                                console.log('GLB load aborted')
                            } else {
                                console.error('An error happened while loading the model:', error)
                            }
                        },
                        { signal } // AbortController의 signal 추가
                    )
                })
        },
        loadFromIndexedDB(storedGLB) {
            const manager = new THREE.LoadingManager()

            // 로딩이 시작되었을 때
            manager.onStart = (url, itemsLoaded, itemsTotal) => {
                console.log(`Started loading file: ${url}.`)
                this.loadingProgress = 0 // 초기화
            }

            // 로딩 진행 상황을 업데이트
            manager.onProgress = (url, itemsLoaded, itemsTotal) => {
                this.loadingProgress = (itemsLoaded / itemsTotal) * 100
                console.log(`Loading file: ${url}. Progress: ${this.loadingProgress}%`)
            }

            // 로딩이 완료되었을 때
            manager.onLoad = () => {
                console.log('All files loaded.')
                // this.loading = false // 로딩 상태를 false로 변경

                this.$emit('loadingSet', false)
            }

            // 로딩 오류가 발생했을 때
            manager.onError = (url) => {
                console.error(`There was an error loading ${url}`)
            }

            // 5. AbortController 설정
            this.abortController = new AbortController()
            const { signal } = this.abortController

            const objectURL = URL.createObjectURL(storedGLB)
            const loader = new GLTFLoader(manager)

            loader.load(
                objectURL,
                (gltf) => {
                    this.model = markRaw(gltf.scene)
                    this.scene.add(this.model)

                    // 7. AnimationMixer 설정
                    this.mixer = new THREE.AnimationMixer(this.model)

                    // 애니메이션 클립이 있을 경우 재생
                    if (gltf.animations.length > 0) {
                        const action = this.mixer.clipAction(gltf.animations[0]) // 첫 번째 애니메이션 클립을 사용
                        action.play() // 애니메이션 재생

                        // action.timeScale = 5
                    }

                    this.model.traverse((child) => {
                        if (child.isMesh) {
                            child.material.roughness = this.params.roughness
                            child.material.metalness = this.params.roughness
                            child.castShadow = true // 그림자를 생성
                            child.receiveShadow = true // 그림자를 수신

                            if (child.material.map) {
                                child.material.map.encoding = THREE.sRGBEncoding
                            }
                        }
                    })

                    this.model.position.x = this.oPo.x
                    this.model.position.y = this.oPo.y
                    this.model.position.z = this.oPo.z
                    this.model.rotation.y = this.oPo.rY
                    this.model.rotation.x = this.oPo.rX

                    this.model.scale.set(
                        this.scale * this.model.scale.x,
                        this.scale * this.model.scale.y,
                        this.scale * this.model.scale.z
                    )

                    gltf.scene.children.forEach((child) => {
                        child.traverse((node) => {
                            // Find the hotspots
                            if (node.isMesh && node.name.includes('pin')) {
                                // 3D 핀 위치를 가져옴
                                const pinPosition = node.getWorldPosition(new THREE.Vector3())

                                const _name = node.name.substring(
                                    node.name.indexOf('{') + 1,
                                    node.name.indexOf('}')
                                )
                                // HTML 요소 생성
                                const pinElement = document.createElement('div')
                                pinElement.style.position = 'absolute'
                                pinElement.style.width = '8px' // 동그라미 크기
                                pinElement.style.height = '8px'
                                pinElement.style.borderRadius = '50%' // 동그라미 모양
                                pinElement.style.cursor = 'pointer'
                                pinElement.setAttribute('data-name', _name)
                                document.body.appendChild(pinElement)

                                // console.log(node.name)

                                // 클릭 이벤트 추가
                                pinElement.addEventListener('click', () => {
                                    this.$btnOnRouter(this.$getAlarmPath(_name))
                                    // console.log(`Pin clicked: ${node.name}`)
                                    // alert(`Pin clicked: ${node.name}`)
                                })

                                // 핀 정보를 저장
                                this.pinElements.push({
                                    element: pinElement,
                                    position: pinPosition
                                })

                                // const hotspot = document.createElement('div')
                                // hotspot.className = 'annotationLabel'
                                // hotspot.setAttribute('name', n.name)

                                // const name_ = n.name

                                // hotspot.innerHTML = name_.substring(
                                //     name_.indexOf('{') + 1,
                                //     name_.indexOf('}')
                                // )

                                // const hotspotLabel = new CSS2DObject(hotspot)
                                // hotspotLabel.position.set(0, 0, 0)
                                // n.add(hotspotLabel)
                                // hotspotLabel.layers.set(0)
                            }
                        })
                    })

                    this.scene.add(gltf.scene)

                    // 초기 렌더링
                    // this.renderer.render(this.scene, this.camera)
                    this.animate()
                    // this.loading = false
                },
                (xhr) => {
                    // 로딩 중 진행률 업데이트
                    // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    if (error.name === 'AbortError') {
                        console.log('GLB load aborted')
                    } else {
                        console.error('An error happened while loading the model:', error)
                    }
                },
                { signal } // AbortController의 signal 추가
            )
        },
        animate() {
            this.animationId = requestAnimationFrame(this.animate)

            // 애니메이션이 있을 경우 업데이트
            const delta = this.clock.getDelta() // 이전 프레임과의 시간 차이를 계산
            if (this.mixer) {
                this.mixer.update(delta) // 애니메이션 업데이트
                this.mixer._actions.forEach((action) => {
                    action.timeScale = 0.1 * this.speed
                })
            }

            this.pinElements.forEach(({ element, position }) => {
                const screenPosition = position.clone().project(this.camera)
                if (screenPosition.z < 1) {
                    const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth
                    const y = (1 - screenPosition.y * 0.5 - 0.5) * window.innerHeight

                    // 2D 좌표가 화면 범위 내에 있는지 확인
                    if (this.videoST) {
                    } else if (
                        x >= 0 &&
                        x <= window.innerWidth &&
                        y >= 0 &&
                        y <= window.innerHeight
                    ) {
                        element.style.left = `${x}px`
                        element.style.top = `${y}px`
                        element.style.display = 'block' // 보이도록 설정
                    } else {
                        element.style.display = 'none' // 화면 밖이면 숨김
                    }

                    const tgName = element.getAttribute('data-name')
                    const fgColor = this.$getAlarmGroup(tgName)

                    element.style.backgroundColor = fgColor // 초기 색상

                    // if('complex'){

                    // }
                } else {
                    element.style.display = 'none' // 카메라 뒤에 있으면 숨김
                }
            })

            this.renderer.render(this.scene, this.camera)
        },
        cleanup() {
            this.pinElements.forEach(({ element }) => {
                document.body.removeChild(element)
            })

            // 1. GLB 로드 중단 (AbortController)
            if (this.abortController) {
                this.abortController.abort()
            }

            if (this.model) {
                this.disposeGLTF(this.model)
                this.model = null
            }

            // 2. 애니메이션 루프 중단
            if (this.animationId) {
                cancelAnimationFrame(this.animationId)
            }

            // 3. Three.js 리소스 해제
            if (this.renderer) {
                // this.renderer.dispose()

                this.renderer.forceContextLoss()
                this.renderer.dispose()
                this.$refs.container.removeChild(this.renderer.domElement)
                this.renderer = null
            }

            // 씬의 모든 오브젝트와 메모리 해제
            if (this.scene) {
                this.scene.traverse((object) => {
                    if (object.isMesh) {
                        // 메쉬에 연결된 텍스처와 메모리 해제
                        object.geometry.dispose()
                        if (object.material.isMaterial) {
                            this.disposeMaterial(object.material)
                        } else if (Array.isArray(object.material)) {
                            object.material.forEach((material) => this.disposeMaterial(material))
                        }
                    }
                })
                this.scene = null
            }

            // AnimationMixer 제거
            if (this.mixer) {
                this.mixer.uncacheRoot(this.mixer.getRoot())
            }

            if (this.camera) {
                this.camera = null
            }

            this.controls = null

            // abortController = null
        },
        disposeGLTF(gltf) {
            gltf.traverse((object) => {
                if (object.isMesh) {
                    if (object.geometry) {
                        object.geometry.dispose() // Geometry 해제
                    }

                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material) => this.disposeMaterial(material))
                        } else {
                            this.disposeMaterial(object.material)
                        }
                    }
                }
            })
        },
        disposeMaterial(material) {
            // 메터리얼에 연결된 텍스처 해제
            if (material.map) material.map.dispose()
            if (material.lightMap) material.lightMap.dispose()
            if (material.aoMap) material.aoMap.dispose()
            if (material.emissiveMap) material.emissiveMap.dispose()
            if (material.bumpMap) material.bumpMap.dispose()
            if (material.normalMap) material.normalMap.dispose()
            if (material.displacementMap) material.displacementMap.dispose()
            if (material.specularMap) material.specularMap.dispose()
            if (material.envMap) material.envMap.dispose()

            material.dispose()
        }
    }
}
</script>

<style scoped></style>
