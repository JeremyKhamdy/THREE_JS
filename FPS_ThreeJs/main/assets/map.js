//Miss png
// 2 == atterisseur (Mettre au centre de la map)
// 3 == base nasa (en mettre plusieur ?)
// 4 == rover
// 5 == Observatoir (en mettre plusieur ?)



// EXEMPLE DE FONCTION DE GENERATION DE MAP



function generateMap(){

    const map = [
        [0,0,0,0,0,0,0,0,0,4],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,0,0,0],
        [0,0,0,1,7,1,1,0,0,0],
        [0,0,0,1,5,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,8,0,0,0],
        [0,0,0,0,6,0,0,9,0,0],
        [3,0,0,0,0,0,0,0,0,3]
    ];
    // 

    setLimit();

    for(let i = 0; i < map.length ; i++){


        for( let j = 0; j < map[i].length; j++){
            
            switch (map[i][j]) {
                case 3:

                        const TextureLoader = new THREE.MTLLoader();

                        // Load 3d gun object
                        TextureLoader.setTexturePath('/assets/building_obj/');
                        TextureLoader.setPath('/assets/building_obj/');
                        TextureLoader.load('HDU_lowRez.mtl', function (materials) {

                                materials.preload();

                                const objLoader = new THREE.OBJLoader();

                                objLoader.setMaterials(materials);
                                objLoader.setPath('/assets/building_obj/');
                                objLoader.load('HDU_lowRez.obj', function (object) {
                        
                                    object.position.x = 500 + i*50;
                                    object.position.y -= 100;
                                    object.position.z = 50 + j*100;

                                    

                                    const textureLoader = new THREE.TextureLoader();
                                    const map = textureLoader.load('/assets/building_obj/HDU_01.jpg');
                                    const material = new THREE.MeshPhongMaterial({map: map});
                                    
                                    object.traverse( function ( child ) {
                                        if ( child instanceof THREE.Mesh ) {
                                            child.material = material
                                        }
                                    });

                                    var geometry = new THREE.BoxGeometry( 700, 500, 400 );
                                    var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                                    var cube1 = new THREE.Mesh( geometry, material2 );


                                    cube1.position.y = object.position.y
                                    cube1.position.x = object.position.x
                                    cube1.position.z = object.position.z

                                    objects.push( cube1 );
                                    scene.add( cube1 );
                                    
                                    object.scale.set(0.6, 0.6, 0.6);
                                    scene.add( object );
                        
                                });

                        });


                        // Load 3d gun object
                        TextureLoader.setTexturePath('/assets/building_obj/');
                        TextureLoader.setPath('/assets/building_obj/');
                        TextureLoader.load('HDU_lowRez_part2.mtl', function (materials) {

                                materials.preload();

                                const objLoader = new THREE.OBJLoader();

                                objLoader.setMaterials(materials);
                                objLoader.setPath('/assets/building_obj/');
                                objLoader.load('HDU_lowRez_part2.obj', function (object) {
                        
                                    object.position.x = 500 + i*50;
                                    object.position.y -= 100;
                                    object.position.z = 20 + j*100;

                                    const textureLoader = new THREE.TextureLoader();
                                    const map = textureLoader.load('/assets/building_obj/HDU_02.jpg');
                                    const material = new THREE.MeshPhongMaterial({map: map});
                                    
                                    object.traverse( function ( child ) {
                                        if ( child instanceof THREE.Mesh ) {
                                            child.material = material
                                        }
                                    });
                                    
                                    object.scale.set(0.5, 0.4, 0.4);
                                    scene.add( object );

                                });

                        });


                    break;

                    case 4:

                        const VaisseauTextureLoader = new THREE.MTLLoader();
                    
                        // Load 3d gun object
                        VaisseauTextureLoader.setTexturePath('/assets/building_obj/');
                        VaisseauTextureLoader.setPath('/assets/building_obj/');
                        VaisseauTextureLoader.load('futuristic spacecraft_obj.mtl', function (materials) {

                                materials.preload();

                                const objLoader = new THREE.OBJLoader();

                                objLoader.setMaterials(materials);
                                objLoader.setPath('/assets/building_obj/');
                                objLoader.load('futuristic spacecraft_obj.obj', function (object) {
                        
                                    object.position.x = 100 + i*50;
                                    object.position.z = 100 + j*50;
                                    object.position.y -= 50;
                                    
                                    object.scale.set(25, 35, 25);

                                    var geometry = new THREE.BoxGeometry( 300, 200, 350 );
                                    var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                                    var cube2 = new THREE.Mesh( geometry, material2 );

                                    cube2.position.y = object.position.y
                                    cube2.position.x = object.position.x
                                    cube2.position.z = object.position.z

                                    objects.push( cube2 );
                                    scene.add( cube2 );
                                    scene.add( object );

                                    vaisseau.uuid = cube2.uuid;
                                    vaisseau.object = object;
                                    vaisseau.cube = cube2;
                                    
                                });

                        });
                    
                    break;

                    case 5:

                            const objLoader = new THREE.OBJLoader();

                            objLoader.setPath('/assets/building_obj/');
                            objLoader.load('Observatory.obj', function (object) {
                    
                                object.position.x -= 150 + i*100;
                                object.position.z -= 500 + j*50;
                                object.position.y = 250;
                                
                                
                                object.scale.set(0.4, 0.4, 0.4);

                                var geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
                                var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                                var cube3 = new THREE.Mesh( geometry, material2 );

                                const textureLoader = new THREE.TextureLoader();
                                const map = textureLoader.load('/assets/building_obj/Observatory.jpg');
                                const material = new THREE.MeshPhongMaterial({map: map});
                                
                                object.traverse( function ( child ) {
                                    if ( child instanceof THREE.Mesh ) {
                                        child.material = material
                                    }
                                });

                                cube3.position.y = object.position.y;
                                cube3.position.x = object.position.x;
                                cube3.position.z = object.position.z;

                                objects.push( cube3 );
                                scene.add( cube3 );

                                scene.add( object );

                            });
                
                    break;

                    case 6: 
                            
                    
                    var loader = new THREE.GLTFLoader();
                    loader.load( '/assets/models/gltf/Soldier/Soldier.glb', function ( gltf ) {

                        model = gltf.scene;
                        scene.add( model );
                        
                        model.scale.set(100,100,100);
                        model.position.x = vaisseau.object.position.x - 300;
                        model.position.z  = vaisseau.object.position.z;
                        model.position.y  -= 110;
                        model.rotation.y += 3.14159;
                        brandonGLTF = gltf;


                        var geometry = new THREE.BoxGeometry( 50, 700, 50 );
                        var material5 = new THREE.MeshBasicMaterial( {color: 0x7CFC00, transparent:true, opacity: 0.2} );
                        var cube5 = new THREE.Mesh( geometry, material5 );

                        cube5.position.y = model.position.y;
                        cube5.position.x = model.position.x - 120;
                        cube5.position.z = model.position.z;
                        

                        scene.add(cube5);
                        objects.push(cube5);
                        
                        scenario.discutionBlockUiid = cube5.uuid; 
                        scenario.discutionBlockObject = cube5; 
                        
                        var animations = gltf.animations;

                        animatePNJBrandon(model, animations);
                        setBrandonLimit();

                    } );

                    


                    break;

                    

                    case 7:

                        const objLoad = new THREE.OBJLoader();

                        objLoad.setPath('/assets/obj_and_mtl/');
                        objLoad.load('rock.obj', function (object) {

                            object.position.x -= 150 + i*100;
                            object.position.z -= 500 + j*50;
                            object.position.y -= 160;


                            object.scale.set(3.4, 4.8, 2);

                            var geometry = new THREE.BoxGeometry( 1250, 1250, 1250 );
                            var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                            var cube4 = new THREE.Mesh( geometry, material2 );

                            const textureLoader = new THREE.TextureLoader();
                            const map = textureLoader.load('/assets/moon-floor/martian.png');
                            const material = new THREE.MeshPhongMaterial({map: map});

                            object.traverse( function ( child ) {
                                if ( child instanceof THREE.Mesh ) {
                                    child.material = material
                                }
                            });

                            cube4.position.y = object.position.y + 500;
                            cube4.position.x = object.position.x - 200;
                            cube4.position.z = object.position.z;
                            objects.push( cube4 );
                            scene.add( cube4 );

                            scene.add( object );

                        });

                    break;

                    case 8:

                        for (let index = 0; index <= 1; index++) {
                            
                            let objLoad2 = new THREE.OBJLoader();

                            objLoad2.setPath('/assets/building_obj/');
                            objLoad2.load('cubsat.obj', function (object) {

                                object.position.y -= 70;

                                if(index == 1){

                                    object.position.z -= 1200;
                                    object.position.x += 900;

                                }
                                
                                object.scale.set(50, 15, 50);

                                var geometry = new THREE.BoxGeometry( 300, 300, 300 );
                                var material5 = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                                var cube5 = new THREE.Mesh( geometry, material5 );


                                cube5.position.y = object.position.y;
                                cube5.position.x = object.position.x;
                                cube5.position.z = object.position.z;

                                const textureLoader = new THREE.TextureLoader();
                                const map = textureLoader.load('/assets/building_obj/mt-blue.jpg');
                                const material = new THREE.MeshPhongMaterial({map: map});
                                
                                object.traverse( function ( child ) {
                                    if ( child instanceof THREE.Mesh ) {
                                        child.material = material
                                    }
                                });

                                objects.push( cube5 );
                                scene.add( cube5 );
                                
                                scene.add( object );

                                index == 1 ? box.potionBoxUiid = cube5.uuid : box.blockBoxUiid = cube5.uuid
                                index == 1 ? box.potionBoxObject = object : box.blockBoxObject = object
                                index == 1 ? box.potionBoxBlocker = cube5 : box.blockBoxBlocker = cube5

                            });
                            

                        }

                        const bottleTextureLoader = new THREE.MTLLoader();

                        bottleTextureLoader.setTexturePath('/assets/building_obj/');
                        bottleTextureLoader.setPath('/assets/building_obj/');
                        bottleTextureLoader.load('bottle.mtl', function (materials) {

                                materials.preload();

                                const objLoader = new THREE.OBJLoader();

                                objLoader.setMaterials(materials);
                                objLoader.setPath('/assets/building_obj/');
                                objLoader.load('bottle.obj', function (object) {
                        
                                    object.position.z -= 1200;
                                    object.position.x += 900;
                                    object.position.y -= 120;
                                    
                                    object.scale.set(25, 35, 25);

                                    var geometry = new THREE.BoxGeometry( 50, 300, 50 );
                                    var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                                    var cube = new THREE.Mesh( geometry, material2 );

                                    cube.position.y = object.position.y
                                    cube.position.x = object.position.x
                                    cube.position.z = object.position.z

                                    const textureLoader = new THREE.TextureLoader();
                                    const map = textureLoader.load('/assets/building_obj/green-water-texture.jpg');
                                    const material = new THREE.MeshPhongMaterial({map: map});
                                    
                                    object.traverse( function ( child ) {
                                        if ( child instanceof THREE.Mesh ) {
                                            child.material = material
                                        }
                                    });
    

                                    objects.push( cube );
                                    scene.add( cube );
                                    scene.add( object );


                                    bottle.uuid = cube.uuid;
                                    bottle.object = object;
                                    bottle.cube = cube;
                                    
            

                                });

                        });


                    break;
                    
                    
                        
                default:
                    break;
            }


        }


    }

    controls.getObject().position.x = - 1050 + 200;
    controls.getObject().position.z = 950;

}

