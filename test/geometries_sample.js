// ORIGINAL: https://github.com/mrdoob/three.js/blob/r65/examples/webgl_geometries2.html
  /* Testing the new Parametric Surfaces Geometries*/
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  var container, stats;

  var camera, scene, renderer;

  init();
  animate();

  function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 400;

    scene = new THREE.Scene();

    var light, object, materials;

    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);

    var map = THREE.ImageUtils.loadTexture('textures/ash_uvgrid01.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;

    materials = [
      new THREE.MeshLambertMaterial({ ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1, side: THREE.DoubleSide })
    ];


    var heightScale = 1;
    var p = 2;
    var q = 3;
    var radius = 150, tube = 10, segmentsR = 50, segmentsT = 20;

    var GrannyKnot = new THREE.Curves.GrannyKnot();

    var torus2 = new THREE.ParametricGeometries.TorusKnotGeometry(radius, tube, segmentsR, segmentsT, p, q, heightScale);
    var sphere2 = new THREE.ParametricGeometries.SphereGeometry(75, 20, 10);
    var tube2 = new THREE.ParametricGeometries.TubeGeometry(GrannyKnot, 150, 2, 8, true, false);

    // var torus = new THREE.TorusKnotGeometry( radius, tube, segmentsR, segmentsT, p , q, heightScale );
    // var sphere = new THREE.SphereGeometry( 75, 20, 10 );
    // var tube = new THREE.TubeGeometry( GrannyKnot, 150, 2, 8, true, false );


    // var benchmarkCopies = 1000;
    // var benchmarkObject = tube;
    // var rand = function() { return (Math.random() - 0.5 ) * 600; };
    // for (var b=0;b<benchmarkCopies;b++) {
    //    object = THREE.SceneUtils.createMultiMaterialObject( benchmarkObject, materials );
    //   object.position.set( rand(), rand(), rand() );
    //   scene.add( object );
    // }

    console.log(THREE.ParametricGeometries);
    var geo;

    // Klein Bottle

    geo = new THREE.ParametricGeometry(THREE.ParametricGeometries.klein, 20, 20);
    object = THREE.SceneUtils.createMultiMaterialObject(geo, materials);
    object.position.set(0, 0, 0);
    object.scale.multiplyScalar(10);
    scene.add(object);

    // Mobius Strip

    geo = new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius, 20, 20);
    object = THREE.SceneUtils.createMultiMaterialObject(geo, materials);
    object.position.set(10, 0, 0);
    object.scale.multiplyScalar(100);
    scene.add(object);

    var geo = new THREE.ParametricGeometry(THREE.ParametricGeometries.plane(200, 200), 10, 20);
    // document.body.appendChild( THREE.UVsDebug( geo ));
    object = THREE.SceneUtils.createMultiMaterialObject(geo, materials);
    object.position.set(0, 0, 0);
    scene.add(object);

    // object = THREE.SceneUtils.createMultiMaterialObject( torus, materials );
    // object.position.set( 0, 0, 0 );
    // scene.add( object );

    object = THREE.SceneUtils.createMultiMaterialObject(torus2, materials);
    object.position.set(0, 100, 0);
    scene.add(object);


    //  object = THREE.SceneUtils.createMultiMaterialObject( sphere, materials );
    //  object.position.set( 500, 0, 0 );
    //  scene.add( object );

    object = THREE.SceneUtils.createMultiMaterialObject(sphere2, materials);
    // document.body.appendChild( THREE.UVsDebug( sphere2 ));
    object.position.set(200, 0, 0);
    scene.add(object);

    // object = THREE.SceneUtils.createMultiMaterialObject( tube, materials );
    // object.position.set( 0, 0, 0 );
    // scene.add( object );

    object = THREE.SceneUtils.createMultiMaterialObject(tube2, materials);
    object.position.set(100, 0, 0);
    scene.add(object);


    // object = THREE.SceneUtils.createMultiMaterialObject( new THREE.PlaneGeometry( 400, 400, 4, 4 ), materials );
    // object.position.set( -200, 100, 0 );
    // scene.add( object );

    // object = THREE.SceneUtils.createMultiMaterialObject( new THREE.PlaneGeometry2( 400, 400, 4, 4 ), materials );
    // object.position.set( -200, 100, 0 );
    // scene.add( object );

    object = new THREE.AxisHelper(50);
    object.position.set(200, 0, -200);
    scene.add(object);

    object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50);
    object.position.set(200, 0, 400);
    scene.add(object);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  //

  function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

  }

  function render() {

    var timer = Date.now() * 0.0001;

    camera.position.x = Math.cos(timer) * 800;
    camera.position.z = Math.sin(timer) * 800;

    camera.lookAt(scene.position);

    for (var i = 0, l = scene.children.length; i < l; i++) {

      var object = scene.children[ i ];

      object.rotation.x = timer * 5;
      object.rotation.y = timer * 2.5;

    }

    renderer.render(scene, camera);

  }