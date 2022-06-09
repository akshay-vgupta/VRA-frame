const fakeBodyCount = 0
const fakeBodySteps = 10

const trackedKeys = ["size", "color", "fireStrength", "rotation", "position", "paritype", "displayName", "label", "labelWidth","colorhex"]

// Decorate the head of our guests
Vue.component("obj-head", {
	template: `<a-entity>

		<a-sphere 
			shadow
			:radius="headSize"
			:color="obj.color.toHex()" 
				
			>
			<obj-axes scale=".1 .1 .1" v-if="false" />
		</a-sphere>
		<a-cone v-for="(spike,index) in spikes"
		:key="index"
		:height="spike.size"
		:radius-bottom="headSize*.2"
		:position="spike.position.toAFrame(0, -.2, 0)"
		:rotation="spike.rotation.toAFrame()"
		:color="obj.color.toHex(.5*Math.sin(index))" 
			
		>
	
	</a-cone>
		<a-cylinder :color="obj.color.toHex(0.6)" material="" geometry="" scale="0.15 0.5 0.15" position="0 -0.4 0"></a-cylinder>
		<a-entity gltf-model="img/textures/bucket_hat/scene.gltf" scale="0.002 0.002 0.002" position="0 -0.11651 0"></a-entity>
		<a-entity gltf-model="img/textures/heart-shaped_glasses/scene.gltf" scale="0.08 0.08 0.08" position="0.09824 0.08914 -0.20669" rotation="0 180 0"></a-entity>
		<!-- NOSE -->
		<a-cone
		
			:height="headSize*.6"
			:radius-bottom="headSize*.4"
			position="0 0 -.18"
			
			:color="obj.color.toHex(.6)" 
			
		>
	
		</a-cone>
	</a-entity>
	`,
	computed: {
		color() {
			return this.obj.color.toHex?this.obj.color.toHex():this.obj.color
		},
		headSize() {
			return this.obj.size instanceof Vector ? this.obj.size.x : this.obj.size
		},
	},

	data() {
		let spikeCount = 4
		let spikes = []
		let h2 = Math.random() - .5
			
		for (var i = 0; i < spikeCount; i++) {
			let spike = new LiveObject(undefined, { 

				size: .35,
				color: new Vector(noise(i)*30 + 140, 0, 40 + 20*noise(i*3))
			})
			let r = -.2
			// Put them on the other side
			let theta = 6*noise(i)
			spike.position.setToCylindrical(r, theta, -0.2)
			// Look randomly
			spike.lookAt(0, h2, 0)
			spike.rotateX(-Math.PI/2)
			spikes.push(spike)
		}

		return {
			spikes: spikes
		}
	},

	mounted() {
		// console.log(this.headSize)
	},
	props: ["obj"]
})


// Vue.component("obj-fire", {
// 	template: `
// 	<a-entity>
// 		<obj-axes scale="5 5 5" v-if="false" />
// 		<a-sphere 
// 			color="grey"
// 			radius=2 
// 			scale="1 .3 1" 
// 			roughness=1
// 			segments-height="5"
// 			segments-width="10"
// 			theta-start=0
// 			theta-length=60
// 			position="0 -.4 0"
// 			>
// 		</a-sphere>
// 		<a-cone
// 			position="0 .2 0"
// 			@click="click"
// 			:animation="heightAnimation"
// 			:color="obj.color.toHex()"
// 			height=.2
// 			radius-bottom=".2"

// 			:scale="(obj.fireStrength*.2 + 1) + ' ' + .1*obj.fireStrength + ' ' + (obj.fireStrength*.2 + 1)"
// 			:material="fireMaterial">

// 		</a-cone>

// 		<a-light
// 			:animation="intensityAnimation"

// 			position="0 1 0"
// 			intensity="2"
// 			:color="obj.color.toHex()"
// 			type="point"
// 			:distance="obj.fireStrength*4 + 10"
// 			decay="2">
// 		</a-light>
// 	</a-entity>

// 	`,

// 	// Values computed on the fly
// 	computed: {
// 		fireMaterial() {
// 			return `emissive:${this.obj.color.toHex(.2)}`
// 		},
		
// 		animationSpeed() {
// 			return 500
// 		},
// 		intensityAnimation() {
// 			return `property: intensity; from:.3; to:.6; dir:alternate;dur: ${this.animationSpeed}; easing:easeInOutQuad;loop:true`
// 		},
// 		heightAnimation() {
// 			return `property: height; from:${this.obj.fireStrength};to:${this.obj.fireStrength*2}; dir:alternate;dur: 500; easing:easeInOutQuad;loop:true`
// 		}
// 	},

