'use client';
/***
import * as THREE from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    //Check WebGL compatibility first
    if (!WebGL.isWebGL2Available()) {
      const warning = WebGL.getWebGL2ErrorMessage();
      const container = document.getElementById('three-container');
      if (container) {
        container.appendChild(warning);
      }
      return;
    }

    //Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('three-container');
    if (container) {
      container.appendChild(renderer.domElement);
    }

    //Testing stuff
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    
    const geo2 = new THREE.IcosahedronGeometry();
    const mats = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const icosahedron = new THREE.Mesh(geo2, mats);
    
    icosahedron.position.x = 3;
    scene.add(cube, icosahedron);

    
    camera.position.z = 5;

    //Animation function
    function animate() {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    }

    
    animate();

    //Cleanup
    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      geo2.dispose();
      mats.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <main className="min-h-screen">
      <div id="three-container" className="fixed top-0 left-0 w-screen h-screen -z-10" />
    </main>
  );
}
  */
 
import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    //Check WebGL compatibility first
    if (!WebGL.isWebGL2Available()) {
      const warning = WebGL.getWebGL2ErrorMessage();
      const container = document.getElementById('three-container');
      if (container) {
        container.appendChild(warning);
      }
      return;
    }
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
    loader.load("/dooronly.glb", function (gltf) {
      const door = gltf.scene;
      door.rotation.y = Math.PI / 2;
      scene.add(door);
    });

    camera.position.z = 5;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <main className="min-h-screen">
      <div id="three-container" className="fixed top-0 left-0 w-screen h-screen -z-10" />
    </main>
  )
}

