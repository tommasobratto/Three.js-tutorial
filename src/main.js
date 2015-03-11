// refactoring and texturing based on the guide at this URL: 'http://solutiondesign.com/webgl-and-three-js-texture-mapping/'

var renderer; 
var scene;
var camera;
var mesh;
var earthMesh

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

  earthGeometry = new THREE.SphereGeometry(10, 32, 32);
  earthMaterial = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/1_earth_8k.jpg') } );

  earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
  earthMesh.position.set(20, 1, 1);

  camera.lookAt(earthMesh.position);

  scene.add( mesh, earthMesh );

  var directionalLight = new THREE.DirectionalLight( 0xFFFFF0, 1 );
  directionalLight.position.set(1, 1, 1)

  scene.add( directionalLight );
}

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  earthMesh.rotation.y += 0.01;

  render();
  requestAnimationFrame( animate );
};

function render() {
  renderer.render( scene, camera );
};