// 	methods: {
// 		click() {
// 			this.obj.fireStrength += 1
// 			this.obj.fireStrength = this.obj.fireStrength%10 + 1

// 			// Tell the server about this action
// 			this.obj.post()
// 		}
// 	},

// 	// this function runs once when this object is created
// 	mounted() {

// 	},



// 	props: ["obj"]


// })
Vue.component("obj-fire", {
	template: `
	<a-entity>

		<a-entity 
		gltf-model="img/textures/interact_button/scene.gltf" 
		scale="4 4 4"
		position="-2.01887 1.87571 -18.24404"
		@click="click"
		:material="fireMaterial"
		:color="obj.colorhex"></a-entity>
		<a-light type="hemisphere" 
		position="44.19735 18.89099 -30.09343"
		:color="obj.colorhex" ></a-light>
	</a-entity>

	`,

	// Values computed on the fly
	computed: {
		fireMaterial() {
			return `emissive:${this.obj.color.toHex(.2)}`
		},
		animationSpeed() {
			return 500
		},
		intensityAnimation() {
			return `property: intensity; from:.3; to:.6; dir:alternate;dur: ${this.animationSpeed}; easing:easeInOutQuad;loop:true`
		},
		heightAnimation() {
			return `property: height; from:${this.obj.fireStrength};to:${this.obj.fireStrength*2}; dir:alternate;dur: 500; easing:easeInOutQuad;loop:true`
		}
	},

	methods: {
		click() {
			this.obj.fireStrength += 1
			this.obj.fireStrength = this.obj.fireStrength%10 + 1

			// Tell the server about this action
			// Vue.set(this.color.v,0, (noise(10*.02)+1)*180)
			this.obj.colorhex = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
			console.log(this.obj.colorhex)
			this.obj.post()
		}
	},

	// this function runs once when this object is created
	mounted() {

	},



	props: ["obj"]


})
Vue.component("obj-light", {
	template: `
	<a-sphere
	@click="click"
	:light="colorHex"
	id="sun"
	position="-6.000 50 52.578"
	radius="1"
	scale="2.5 2.5 2.5"
	color="#ff8800"
	></a-sphere>

	`,

	// Values computed on the fly
	computed: {
		colorHex() {
			
			return `type:hemisphere; color:${this.obj.colorhex}`
		}
	},

	methods: {
		click() {
			this.obj.colorhex = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
			console.log(this.obj.colorhex)
			// Tell the server about this action
			this.obj.post()
		}
	},

	// this function runs once when this object is created
	mounted() {

	},


	props: ["obj"]


})



