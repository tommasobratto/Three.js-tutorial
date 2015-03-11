// http://solutiondesign.com/webgl-and-three-js-texture-mapping/

var renderer; 
var scene;
var camera;
var mesh;

var width = window.innerWidth;
var height = window.innerHeight;

init();
render();
animate();

function init() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( width, height );

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10000 );

  camera.position.z = 50;

  scene.add( camera );

  geometry = new THREE.BoxGeometry( 10, 10, 10);
  material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/crate.jpg') } );

  mesh = new THREE.Mesh( geometry, material );

  scene.add( mesh );

  var directionalLight = new THREE.DirectionalLight( 0xFFFFF0, 1 );
  directionalLight.position.set(1, 1, 1)

  scene.add( directionalLight );
}

function animate() {
  mesh.rotation.x += 0.04;
  mesh.rotation.y += 0.04;

  render();
  requestAnimationFrame( animate );
};

function render() {
  renderer.render( scene, camera );
};