function setLimit(){

    for (let i = 0; i <= 3; i++){

        var geometry = new THREE.PlaneGeometry( 3000, 1000);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, transparent:true, opacity: 0} );
        var plane = new THREE.Mesh( geometry, material );
        
        switch (i) {

            case 0:
                plane.position.set(0,0,-1500);
            break;

            case 1:
                plane.position.set(0,0,1500);
            break;

            case 2:
                plane.position.set(1500,0,0);
                plane.rotation.y = 90 * Math.PI / 180;
            break;

            case 3:
                plane.position.set(-1500,0,0);
                plane.rotation.y =  90 * Math.PI / 180;
            break;

            default:
                break;
        }
    
        objects.push( plane );
        scene.add( plane );

    }

}

function setBrandonLimit(){

    for (let i = 0; i <= 1; i++){

        var geometry = new THREE.PlaneGeometry( 3000, 1000);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, transparent:true, opacity: 0} );
        var plane = new THREE.Mesh( geometry, material );
        
        switch (i) {

            case 0:
                plane.position.set(0,0, vaisseau.object.position.z - 500);
                scenario.blocker1 = plane;
            break;

            case 1:
                plane.position.set(0, 0, vaisseau.object.position.z + 500);
                scenario.blocker2 = plane;

            break;

        }
    
        objects.push( plane );
        scene.add( plane );

    }

}

// Set floor texture
function solMartien(positionX, positionY,  positionZ) {


    // lights
    scene.add(new THREE.AmbientLight(0x736F6E));

    var directionalLight=new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position=camera.position;
    scene.add(directionalLight);

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('/assets/obj_and_mtl/');
    mtlLoader.setPath('/assets/moon-floor/');
    mtlLoader.load('mountains.mtl', function (materials) {

        materials.preload();
        var textureLoader = new THREE.TextureLoader();
        var map = textureLoader.load('/assets/moon-floor/martian.png');
        var material = new THREE.MeshPhongMaterial({map: map});

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('/assets/moon-floor/');
        objLoader.load('mountains.obj', function (object) {

            object.traverse( function ( node ) {

                if ( node.isMesh ) node.material = material;

            } );

            object.position.set(-1420, -30, -1420);
            object.scale.set(16, 10, 9.5);


            let floor = []; 

            for(let j = 0; j <= 17; j++){

                floor[j] = [];

                for (let i = 0; i <= 17; i++){
                
                    floor[j][i] = object.clone();
                    
                    floor[j][i].position.set( i*160 -1420, -120, j*160 -1420);
                    scene.add(floor[j][i]);
    
                }

            }

        });

    });
    
}