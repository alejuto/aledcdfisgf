const system = document.getElementById("solar-system");
const scene = document.getElementById("scene");

let scale = 1;
let rotationY = 0;

const ORBITS = 10;
const perOrbit = Math.ceil(reasons.length / ORBITS);
let index = 0;

// ZOOM CON RUEDITA (PC)
window.addEventListener("wheel", e => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(0.5, scale), 2.5);
  updateScene();
}, { passive:false });

// ZOOM CON DEDOS (CELULAR)
let lastDist = null;
window.addEventListener("touchmove", e => {
  if(e.touches.length === 2){
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if(lastDist){
      scale += (dist - lastDist) * 0.002;
      scale = Math.min(Math.max(0.5, scale), 2.5);
      updateScene();
    }
    lastDist = dist;
  }
}, { passive:false });

window.addEventListener("touchend", ()=> lastDist=null);

function updateScene(){
  scene.style.transform =
    `translate(-50%, -50%) scale(${scale}) rotateY(${rotationY}deg)`;
}

// CREAR ÓRBITAS
for(let o=0;o<ORBITS;o++){
  const orbit = document.createElement("div");
  orbit.className="orbit";
  scene.appendChild(orbit);

  const radius = 220 + o * 60;
  const speed = 0.00015 + o * 0.00006; // lento y suave

  const slice = reasons.slice(index, index + perOrbit);
  index += perOrbit;

  function animate(){
    rotationY += 0.02; // rotación 3D lenta

    orbit.innerHTML="";
    slice.forEach((text, i) => {
      const angle =
        (i / slice.length) * Math.PI * 2 +
        performance.now() * speed;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 0.5) * 40;

      const planet = document.createElement("div");
      planet.className="planet";
      planet.textContent = text;

      planet.style.transform =
        `translate3d(${x}px, ${y}px, ${z}px)`;

      orbit.appendChild(planet);
    });

    updateScene();
    requestAnimationFrame(animate);
  }

  animate();
}
