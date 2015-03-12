// project based on chapter 2 of the book "Game Development with Three.js"

// init vars
var renderer;
var scene;
var camera;
var controls;
var clock;

var width = window.innerWidth;
var height = window.innerHeight;

// city building vars
var building;
var material;
var geometry;

//START===============
init();
initWorld();
procGen();

requestAnimationFrame( function animate() {
  requestAnimationFrame(animate);

  renderer.render( scene, camera );

  controls.update(clock.getDelta());
});

// ==================

function init() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( width, height );
  renderer.shadowMapEnabled = true;

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1250 );
  camera.position.y = 575;
  camera.position.z = 575;
  camera.rotation.x = -45 * Math.PI / 180;

  scene.add( camera );

  clock = new THREE.Clock();

  // initialised camera controls
  controls = new THREE.FirstPersonControls( camera );
  controls.movementSpeed = 100;
  controls.lookSpeed = 0.1;

  projector = new THREE.Projector();

  renderer.domElement.addEventListener( 'mousedown', function( event ) {
    var vector = new THREE.Vector3(
      renderer.devicePixelRatio * ( event.pageX - this.offsetLeft )
      / this.width * 2 - 1, -renderer.devicePixelRatio * ( event.pageY - this.offsetTop ) / this.height * 2 + 1, 0
      );
    projector.unprojectVector( vector, camera );

    var raycaster = new THREE.Raycaster(
      camera.position,
      vector.sub( camera.position ).normalize()
      );
    var intersects = raycaster.intersectObjects( OBJECTS );
    if ( intersects.length ) {
      // intersects[0] describes the clicked object
    }
  }, false);
};

function initWorld() {
  // initialising a plane/floor
  var geo = new THREE.PlaneBufferGeometry(2000, 2000, 20, 20);
  // last two parameters split plane into a 20x20 grid,
  // getting around the "distant vertices" optimization process
  var mat = new THREE.MeshBasicMaterial( { color: 0x9db3b5 } );
  var mesh = new THREE.Mesh( geo, mat );

  mesh.rotation.x = -90 * Math.PI / 180;

  mesh.receiveShadow = true;

  // initialising a "building"
  geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

  material = new THREE.MeshPhongMaterial( { color: 0xcccccc } );

  scene.add( mesh );

  var light = new THREE.DirectionalLight(0xf6e86d, 1);
  light.position.set(1, 3, 2);

  light.castShadow = true;
  light.shadowDarkness = 0.5;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;
  light.position.set(500, 1500, 1000);
  light.shadowCameraFar = 2500;
  light.shadowCameraLeft = -1000;
  light.shadowCameraRight = 1000;
  light.shadowCameraTop = 1000;
  light.shadowCameraBottom = -1000;

  scene.add(light);

  scene.fog = new THREE.FogExp2(0x9db3b5, 0.002)
};

function procGen() {
  var cityGeometry = new THREE.Geometry();

  for(var i = 0; i < 300; i++) {
    building = new THREE.Mesh(geometry.clone(), material.clone());

    // procedural generation of rectangular shapes
    building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
    building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
    building.scale.x = Math.random() * 50 + 10;
    building.scale.y = Math.random() * building.scale.x * 8 + 8;
    building.scale.z = building.scale.x;

    THREE.GeometryUtils.merge( cityGeometry, building );
  }
  var city = new THREE.Mesh(cityGeometry, material);
  city.receiveShadow = true;
  city.castShadow = true;

  scene.add(city);
};
