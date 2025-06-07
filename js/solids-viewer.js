import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Helper function to create colored wireframe geometry
function createSolid(geometry, color) {
  const material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: 100,
    flatShading: true,
    opacity: 0.9,
    transparent: true
  });

  const mesh = new THREE.Mesh(geometry, material);

  const wireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );

  mesh.add(wireframe);
  return mesh;
}

// Solids definitions
const solids = [];

// Cube (Earth - Green)
solids.push(createSolid(new THREE.BoxGeometry(1, 1, 1), 0x00ff00));

// Tetrahedron (Fire - Red)
solids.push(createSolid(new THREE.TetrahedronGeometry(1), 0xff0000));

// Octahedron (Air - Yellow)
solids.push(createSolid(new THREE.OctahedronGeometry(1), 0xffff00));

// Icosahedron (Water - Blue)
solids.push(createSolid(new THREE.IcosahedronGeometry(1), 0x0000ff));

// Dodecahedron (Aether - Violet/Purple)
solids.push(createSolid(new THREE.DodecahedronGeometry(1), 0x8a2be2));

// Position solids in a row
const spacing = 3;
solids.forEach((solid, index) => {
  solid.position.x = (index - 2) * spacing;
  scene.add(solid);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate each solid slowly
  solids.forEach((solid) => {
    solid.rotation.x += 0.01;
    solid.rotation.y += 0.01;
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
