let worldCamera = undefined

AFRAME.registerComponent('rotation-reader', {
	// Track the camera's position 
	// and copy it into the user's head

	/**
	 * We use IIFE (immediately-invoked function expression) to only allocate one
	 * vector or euler and not re-create on every tick to save memory.
	 */
	init: function () {
		console.log('Begin tracking the camera');
		worldCamera = this.el
		console.log("CAMERA:", worldCamera)
		let r = Math.random() * 1 + 1
		let theta = 100 * Math.random() * 1 + 1
		worldCamera.object3D.position.set(r * Math.cos(theta), 1.5, r * Math.sin(theta))
		worldCamera.object3D.lookAt(0, .5, 0)
		console.log("****Start pos", worldCamera.object3D.position.toArray())
	},
	tick: (function () {

		return function () {
			if (room.userHead) {
				room.userHead.position.copy(this.el.object3D.position)
				room.userHead.rotation.copy(this.el.object3D.rotation)
				room.userHead.post()
			}

		};
	})()
});

Vue.component("room-scene", {
	template: `<a-scene>

		
		<!--------- ASSETS ---------->
		<a-assets>
			<img id="sky" src="img/textures/sky-sunset.png">
			<img
			id="grass-albedo"
			src="img/textures/grass.png"
		  />
		  <a-asset-item id="cloud" src="/img/textures/cloud/cloud.gltf"></a-asset-item>
		  <audio id="halo" src="img/Halo_Theme.mp3" preload="auto"></audio>
		</a-assets>

		<!--------- CAMERA --------->

		<a-camera id="camera" rotation-reader>
			<a-cursor></a-cursor>

			<!-------- Output text ----->
			<a-entity>
				<a-text 
					v-if="room.userHead"
					width=".8"
					color="black"
					:value="room.userHead.position.toFixed(2)" 
					position="-.7 .7 -1">
				</a-text>
				
				<a-text 
					width="2"
					color="black"
					:value="room.titleText" 
					position="-.7 .6 -1">
				</a-text>
				<a-text 
					width="1"
					color="black"
					:value="room.detailText" 
					position="-.7 .5 -1">
				</a-text>
			</a-entity>
			
		</a-camera>
		
		<obj-world :room="room"/>


		
				
		<a-entity position="0 0 0">
			<a-entity text="value:hello;font:/fonts/helvetica-sdf.fnt; fontImage:/fonts/helvetica-sdf.png;width:10;color:black" position="0 1 0"></a-entity>
			
			<!--------- ALL THE OBJECTS YOU'VE MADE --------->
			<live-object  v-for="obj in room.objects" :key="obj.uid" :obj="obj" />
		</a-entity>
		<a-entity gltf-model="img/textures/spaceship/scene.gltf" scale="0.03 0.03 0.03" position="-69.33693 108.5295 -414.82732" rotation="20 25 30"></a-entity>
		<a-entity gltf-model="img/textures/fast_food_poster/scene.gltf" scale="1.5 1.5 1.5" position="9.05196 8.44423 -44.562" rotation="0 90 0"></a-entity>

		<a-entity gltf-model="img/textures/food_truck/scene.gltf" scale="0.4 0.4 0.4" position="3.21039 0.89976 -28.30654" rotation="0 90 0"></a-entity>
		<a-entity gltf-model="img/textures/food_cart/scene.gltf" scale="0.0012 0.0012 0.0012" position="3.41553 0.8763w1 -32.75099" rotation="0 90 0"></a-entity>		
		<a-entity gltf-model="img/textures/food_ramen/scene.gltf" scale="0.2 0.2 0.2" position="5.62167 2.46728 -35.91853" rotation="0 45 0"></a-entity>		
		<a-entity gltf-model="img/textures/food_sushi/scene.gltf" scale="0.003 0.003 0.003" position="10.00862 0.93901 -34.15805" rotation=""></a-entity>		
		<a-entity gltf-model="img/textures/food_hotdog/scene.gltf" scale="0.15 0.15 0.15" position="14.16126 0.9088 -33.87652" rotation="0 -40 0"></a-entity>
		<a-entity gltf-model="img/textures/food_japan/scene.gltf" scale="0.005 0.005 0.005" position="16.75631 0.89035 -29.93584" rotation="0 -90 0"></a-entity>

		<a-entity gltf-model="img/textures/statue_liberty/scene.gltf" scale="0.004 0.004 0.004" position="38.01285 -0.88762 38.08134" rotation="0 45 0"></a-entity>		
		<a-entity gltf-model="img/textures/statue_griffin/scene.gltf" scale="0.04 0.04 0.04" position="34.03604 -0.09521 26.95803" rotation="0 -40 0"></a-entity>
		<a-entity gltf-model="img/textures/statue_griffin/scene.gltf" scale="0.04 0.04 0.04" position="25.46381 -0.18568 35.54342" rotation="0 -40 0"></a-entity>
		
		<a-entity gltf-model="img/textures/mountain/scene.gltf" scale="1 1 1" position="-26.92722 0 -26.16959"></a-entity>
		
		<a-entity gltf-model="url(img/textures/mountainlp/scene.gltf)" scale="25 25 25" position="37.312 9.000 -37.147"></a-entity>
		<a-entity gltf-model="img/textures/mountainlp/scene.gltf" scale="25 25 25" position="37.312 9.000 -17.90706"></a-entity>		
		<a-entity gltf-model="img/textures/mountainlp/scene.gltf" scale="25 25 25" position="37.312 9.000 -0.07098"></a-entity>		
		<a-entity gltf-model="img/textures/mountainlp/scene.gltf" scale="25 25 25" position="38.3995 9.000 17.98553"></a-entity>
		
		<a-entity gltf-model="img/textures/sacred_ring_halo/scene.gltf" sound="src: #halo; autoplay: true" scale="0.05 0.05 0.05" position="150.96815 87.04602 -50.33329" animation-mixer="clip: Take 001" rotation="10 -29.999999999999996 0"></a-entity>
		<a-entity gltf-model="img/textures/low_poly_forest/scene.gltf" scale="0.8 0.8 0.8" position="54.31049 4.51615 17.29497" rotation="0 270 0" ></a-entity>

		<a-entity gltf-model="img/textures/castelo/scene.gltf" scale="1 0.8 1" position="-80.16759 0.19071 40.73395" rotation="0 90 0"></a-entity>
		<a-entity gltf-model="img/textures/bench_low_poly/scene.gltf" scale="0.01 0.01 0.01" position="-5.03153 0.19071 43.0000" rotation="0 90 0"></a-entity>		
		<a-entity gltf-model="img/textures/bench_low_poly/scene.gltf" scale="0.01 0.01 0.01" position="-5.03153 0.19071 40.0000" rotation="0 90 0"></a-entity>
		<a-entity gltf-model="img/textures/bench_low_poly/scene.gltf" scale="0.01 0.01 0.01" position="3.79327 0.19071 43.0000" rotation="0 -90 0"></a-entity>
		<a-entity gltf-model="img/textures/bench_low_poly/scene.gltf" scale="0.01 0.01 0.01" position="3.79327 0.19071 40.0000" rotation="0 -90 0"></a-entity>

		<a-entity gltf-model="img/textures/low-poly_colloseum/scene.gltf" scale="0.6 0.6 0.6" position="9.96476 0.64505 -31.69327" rotation=""></a-entity>
		<a-entity gltf-model="img/textures/low_poly_space/scene.gltf" scale="0.25 0.25 0.25" position="-91.01636 113.21063 -357.22484" rotation="0 45 0"></a-entity>
		<a-entity id="second-light" rotation="0 180 0" position="36.68738 13.37239 22.11361" light="color: #2ae594; intensity: 1; type: spot" scale="3 3 3"></a-entity>

		<a-sky src="#sky" position="0 -100 0"></a-sky>
 
	</a-scene>`,

	methods: {
		camtick() {
			console.log("cam")
		}
	},
	mounted() {
		// Create 
	},

	data() {
		return {

		}
	},

	props: ["room"],
})
{/* <a-sound src="src: url()" autoplay="true" position="150.96815 87.04602 -50.33329"></a-sound> */}