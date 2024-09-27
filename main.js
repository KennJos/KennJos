import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
const cube = new THREE.Mesh(geometry,material);

const geo2 = new THREE.BoxGeometry(1,1,4);
const mats = new THREE.MeshBasicMaterial({color:0xFFA500});
const icosahedron = new THREE.Mesh(geo2,mats);
icosahedron.position.x = 3;
scene.add(cube,icosahedron);

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    //icosahedron.translateX(-0.1);
	renderer.render(scene,camera);
}


//Check if WebGL2 is available on user's browser
if (WebGL.isWebGL2Available()) {
	renderer.setAnimationLoop(animate);
} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById('container').appendChild(warning);
}
