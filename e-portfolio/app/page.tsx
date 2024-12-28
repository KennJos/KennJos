'use client';

import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container')?.appendChild(renderer.domElement);

    const geo1 = new THREE.BoxGeometry();
    const mat1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geo1, mat1);
    cube.position.z = -5;

    const geo2 = new THREE.IcosahedronGeometry();
    const mats = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const icosahedron = new THREE.Mesh(geo2, mats);
    icosahedron.position.x = 3;

    scene.add(cube, icosahedron);

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    if (WebGL.isWebGL2Available()) {
      renderer.setAnimationLoop(animate);
    } else {
      const warning = WebGL.getWebGL2ErrorMessage();
      document.getElementById('container')?.appendChild(warning);
    }

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <main>
      <div id="container" />
    </main>
  );
}