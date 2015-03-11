var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );

document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10000 );

camera.position.z = 50;

scene.add( camera );

var geometry = new THREE.SphereGeometry( 10, 24, 16 );
var material = new THREE.MeshPhongMaterial( { color: 'green' } );
var sphere =  new THREE.Mesh( geometry, material );

sphere.position.set(1, 1, 1)

scene.add( sphere );

var directionalLight = new THREE.DirectionalLight( 0x00FF00, 1 );
directionalLight.position.set(1, 1, 1)

scene.add( directionalLight );

function render() {
  requestAnimationFrame( render );

  renderer.render( scene, camera );
};

render();