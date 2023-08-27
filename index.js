let scene, camera, renderer;
let geoArr = [];
let starGeo;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  for (let i = 0; i < 5000; i++) {
    star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.005;
    geoArr.push(star);
  }
  starGeo = new THREE.BufferGeometry().setFromPoints(geoArr);

  let sprite = new THREE.TextureLoader().load("circle.png");
  let starMaterial = new THREE.PointsMaterial({
    color: "gray",
    size: 0.6,
    map: sprite,
  });
  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
  animate();
}
init();

function animate() {
  const positions = starGeo.attributes.position.array;
  //   console.log(positions.length);
  //   console.log(geoArr.length);
  for (let i = 0; i < geoArr.length; i++) {
    geoArr[i].velocity += geoArr[i].acceleration;
    positions[i * 3 + 1] -= geoArr[i].velocity;

    if (positions[i * 3 + 1] < -200) {
      //out of canvas
      positions[i * 3 + 1] = 200;
      geoArr[i].velocity = 0;
    }
  }

  starGeo.attributes.position.needsUpdate = true;
  stars.rotation.y += 0.002;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
