// project based on chapter 2 of the book "Game Development with Three.js"

// init vars
var renderer;
var scene;
var camera;

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
  renderer.render( scene, camera ); 
  requestAnimationFrame(animate);
});

// ==================

function init() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( width, height );

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1250 );
  camera.position.y = 600;
  camera.position.z = 600;
  camera.rotation.x = -45 * Math.PI / 180;

  scene.add( camera );

};

function initWorld() {
  // initialising a plane/floor
  var geo = new THREE.PlaneBufferGeometry(2000, 2000, 20, 20);
  // last two parameters split plane into a 20x20 grid, 
  // getting around the "distant vertices" optimization process
  var mat = new THREE.MeshBasicMaterial( { color: 0x9db3b5 } );
  var mesh = new THREE.Mesh( geo, mat );

  mesh.rotation.x = -90 * Math.PI / 180;

  // initialising a "building"
  geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  
  material = new THREE.MeshDepthMaterial();

  scene.add( mesh );
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

    THREE.GeometryUtils.merge(cityGeometry, building);
  }
  var city = new THREE.Mesh(cityGeometry, material);

  scene.add(city);
};

