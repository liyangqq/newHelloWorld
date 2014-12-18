 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
 var camera,renderer,scene;
var helloWorld;
 window.onload = function (){
    helloWorld = new THREE.Object3D();
    Init();
    animate();
 };

function Init(){
        scene = new THREE.Scene();
  
       //setup camera
        camera = new LeiaCamera({
           cameraPosition:new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z), 
		   targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
        });
        scene.add(camera);
 
  
       //setup rendering parameter
 		renderer = new LeiaWebGLRenderer({
         antialias:true, 
 		renderMode: _renderMode, 
		shaderMode: _nShaderMode,
		colorMode : _colorMode,
		devicePixelRatio: 1 
        } );
 		renderer.Leia_setSize( windowWidth, windowHeight );
 		document.body.appendChild( renderer.domElement );
  
       //add object to Scene
        addObjectsToScene();
  
        //add Light
 		addLights();
  
        //add Gyro Monitor
        //addGyroMonitor();
  
 }

 function animate() 
 {
 	requestAnimationFrame( animate );
    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render({
     scene:scene, 
     camera:camera,
     holoScreenSize:_holoScreenSize,
     holoCamFov:_camFov,
      upclip: _up,
     downclip:  _down,
     messageFlag:_messageFlag
   });
 }

function addObjectsToScene(){
     // background Plane
    var planeTexture = new THREE.ImageUtils.loadTexture('resource/brickwall_900x600_small.jpg');
    planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set(1, 1);
    var planeMaterial = new THREE.MeshPhongMaterial({
        map: planeTexture,
        color: 0xffdd99
    });
    var planeGeometry = new THREE.PlaneGeometry(80, 60, 10, 10);
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -6;
    plane.castShadow = false;
    plane.receiveShadow = true;
    scene.add(plane);

    // hello world text
    var helloWorldGeometry = new THREE.TextGeometry(
        "Hello World", {
            size: 9,
            height: 2,
            curveSegments: 4,
            font: "helvetiker",
            weight: "normal",
            style: "normal",
            bevelThickness: 0.5,
            bevelSize: 0.25,
            bevelEnabled: true,
            material: 0,
            extrudeMaterial: 1
        }
    ); 
    helloWorldGeometry.computeBoundingBox();
    var hwbb = helloWorldGeometry.boundingBox;
    var hwbbx = -0.5 * (hwbb.max.x - hwbb.min.x);
    var hwbby = -0.5 * (hwbb.max.y - hwbb.min.y);
    var hwbbz = -0.5 * (hwbb.max.z - hwbb.min.z);
    var helloWorldMaterial = new THREE.MeshFaceMaterial(
        [
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shading: THREE.FlatShading
            }), // front
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shading: THREE.SmoothShading
            }) // side
        ]
    );
    var helloWorldMesh = new THREE.Mesh(helloWorldGeometry, helloWorldMaterial);
    helloWorldMesh.castShadow = true;
    helloWorldMesh.position.set(hwbbx, hwbby, hwbbz);
    helloWorld.add(helloWorldMesh);
    scene.add(helloWorld);
}

function addLights(){
    //Add Lights Here
    var xl = new THREE.DirectionalLight( 0x555555 );
 	xl.position.set( 1, 0, 2 );
 	scene.add( xl );
 	var pl = new THREE.PointLight(0x111111);
 	pl.position.set(-20, 10, 20);
 	scene.add(pl);
 	var ambientLight = new THREE.AmbientLight(0x111111);	
 	scene.add(ambientLight);
}