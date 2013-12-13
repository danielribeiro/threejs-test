function collada_sample(canvasId, morphTarget, callback) {
  if (morphTarget == null) {
    morphTarget = 30;
  }
  this.devicePixelRatio = 1; // Won't work on firefox on macbook retina though.
  // scene size
  var WIDTH = 1400;
  var HEIGHT = 800;

  var container = document.body;
  var camera, scene, renderer;
  var particleLight, pointLight;
  var dae, skin;


  var hasDaeLoaded = false;
  var hasTextureLoaded = false;
  var initRendering = function () {
    if (!(hasDaeLoaded && hasTextureLoaded)) {
      return;
    }
    init();
    animate();
    if (callback) callback();
  };
  var loader = new THREE.ColladaLoader(function (collada) {
    hasTextureLoaded = true;
    initRendering();
  });
  loader.options.convertUpAxis = true;
  loader.load('/vendor/models/monster.dae', function (collada) {
    dae = collada.scene;
    skin = collada.skins[ 0 ];
    dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
    dae.updateMatrix();
    hasDaeLoaded = true;
    initRendering();
  });

  function init() {

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
    camera.position.set(2, 2, 3);

    scene = new THREE.Scene();

    // Grid

    var size = 14, step = 1;

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: 0x303030 });

    for (var i = -size; i <= size; i += step) {

      geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
      geometry.vertices.push(new THREE.Vector3(size, -0.04, i));

      geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
      geometry.vertices.push(new THREE.Vector3(i, -0.04, size));

    }

    var line = new THREE.Line(geometry, material, THREE.LinePieces);
    scene.add(line);

    // Add the COLLADA

    scene.add(dae);

    particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    scene.add(particleLight);

    // Lights

    scene.add(new THREE.AmbientLight(0xcccccc));

    var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee);
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    pointLight = new THREE.PointLight(0xffffff, 4);
    pointLight.position = particleLight.position;
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
    renderer.setSize(WIDTH, HEIGHT);

    var canvas = renderer.domElement;
    canvas.setAttribute("id", canvasId);
    container.appendChild( canvas );
    canvas.width = WIDTH;
    canvas.height = HEIGHT;


    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();

    renderer.setSize(WIDTH, HEIGHT);

  }

  //

  function animate() {

    // requestAnimationFrame( animate );

    if (skin) {

      // guess this can be done smarter...

      // (Indeed, there are way more frames than needed and interpolation is not used at all
      //  could be something like - one morph per each skinning pose keyframe, or even less,
      //  animation could be resampled, morphing interpolation handles sparse keyframes quite well.
      //  Simple animation cycles like this look ok with 10-15 frames instead of 100 ;)

      for (var i = 0; i < skin.morphTargetInfluences.length; i++) {

        skin.morphTargetInfluences[ i ] = 0;

      }
      var morph = morphTarget
      skin.morphTargetInfluences[morph] = 1;

    }

    render();

  }

  function render() {

    var timer = 0.7;
    camera.position.x = Math.cos(timer) * 10;
    camera.position.y = 2;
    camera.position.z = Math.sin(timer) * 10;

    camera.lookAt(scene.position);

    particleLight.position.x = Math.sin(timer * 4) * 3009;
    particleLight.position.y = Math.cos(timer * 5) * 4000;
    particleLight.position.z = Math.cos(timer * 4) * 3009;

    renderer.render(scene, camera);

  }
}