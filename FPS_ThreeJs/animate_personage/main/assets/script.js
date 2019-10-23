var container, stats, clock, gui, mixer, actions, activeAction, previousAction;
var camera, scene, renderer, model, face;
var api = { state: 'Walking' };

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
    camera.position.set( - 5, 3, 10 );
    camera.lookAt( new THREE.Vector3( 0, 2, 0 ) );
    scene = new THREE.Scene();
    
    scene.background = new THREE.Color( 0xe0e0e0 );
    scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );
    clock = new THREE.Clock();

    // lights
    var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    light.position.set( 0, 20, 0 );
    scene.add( light );
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 20, 10 );
    scene.add( light );
    // ground
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    // model
    var loader = new THREE.GLTFLoader();
    loader.load( '/assets/models/gltf/RobotExpressive/RobotExpressive.glb', function( gltf ) {
        model = gltf.scene;
        scene.add( model );
        animatePNJ( model, gltf.animations );
    }, undefined, function( e ) {
        console.error( e );
    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    

}


function animatePNJ( model, animations ) {

    var states = [ 'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing' ];
    
    mixer = new THREE.AnimationMixer( model );
    actions = {};

    for ( var i = 0; i < animations.length; i++ ) {

        var clip = animations[ i ];
        var action = mixer.clipAction( clip );
        actions[ clip.name ] = action;

        if ( states.indexOf( clip.name ) >= 5 ) {

                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
                
        }

    }


    activeAction = actions['Walking'];
    
    activeAction.play();
    
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//
function animate() {

    var dt = clock.getDelta();
    if ( mixer ) mixer.update( dt );
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}