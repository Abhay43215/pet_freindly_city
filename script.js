// Loading Animation
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after transition completes
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// Scroll Animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Form Submission Animation
const initFormAnimation = () => {
  const form = document.getElementById('volunteer-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value) {
        isValid = false;
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = '#ddd';
      }
    });
    
    if (isValid) {
      // Show success message
      const button = form.querySelector('button');
      const originalText = button.textContent;
      
      button.textContent = 'Thanks for joining! 🎉';
      button.style.backgroundColor = '#4CAF50';
      
      // Reset form after animation
      setTimeout(() => {
        form.reset();
        button.textContent = originalText;
      }, 3000);
    }
  });
};

// 3D Pet Model using Three.js
const initPetModel = () => {
  try {
    const container = document.getElementById('pet-model-container');
    if (!container) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8f0);
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Create a simple dog model
    const dogGroup = new THREE.Group();
    
    // Dog body
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 0.8, 1.2);
    dogGroup.add(body);
    
    // Dog head
    const headGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.3, 1.1);
    dogGroup.add(head);
    
    // Dog ears
    const earGeometry = new THREE.ConeGeometry(0.3, 0.6, 32);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.4, 0.7, 1);
    leftEar.rotation.x = -Math.PI / 4;
    dogGroup.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.4, 0.7, 1);
    rightEar.rotation.x = -Math.PI / 4;
    dogGroup.add(rightEar);
    
    // Dog tail
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1, 32);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0.3, -1.2);
    tail.rotation.x = Math.PI / 4;
    dogGroup.add(tail);
    
    // Dog legs
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(-0.5, -0.8, 0.7);
    dogGroup.add(frontLeftLeg);
    
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.5, -0.8, 0.7);
    dogGroup.add(frontRightLeg);
    
    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.5, -0.8, -0.7);
    dogGroup.add(backLeftLeg);
    
    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(0.5, -0.8, -0.7);
    dogGroup.add(backRightLeg);
    
    // Add the dog to the scene
    scene.add(dogGroup);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the dog slightly
      dogGroup.rotation.y += 0.005;
      
      // Animate the tail
      tail.rotation.z = Math.sin(Date.now() * 0.005) * 0.2;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Add rotation controls
    const rotateLeft = document.getElementById('rotate-left');
    const rotateRight = document.getElementById('rotate-right');
    
    if (rotateLeft && rotateRight) {
      rotateLeft.addEventListener('click', () => {
        dogGroup.rotation.y -= Math.PI / 4;
      });
      
      rotateRight.addEventListener('click', () => {
        dogGroup.rotation.y += Math.PI / 4;
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  } catch (error) {
    console.error('Error initializing 3D model:', error);
    initPetModelFallback();
  }
};

// Fallback for 3D model
const initPetModelFallback = () => {
  const container = document.getElementById('pet-model-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="model-fallback">
      <img src="https://i.imgur.com/8ZP4lGm.png" alt="Dog mascot">
      <p>3D model not available. Please check your internet connection.</p>
    </div>
  `;
  
  // Hide controls
  const controls = document.querySelector('.model-controls');
  if (controls) {
    controls.style.display = 'none';
  }
};

// Initialize pet map
const initPetMap = () => {
  const mapContainer = document.getElementById('pet-map');
  if (!mapContainer) return;
  
  // Create a simple map
  const mapLocations = [
    { type: 'parks', name: 'Central Dog Park', x: 20, y: 30 },
    { type: 'parks', name: 'Riverside Pet Area', x: 70, y: 40 },
    { type: 'cafes', name: 'Paws & Coffee', x: 40, y: 60 },
    { type: 'cafes', name: 'Barking Brews', x: 80, y: 70 },
    { type: 'vets', name: 'City Pet Hospital', x: 30, y: 80 },
    { type: 'vets', name: 'Animal Wellness Center', x: 60, y: 20 }
  ];
  
  // Create a simple map visualization
  mapContainer.innerHTML = `
    <div class="map-placeholder">
      <h3>Interactive Pet-Friendly Map</h3>
      <p>Showing all pet-friendly locations in the city</p>
      <div class="map-dots">
        ${mapLocations.map(location => 
          `<div class="map-dot ${location.type}" data-type="${location.type}" 
                style="left: ${location.x}%; top: ${location.y}%">
            <span class="dot-tooltip">${location.name}</span>
          </div>`
        ).join('')}
      </div>
    </div>
  `;
  
  // Add filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const mapDots = document.querySelectorAll('.map-dot');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      // Filter map dots
      mapDots.forEach(dot => {
        if (filter === 'all' || dot.getAttribute('data-type') === filter) {
          dot.style.display = 'block';
        } else {
          dot.style.display = 'none';
        }
      });
    });
  });
};

// Add paw prints to background
const createPawBackground = () => {
  const pawBackground = document.querySelector('.paw-background');
  if (!pawBackground) return;
  
  for (let i = 0; i < 20; i++) {
    const paw = document.createElement('div');
    paw.className = 'paw';
    paw.style.left = Math.random() * 100 + 'vw';
    paw.style.top = Math.random() * 100 + 'vh';
    paw.style.animationDelay = Math.random() * 10 + 's';
    pawBackground.appendChild(paw);
  }
};

// Add confetti effect when joining
const initJoinButton = () => {
  const joinBtn = document.getElementById('join-btn');
  if (!joinBtn) return;
  
  joinBtn.addEventListener('click', () => {
    // Create confetti elements
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
      confettiContainer.remove();
    }, 5000);
    
    // Show modal
    const modal = document.createElement('div');
    modal.className = 'join-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Thank You for Joining! 🎉</h3>
        <p>Together we can make our city more pet-friendly!</p>
        <button id="close-modal">Continue</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal
    document.getElementById('close-modal').addEventListener('click', () => {
      modal.remove();
    });
  });
};

// Story card hover effect
const initStoryCards = () => {
  const storyCards = document.querySelectorAll('.story');
  storyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
};

// Add CSS for additional elements
const addAdditionalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .confetti-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
    
    .confetti {
      position: absolute;
      top: -10px;
      width: 10px;
      height: 10px;
      background-color: var(--primary);
      animation: fall 5s linear forwards;
    }
    
    @keyframes fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
    
    .join-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    
    .modal-content {
      background-color: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      max-width: 500px;
      animation: modalPop 0.5s forwards;
    }
    
    @keyframes modalPop {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .map-placeholder {
      background-color: #e9f5e9;
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      height: 400px;
      position: relative;
    }
    
    .map-dots {
      position: relative;
      height: 300px;
      margin-top: 1rem;
    }
    
    .map-dot {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--primary);
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .map-dot.parks { background-color: #4CAF50; }
    .map-dot.cafes { background-color: #FFC107; }
    .map-dot.vets { background-color: #2196F3; }
    
    .map-dot:hover {
      transform: scale(1.5);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      z-index: 10;
    }
    
    .dot-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      padding: 0.5rem;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    
    .map-dot:hover .dot-tooltip {
      opacity: 1;
    }
    
    .map-filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    .filter-btn {
      background-color: white;
      border: 2px solid var(--primary);
      color: var(--primary);
      padding: 0.5rem 1rem;
    }
    
    .filter-btn.active {
      background-color: var(--primary);
      color: white;
    }
  `;
  document.head.appendChild(style);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add additional styles
  addAdditionalStyles();
  
  // Initialize all components
  animateOnScroll();
  createPawBackground();
  
  // Try to initialize 3D model, with fallback
  try {
    if (typeof THREE !== 'undefined') {
      initPetModel();
    } else {
      initPetModelFallback();
    }
  } catch (error) {
    console.error('Error with 3D model:', error);
    initPetModelFallback();
  }
  
  initPetMap();
  initFormAnimation();
  initJoinButton();
  initStoryCards();
});