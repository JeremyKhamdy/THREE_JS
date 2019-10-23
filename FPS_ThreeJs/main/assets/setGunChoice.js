function setGunChoice(){
    
    // Set limit

    // Set test indicator
    const textLoader = new THREE.FontLoader();
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });

    textLoader.load( '/assets/fonts/A-Space.json', function ( font ) {

        const textFont = new THREE.TextGeometry( 'CHOOSE YOUR GUN', {
            font: font,
            size: 12,

        } );
        
        text = new THREE.Mesh( textFont, textMaterial );
        text.position.z -= 120;
        text.position.x -= 100;
        text.position.y += 40;

        text.scale.set(1, 1, 0.02)

        textArray.push(text);
        scene.add(text);

    });

    // Gun setting
    const gunArray = ["laser_gun", "mwpnfltgn", "XCom_laserRifle_obj", "XCom_rifle_obj"];
    const TextureLoader = new THREE.MTLLoader();

    // Load 3d gun object
    TextureLoader.setTexturePath('/assets/gun_obj/');
    TextureLoader.setPath('/assets/gun_obj/');
    TextureLoader.load('mwpnfltgn.mtl', function (materials) {

        materials.preload();

        for (let i = 0; i < gunArray.length; i++) {

            const objLoader = new THREE.OBJLoader();

            objLoader.setMaterials(materials);
            objLoader.setPath('/assets/gun_obj/');
            objLoader.load(gunArray[i] + '.obj', function (object) {
    
                // object.scale.set(2.05, 2.05, 2.05);
                object.position.x -= -75 + i*50;
                object.position.z -= 100;
                object.position.y += 10;
                gunArray[i] = object.position.x;

                var geometry = new THREE.BoxGeometry( 20, 20, 20 );
                var material = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent:true, opacity: 0} );
                var cube = new THREE.Mesh( geometry, material );

                switch (i) {
                    case 0:
                    

                        const textureLoader = new THREE.TextureLoader();
                        const map = textureLoader.load('/assets/gun_obj/laser_gun_diffuse.png');
                        const material = new THREE.MeshPhongMaterial({map: map});
                        
                        object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material = material
                            }
                        });
                        
                        object.scale.set(0.07, 0.07, 0.07);

                        break;
                    
                    case 1:
                        
                        object.scale.set(0.5, 0.5, 0.5);
                        object.rotation.y = 90 * Math.PI / 180;

                        break;

                    case 2:

                        object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.color.setHex(0xDAA520);
                            }
                        });


                        object.scale.set(0.07, 0.07, 0.07);
                        object.rotation.y = 90 * Math.PI / 180;
                        break;
                    
                    case 3:
                        
                        object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.color.setHex(0xDAA520);
                            }
                        });


                        object.scale.set(0.07, 0.07, 0.07);
                        break;


                    default:
                        break;
                }

                cube.position.y = object.position.y
                cube.position.x = object.position.x
                cube.position.z = object.position.z

                objects.push( cube );
                scene.add( cube );
                
                guns.push( object );
                scene.add( object );
    
            });
        }

    });

}

// Unset gun choice
function unsetGunChoice(){

    for (let i = 0; i < guns.length; i++) {


        
        if(guns[i]){

            scene.remove(guns[i]);
            
        }

        if(objects[i]){

            scene.remove(objects[i]);

        }

        if(textArray[i]){

            scene.remove(textArray[i]);

        }

        objects = [];
        
    }

}
