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
		let r = Math.random()*1 + 1
		let theta = 100*Math.random()*1 + 1
		worldCamera.object3D.position.set(r*Math.cos(theta), 1.5, r*Math.sin(theta))
		worldCamera.object3D.lookAt(0,.5,0)
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

		<a-entity gltf-model="img/textures/food_truck/scene.gltf" scale="0.85 0.85 0.85" position="-5.05376 0.21711 -38.21604" rotation="0 10 0"></a-entity>
		<a-entity gltf-model="img/textures/food_cart/scene.gltf" scale="0.003 0.003 0.003" position="0.97597 0.09121 -41.27555" rotation=""></a-entity>		
		<a-entity gltf-model="img/textures/food_ramen/scene.gltf" scale="0.45 0.45 0.45" position="7.38616 3.43639 -42.26318"></a-entity>
		<a-entity gltf-model="img/textures/food_sushi/scene.gltf" scale="0.008 0.008 0.008" position="14.19567 0.09121 -40.63283" rotation=""></a-entity>
		<a-entity gltf-model="img/textures/food_hotdog/scene.gltf" scale="0.28 0.28 0.28" position="21.59531 0.09121 -39.58639" rotation="0 -40 0"></a-entity>
		<a-entity gltf-model="img/textures/food_japan/scene.gltf" scale="0.010 0.010 0.010" position="24.39644 0.09121 -33.47075" rotation="0 -90 0"></a-entity>
		
		<a-entity gltf-model="img/textures/table_2/scene.gltf" scale="0.01 0.01 0.01" position="1.13823 0.21711 -32.30206" rotation="0 90 0"></a-entity>
		<a-entity gltf-model="img/textures/table_2/scene.gltf" scale="0.01 0.01 0.01" position="3.96106 0.21711 -32.42919" rotation="0 90 0"></a-entity>
		<a-entity gltf-model="img/textures/table_2/scene.gltf" scale="0.01 0.01 0.01" position="1.07432 0.21711 -28.45587" rotation="0 90 0"></a-entity>
		<a-entity gltf-model="img/textures/table_2/scene.gltf" scale="0.01 0.01 0.01" position="3.96106 0.21711 -28.45587" rotation="0 90 0"></a-entity>
		
		<a-entity gltf-model="img/textures/table_1/scene.gltf" scale="0.003 0.003 0.003" position="11.09531 0.05692 -32.11293" rotation=""></a-entity>
		<a-entity gltf-model="img/textures/table_1/scene.gltf" scale="0.003 0.003 0.003" position="13.81007 0.21711 -31.79722" rotation=""></a-entity>
		<a-entity gltf-model="img/textures/table_1/scene.gltf" scale="0.003 0.003 0.003" position="10.85758 0.21711 -27.87218" rotation=""></a-entity>
		<a-entity gltf-model="img/textures/table_1/scene.gltf" scale="0.003 0.003 0.003" position="13.90143 0.05692 -28.20409" rotation=""></a-entity>
		
		<a-entity gltf-model="img/textures/statue_liberty/scene.gltf" scale="0.003 0.003 0.003" position="38.01285 -0.88762 38.08134" rotation="0 45 0"></a-entity>		
		<a-entity gltf-model="img/textures/statue_griffin/scene.gltf" scale="0.04 0.04 0.04" position="34.03604 -0.09521 26.95803" rotation="0 -40 0"></a-entity>
		<a-entity gltf-model="img/textures/statue_griffin/scene.gltf" scale="0.04 0.04 0.04" position="25.46381 -0.18568 35.54342" rotation="0 -40 0"></a-entity>
		<a-entity gltf-model="img/textures/mountain/scene.gltf" scale="1.2 1.2 1.2" position="-26.92722 0 -26.16959"></a-entity>		
		<a-entity gltf-model="url(img/textures/mountainlp/scene.gltf)" scale="25 25 25" position="37.312 9.000 -37.147"></a-entity>
		<a-entity gltf-model="img/textures/low_poly_space/scene.gltf" scale="0.05 0.05 0.05" position="-91.01636 113.21063 -357.22484" rotation="0 45 0"></a-entity>		
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
		return  {
			
		}
	},

	props: ["room"],
})