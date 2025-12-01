import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ParticleSystemProps {
  audioAmplitude: number;
  isActive: boolean;
  isListening: boolean;
}

export const ParticleSystem = ({ audioAmplitude, isListening }: ParticleSystemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    if (containerRef.current.children.length === 0) {
      containerRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // Create floating particle system
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Theme colors
    const color1 = new THREE.Color(0x00d9ff); // cyan
    const color2 = new THREE.Color(0x0ea5e9); // blue
    const color3 = new THREE.Color(0x14b8a6); // teal

    // Distribute particles in a large volume
    const spread = 40;
    for (let i = 0; i < particleCount; i++) {
      // Random positions in 3D space
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;

      // Random velocities for floating motion
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      // Random phase for wave motion
      phases[i] = Math.random() * Math.PI * 2;

      // Color gradient
      const colorMix = Math.random();
      let color: THREE.Color;
      if (colorMix < 0.33) {
        color = color1.clone().lerp(color2, colorMix * 3);
      } else if (colorMix < 0.66) {
        color = color2.clone().lerp(color3, (colorMix - 0.33) * 3);
      } else {
        color = color3.clone().lerp(color1, (colorMix - 0.66) * 3);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied particle sizes
      sizes[i] = 2.0 + Math.random() * 2.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    // Enhanced particle shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        amplitude: { value: 0 },
        isListening: { value: 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute vec3 velocity;
        attribute float phase;
        varying vec3 vColor;
        varying float vBrightness;
        uniform float time;
        uniform float amplitude;
        uniform float isListening;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Floating motion
          pos.x += sin(time * 0.5 + phase) * 2.0;
          pos.y += cos(time * 0.3 + phase * 1.5) * 2.0;
          pos.z += sin(time * 0.4 + phase * 0.8) * 1.0;
          
          // React to voice - expand outward
          float distance = length(pos);
          vec3 direction = normalize(pos);
          float expansion = amplitude * 8.0;
          pos += direction * expansion;
          
          // Sway effect on loud voice
          if (amplitude > 0.3) {
            pos.x += sin(time * 4.0 + phase) * amplitude * 3.0;
            pos.y += cos(time * 3.0 + phase) * amplitude * 3.0;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Dynamic size based on amplitude and listening state
          float dynamicSize = size * (1.0 + amplitude * 2.0 + isListening * 0.5);
          gl_PointSize = dynamicSize * (300.0 / -mvPosition.z);
          
          // Brightness for fragment shader
          vBrightness = 1.0 + amplitude * 2.0 + isListening * 0.8;
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vBrightness;
        uniform float amplitude;
        uniform float isListening;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Soft glow
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha = pow(alpha, 1.5);
          
          // Enhanced brightness when speaking
          vec3 finalColor = vColor * vBrightness;
          
          // Pulsing glow
          float glow = isListening * 0.3;
          float finalAlpha = alpha * (0.7 + glow + amplitude * 0.4);
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Central waveform orb
    const orbGeometry = new THREE.SphereGeometry(2, 32, 32);
    const orbMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        amplitude: { value: 0 },
        isListening: { value: 0.0 },
        color1: { value: new THREE.Color(0x00d9ff) },
        color2: { value: new THREE.Color(0x0ea5e9) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float amplitude;
        uniform float time;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Pulse with voice
          float pulse = 1.0 + amplitude * 3.0;
          
          // Waveform distortion
          float wave = sin(position.y * 5.0 + time * 3.0) * amplitude * 0.3;
          vec3 pos = position * (pulse + wave);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform float amplitude;
        uniform float isListening;
        uniform vec3 color1;
        uniform vec3 color2;
        
        void main() {
          // Fresnel rim glow
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          // Animated color gradient
          float gradient = sin(vPosition.y * 3.0 + time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, gradient);
          
          // Intensity based on voice and listening state
          float intensity = 0.3 + amplitude * 2.0 + isListening * 0.5 + fresnel * 1.2;
          
          float alpha = 0.5 + fresnel * 0.6 + amplitude * 0.4;
          
          gl_FragColor = vec4(color * intensity, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);
    orbRef.current = orb;

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      
      if (particlesRef.current) {
        const material = particlesRef.current.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
        material.uniforms.amplitude.value = audioAmplitude;
        material.uniforms.isListening.value = isListening ? 1.0 : 0.0;

        // Gentle rotation
        particlesRef.current.rotation.y = time * 0.05;
        particlesRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
      }

      // Update orb
      if (orb) {
        const orbMat = orb.material as THREE.ShaderMaterial;
        orbMat.uniforms.time.value = time;
        orbMat.uniforms.amplitude.value = audioAmplitude;
        orbMat.uniforms.isListening.value = isListening ? 1.0 : 0.0;
        orb.rotation.y = time * 0.3;
        orb.rotation.x = Math.sin(time * 0.2) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Smooth amplitude transitions
  useEffect(() => {
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.ShaderMaterial;
      gsap.to(material.uniforms.amplitude, {
        value: audioAmplitude,
        duration: 0.1,
        ease: 'power1.out'
      });
    }
    if (orbRef.current) {
      const material = orbRef.current.material as THREE.ShaderMaterial;
      gsap.to(material.uniforms.amplitude, {
        value: audioAmplitude,
        duration: 0.1,
        ease: 'power1.out'
      });
    }
  }, [audioAmplitude]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  );
};