Vue.component("obj-world", {

	template: `
	<a-entity>
		<!--------- SKYBOX --------->
		

		<a-plane 
		material=" src: #grass-albedo"
			roughness="1"
			shadow 
			height="100" 
			width="100" 
			rotation="-90 0 0">
		</a-plane>

		<!---- lights ----> 



		<a-entity id="tree" gltf-model="url(img/textures/lowpoly_tree/scene.gltf)" scale="0.005 0.005 0.005"
			v-for="(tree,index) in trees"
			:key="'tree' + index"
			shadow 

			
			:rotation="tree.rotation.toAFrame()"
			:position="tree.position.toAFrame()">
		</a-entity>

		

		<a-entity id="cloud" gltf-model="url(img/textures/cloud1/scene.gltf)" scale="2 2 2"
			v-for="(rock,index) in rocks"
			:key="'rock' + index"
			shadow 
			:position="rock.position.toAFrame()">
		</a-entity>

	</a-entity>
		`,

	data() {
		// Where we setup the data that this *rendered scene needs*

		// EXAMPLE: Generated landscape
		// Make some random trees and rocks
		// Create a lot of LiveObjects (just as a way 
		//  to store size and color conveniently)
		// Interpret them as whatever A-Frame geometry you want!
		// Cones, spheres, entities with multiple ...things?
		// If you only use "noise" and not "random", 
		// everyone will have the same view. (Wordle-style!)
		let trees = []
		let count = 10
		for (var i = 0; i < count; i++) {
			let h = 6 + 4*noise(i) // Size from 1 to 3
			let tree = new LiveObject(undefined, { 
				size: new THREE.Vector3(.3, h, .3),
				color: new Vector(noise(i*50)*30 + 160, 100, 40 + 10*noise(i*10))
			})
			let r = 20 + 10*noise(i*80)
			let theta = 3*noise(i*20)
			tree.position.setToCylindrical(r, theta, 0)
			tree.lookAt(0,1,0)
			trees.push(tree)
		}

		let rocks = []
		let rockCount = 45
		for (var i = 0; i < rockCount; i++) {
			let h = 1.2 + noise(i*10) // Size from 1 to 3
			let rock = new LiveObject(undefined, { 
				size: new THREE.Vector3(h, h, h),
				color: new Vector(noise(i)*30 + 140, 0, 40 + 20*noise(i*3))
			})
			let r = 60 + 10*noise(i*10)
			// Put them on the other side
			let theta = 3*noise(i*100)
			rock.position.setToCylindrical(r, theta, 30)
			// Look randomly
			rock.lookAt(Math.random()*100,Math.random()*100,Math.random()*100)
			rocks.push(rock)
		}


		return {
			trees: trees,
			rocks: rocks
		}
	},

	mounted() {
		// Create a fire object
		// Attach this liveobject to the ROOM
		// and then the room deals with drawing it to AFRAME
		let fire = new LiveObject(this.room, {
			paritype: "fire",  // Tells it which type to use
			uid: "fire0",
			isTracked: true,
			onUpdate({t, dt, frameCount}) {
				// Change the fire's color
				let hue = (noise(t*.02)+1)*180
				Vue.set(this.color.v, 0, hue)
			}
		})
	

		fire.position.set(0, 0, 0)
		fire.fireStrength = 1
		fire.colorhex='#e69756'
		// let fire1 = new LiveObject(this.room, {
		// 	paritype: "light",  // Tells it which type to use
		// 	uid: "fire1",
		// 	isTracked: true,
		// 	onUpdate({t, dt, frameCount}) {
		// 		// Change the fire's color
		// 	}
		// })
		// fire1.position.set(-6.000, 50, 52.578)
		// fire1.colorhex='#e69756'
		// let fire2 = new LiveObject(this.room, {
		// 	paritype: "fire",  // Tells it which type to use
		// 	uid: "fire2",
		// 	onUpdate({t, dt, frameCount}) {
		// 		let hue = (noise(t*.02)+1)*180
		// 		Vue.set(this.color.v, 0, hue)
				
		// 		// console.log(this.color[0] )
		// 	}
		// })

		// fire2.position.set(3, 0, -4)
		// fire2.fireStrength = 7

		
		let grammar = new tracery.createGrammar(  {
			songStyle : ", played as #song.a#, on #musicModifier# #instrument#",
			instrument : ["ukulele", "vocals", "guitar", "clarinet", "piano", "harmonica", "sitar", "tabla", "harp", "dulcimer", "violin", "accordion", "concertina", "fiddle", "tamborine", "bagpipe", "harpsichord", "euphonium"],
			musicModifier : ["heavy", "soft", "acoustic", "psychedelic", "light", "orchestral", "operatic", "distorted", "echoing", "melodic", "atonal", "arhythmic", "rhythmic", "electronic"],
			musicGenre : ["metal", "electofunk", "jazz", "salsa", "klezmer", "zydeco", "blues", "mariachi", "flamenco", "pop", "rap", "soul", "gospel", "buegrass", "swing", "folk"],
			musicPlays : ["echoes out", "reverberates", "rises", "plays"],
			musicAdv : ["too quietly to hear", "into dissonance", "into a minor chord", "changing tempo", "to a major chord", "staccatto", "into harmony", "without warning", "briskly", "under the melody", "gently", "becoming #musicGenre#"],
			song : ["melody", "dirge", "ballad", "poem", "beat poetry", "slam poetry", "spoken word performance", "hymn", "song", "tone poem", "symphony"],
			musicAdj : ["yielding", "firm", "joyful", "catchy", "folksy", "harsh", "strong", "soaring", "rising", "falling", "fading", "frantic", "calm", "childlike", "rough", "sensual", "erotic", "frightened", "sorrowful", "gruff", "smooth"],
        
		}, {})
		grammar.addModifiers(baseEngModifiers)

		const campfireSongs = ["Lonely Goatherd", "On top of spaghetti", "Princess Pat", "BINGO", "Old Mac Donald", "Going on a Bear Hunt", "The Green Grass Grew All Around", "Home on the Range", "John Jacob Jingleheimer Schmitt", "The Wheels on the Bus", "If I had a Hammer"]
		this.room.detailText = "Campfire time!"

		this.room.time.onSecondChange((second) => {
			// Change the song every minute (60 seconds)
			let rate = 10 // How many seconds between changes
			if (second%rate === 0) {
				let tick = second/rate
				let index = second % campfireSongs.length
				let song = campfireSongs[index]
				this.room.detailText =  song + grammar.flatten("#songStyle#")
			}
		})
	},

	props: ["room"]

})

