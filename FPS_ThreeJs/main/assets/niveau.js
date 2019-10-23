var position = [
    [500, 100, 1000],
    [-500, 100, -1000],
    [500, 100, -1000],
];

function getRandomInt(max) {

    return Math.floor(Math.random() * Math.floor(max));

}

function setLevel(){
    
    // personage
    var loader = new THREE.GLTFLoader();
    loader.load( '/assets/models/gltf/RobotExpressive/RobotExpressive.glb', function( gltf ) {
                    
        var randInt = getRandomInt(position.length);



        model = gltf.scene;
        gltf.scene.scale.set(30, 30, 30);


        model.position.x += position[randInt][0];
        model.position.y -= position[randInt][1];
        model.position.z -= position[randInt][2];

        
        modelGTLF = gltf;

        if(pnjDirection.direction < 0 ){

            model.rotation.y += 3.14159

        }
        
        scene.add( model );

        animatePNJ( model, gltf.animations, 'Walking' );


    }, undefined, function( e ) {
        console.error( e );
    } );

}