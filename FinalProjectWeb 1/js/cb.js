var camera,mirrorCamera, scene, renderer, controls;
var geometry, material, mesh;
var arr=[];
var arr1 = [];
var arr2 = [];
function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 125000);
  camera.position.set(0, 300, 700);
  scene.add(camera);


  mirrorCamera = new THREE.CubeCamera(0.1, 120000, 512);

  scene.add(mirrorCamera);

  var material1 = new THREE.MeshBasicMaterial({color:0xffffff, envMap: mirrorCamera.renderTarget});

  var loader = new THREE.JSONLoader();
  loader.load('js/spaceship.json', function(mgeometry){
  for (var object = 0; object < 50; object ++){

  var modelMesh = new THREE.Mesh(mgeometry, material1);
            modelMesh.scale.set(25, 25, 25);
            modelMesh.position.x = (Math.random() - 0.6) * 6000;
            modelMesh.position.y = (Math.random() - 0.6) * 5000;
            modelMesh.position.z = (Math.random() - 0.6) * 5000;
            arr.push(modelMesh);
            scene.add(modelMesh);}

    });

  var birdloader = new THREE.JSONLoader();
  birdloader.load('js/bird.json', function(mgeometry){
  for (var object = 0; object < 3; object ++){

  var modelMesh = new THREE.Mesh(mgeometry, material1);
            modelMesh.scale.set(100, 100, 100);
            modelMesh.position.x = (Math.random() - 0.6) * 5000;
            modelMesh.position.y = (Math.random() - 0.6) * 5000;
            modelMesh.position.z = (Math.random() - 0.6) * 5000;
            arr1.push(modelMesh);
            scene.add(modelMesh);}

    });


  var mothershiploader = new THREE.JSONLoader();
    mothershiploader.load('js/mothership.json', function(mgeometry){
    for (var object = 0; object < 1; object ++){

    var modelMesh = new THREE.Mesh(mgeometry, material1);
              modelMesh.scale.set(500, 500, 500);
              modelMesh.position.x = -5000;
              modelMesh.position.y = -5000;
              modelMesh.position.z = -5000;
              arr2.push(modelMesh);
              scene.add(modelMesh);}

      });




  // skybox files
  var path = "./spaces/";
  var format = ".png";
  var urls = [
    path + 'pos-x' + format, path + 'neg-x' + format,
    path + 'pos-y' + format, path + 'neg-y' + format,
    path + 'pos-z' + format, path + 'neg-z' + format
  ];

  skybox = new THREE.CubeTextureLoader().load( urls );
  skybox.format = THREE.RGBFormat;

  // skybox rendering
  var shader = THREE.ShaderLib["cube"];
  shader.uniforms[ "tCube" ].value = skybox;

  var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  var geometry = new THREE.BoxGeometry(120000, 120000, 120000);

  var mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);





  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  mirrorCamera.updateCubeMap(renderer, scene);
  renderer.render(scene, camera);
  controls.update();
  for(var i=0;i <arr.length;i++){
    arr[i].position.x -= 15 ;
  }


  for (var i= 0; i < arr1.length; i++){
    arr1[i].position.x -= 9;
  }

  for (var i= 0; i < arr2.length; i++){
    arr2[i].position.x -= 5;
  }


}

init();
animate();
