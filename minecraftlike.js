//
// minecraftlike.js
//
//


var main = function (){
    
	var manifest = [
		{id: 'top', src: 'top.png'},
		{id: 'side1', src: './side1.png'}
	];

	var loadQueue = new createjs.LoadQueue();

	loadQueue.on('complete', function() {
		/*var groundTexture = new THREE.CubeTexture([
		  loadQueue.getResult('side1'),
		  loadQueue.getResult('side1'),
		  loadQueue.getResult('top'),
		  loadQueue.getResult('top'),
		  loadQueue.getResult('side1'),
		  loadQueue.getResult('side1')
		]);*/
		var top_image = loadQueue.getResult('top');
		var groundTexture = new THREE.Texture(top_image);
		groundTexture.needsUpdate = true;
		groundMaterial = new THREE.MeshBasicMaterial({
			color:0xffffff,
			map:groundTexture
		});
		
		
		
		
		var pi = Math.PI;
    
		var scene = new THREE.Scene();
		
		var width = 400;
		var height = 400;
		var fov = 60;
		var aspect = width / height;
		var near = 1;
		var far = 1000;
		var cubeScale = 10;
		var terrainX = 32;
		var terrainY = 32;
		var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.rotation.x -= pi/2;
		camera.position.set(0, 50, 0);
		
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		document.body.appendChild(renderer.domElement);
		
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, 20, 0);
		scene.add(directionalLight);
		
		noisex = new noiseX(6, 2, 0.5);
		
		var terrainHeight = [];
		for(var i=0;i<terrainX;++i){
			terrainHeight[i] = [];
			for(var j=0;j<terrainY;++j){
				terrainHeight[i][j] = Math.floor(noisex.noise(i, j)*50);
				
				var geometry = new THREE.CubeGeometry(cubeScale, cubeScale, cubeScale);
				var mesh = new THREE.Mesh(geometry, groundMaterial);
				mesh.position.set((i-terrainX/2)*cubeScale, terrainHeight[i][j]*cubeScale, (j-terrainY/2)*cubeScale);
				
				//scene.add(mesh);
			}
		}
		
		var material = new THREE.MeshPhongMaterial({color:0xff0000});
		var geometry = new THREE.CubeGeometry(30, 30, 30);
		var mesh = new THREE.Mesh(geometry, groundMaterial);
		
		scene.add(mesh);
		
		renderer.render(scene, camera);
	});

	loadQueue.loadManifest(manifest);
	
	
};

window.addEventListener('DOMContentLoaded', main, false);