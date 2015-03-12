var renderer;
var scene;
var camera;

var width = window.innerWidth;
var height = window.innerHeight;

initThreeJS();
initWorld();
render();

function initThreeJS() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.shadowMapEnable = true;
  renderer.shadowMapSoft = true;

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, width / heigth, 0.1, 10000);

  scene.add( camera );
};

function initWorld() {
  for(var i = 0, rows = map.length; i < rows; i++) {
    for(var j = 0, cols = map[i].length; j = cols; j++) {
      addVoxel(map[i].charAt(j), i, j);
    }
  };

};

function addVoxel(type, row, col) {
  var z = (row + 1) * HORIZONTAL_UNIT - ZSIZE * 0.5,
  x = (col + 1) * HORIZONTAL_UNIT - XSIZE * 0.5;
  
  switch(type) {
    case ' ': break;
    case 'S': spawnPoints.push(new THREE.Vector3(x, 0, z));
    break;
    case 'X': var geo = new THREE.BoxGeometry(HORIZONTAL_UNIT, VERTICAL_UNIT, HORIZONTAL_UNIT);
    
    var material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
    var mesh = new THREE.Mesh( geo, material );
    mesh.position.set(x, VERTICAL_UNIT * 0.5, z);
    scene.add( mesh );
    break;
  }
};

function render() {
  requestAnimationFrame( render );

  renderer.render( scene, camera );
};

//MAP====================

var map = "XXXXXXX  \n" +
          "X     X  \n" +
          "X  S  X  \n" +
          "X     X  \n" +
          "X   S XXX\n" +
          "XXX     X\n" +
          "  XX  S X\n" +
          "   X    X\n" +
          "   XXXXXX"; 

map = map.split("\n")  ;
var HORIZONTAL_UNIT = 100,
    VERTICAL_UNIT = 100,  
    ZSIZE = map.length * HORIZONTAL_UNIT,
    XSIZE = map[0].length * HORIZONTAL_UNIT;
//========================