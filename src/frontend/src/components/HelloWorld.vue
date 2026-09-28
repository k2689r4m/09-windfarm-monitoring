<template>
	<div ref="container"></div>
</template>
<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default {
	name: 'App',
	components: {},
	computed: {},
	data() {
		return {
			scene: null,
			camera: null,
			controls: null,
			loader: null,
			renderer: null,
			mixer: null,
			renderSize: {
				w: 500,
				h: 500,
			},
		};
	},
	created() {
		window.clock = new THREE.Clock();
		window.scene = this.scene;
		window.mixer = this.mixer;
		window.animations = [];
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.setRenderer();

			const container = this.$refs.container;
			window.scene = new THREE.Scene();
			container.appendChild(this.renderer.domElement);

			this.setCamaera();

			new OrbitControls(this.camera, this.$refs.container);

			this.loadGTLF();
			this.animate();
		},
		setRenderer() {
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(
				this.renderSize.w,
				this.renderSize.w
			);
		},
		setCamaera() {
			this.camera = new THREE.PerspectiveCamera(
				50,
				this.renderSize.w / this.renderSize.w,
				0.1,
				500
			);
			this.camera.position.z = 1;
			window.scene.background = new THREE.Color('#080d16');
		},
		setLight() {},
		loadGTLF() {
			this.loader = new GLTFLoader();
			this.loader.load(
				'assets/dude.glb',
				function (gltf) {
					console.log(gltf);
					window.scene.add(gltf.scene);
					window.mixer = new THREE.AnimationMixer(
						gltf.scene
					);

					// window.animations = {
					//    survey: window.mixer.clipAction(gltf.animations[0]),
					//    walk: window.mixer.clipAction(gltf.animations[1]),
					//    run: window.mixer.clipAction(gltf.animations[2]),
					// };
					// window.animations.walk.play();
					window.mixer
						.clipAction(gltf.animations[0])
						.play();
				},
				function (progress) {
					console.log({ progress });
				},
				function (error) {
					console.error(error);
				}
			);
		},
		animate() {
			window.mixer?.update(window.clock.getDelta());
			requestAnimationFrame(this.animate);
			this.renderer.render(window.scene, this.camera);
		},
	},
};
</script>
