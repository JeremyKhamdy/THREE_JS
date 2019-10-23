var camera, scene, renderer, controls, clock;
var model, mixer, actions, activeAction ;
var robot, mixer2, actions2, activeAction2 ;
var objects = [];
var guns = [];
var granades = [];
var textArray = [];
var bullets = [];
var raycaster;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();
var weaponChoice = "gun";
var modelGTLF = null;
var brandonGLTF = null;
var end = false;

const compteur = document.getElementById('compteur');


var rays = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1, 0, -1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(-1, 0, -1),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-1, 0, 1)
];

var counter = 0;
var stopped = false;

var selectorContainer = document.getElementById( 'selector-container' );
var counterContainer = document.getElementById( 'counter-container' );

var stuff = {
    gun: '',
    granades: 3,
    bullet: 150,
    life: 80,
    speed: 100,
    experience: 0
};

var game = {

    started: false

};

var pnjDirection = {

    direction: 10
    
};


var vaisseau = {

    fly: false,
    autorisation: false,
    uuid: null,
    object: null,
    cube: null,
    a: 0,

};

var box = {

    potionBoxUiid: null,
    potionBoxObject: null,
    potionBoxBlocker: null,
    potionBoxMoove: false,
    blockBoxUiid: null,
    blockBoxObject: null,
    blockBoxBlocker: null,
    blockBoxMoove: false,
    moovement: 0
};

var bottle = {

    uuid: null,
    object: null,
    cube: null,
    blocker: 0

};

var scenario = {

    intro: true,
    niveau: 0,
    time:null,
    discutionBlockUiid: null,
    discutionBlockObject: null,
    blocker1: null,
    blocker2: null,
    new: false

}

var animationFrame = {

    i: 1,

};

var bot = {
    life: 30
}

// Init environnement
function init() {

    //reload

    $('.reload').on('click', function() {
        location.reload();
    });


    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1500 );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000);

    // Blockeur settings//
    controls = new THREE.PointerLockControls( camera );

    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        controls.lock();

    }, false );

    controls.addEventListener( 'lock', function () {
        instructions.style.display = 'none';

        blocker.style.display = 'none';
        counterContainer.innerHTML = "";

    } );


    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );



    counterContainer.addEventListener( 'click', function () {
        
        controls.lock();

    }, false );


    scene.add( controls.getObject() );


    var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );

    var onKeyDown = function ( event ) {
        switch ( event.keyCode ) {
            case 38: // up
            case 90: // w
                moveForward = true;
                break;
            case 37: // left
            case 81: // a
                moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                break;
            case 32: // space
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;
        }
    };
    
    var onKeyUp = function ( event ) {
        switch ( event.keyCode ) {
            case 38: // up
            case 90: // w
                moveForward = false;
                break;
            case 37: // left
            case 81: // a
                moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    document.body.appendChild( renderer.domElement );
    
    //
    window.addEventListener( 'resize', onWindowResize, false );


    setGunChoice();
    
    //#Decommente ça si tu es un homme
     solMartien();

}

// Resize canvas and camera
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
}

function animatePNJ( model, animations, animationName ) {

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

    activeAction = actions[animationName];
    
    activeAction.play();
    
}

function animatePNJBrandon( model, animations, number = 3) {

    mixer = new THREE.AnimationMixer( model );
    actions = {};

    activeAction = mixer.clipAction( animations[ number ] );
    
    activeAction.play();
    
}

function moovePotionBlock(){

    if( box.potionBoxMoove === true  && scenario.intro == false){

        box.moovement += 1;

        if( box.moovement <= 20){

            
            for (let index = 0; index < 10; index++) {
                
                box.potionBoxObject.position.sub(
                    new THREE.Vector3(
                        Math.sin(controls.getObject().rotation.y),
                        0,
                        Math.cos(controls.getObject().rotation.y),
                    )
                )

                box.potionBoxBlocker.position.sub(
                    new THREE.Vector3(
                        Math.sin(controls.getObject().rotation.y),
                        0,
                        Math.cos(controls.getObject().rotation.y),
                    )
                )
                
            }

            
            scene.remove(box.potionBoxObject);
            scene.add(box.potionBoxObject);

        }
        else{

            box.potionBoxMoove = false;
            box.moovement = false;

        }

    }


}

function mooveSimpleBlocker(){

    if( box.blockBoxMoove === true && scenario.intro == false){
        
        box.moovement += 1;

        if( box.moovement <= 20){

            
            for (let index = 0; index < 10; index++) {
                
                box.blockBoxObject.position.sub(
                    new THREE.Vector3(
                        Math.sin(controls.getObject().rotation.y),
                        0,
                        Math.cos(controls.getObject().rotation.y),
                    )
                )

                box.blockBoxBlocker.position.sub(
                    new THREE.Vector3(
                        Math.sin(controls.getObject().rotation.y),
                        0,
                        Math.cos(controls.getObject().rotation.y),
                    )
                )
                
            }

            
            scene.remove(box.blockBoxObject);
            scene.add(box.blockBoxObject);

        }
        else{

            box.blockBoxMoove = false;
            box.moovement = false;

        }

    }

}




function vaisseauMoovement(){

    if( vaisseau.fly && vaisseau.autorisation == true ){

        if( vaisseau.object.position.y >= 50 ) {

            vaisseau.a += 10;
            vaisseau.object.position.y += 10;
            vaisseau.object.position.z += 159 + vaisseau.a;

        }
        else{

            vaisseau.object.position.y += 7;

        }


        if(vaisseau.object.position.z >= 1500){

            $('.robot-killed').hide();
            $('#game-board').hide();
            $('.success').hide();

            scene.remove(vaisseau.object);
            scene.remove(vaisseau.cube);


            $('canvas').hide(2500, function() {
                $('#blocker').hide();
                $('#selector-container').hide();
                $('.end').show(2500, function() {
                    $(this).hide(2500, function() {

                        $('.game').show(2500);
                    })
                })
            });

        }

    }


}

function botMoovement() {
    
    if( model ){

        model.position.z += pnjDirection.direction;
        
        for (let j = 0; j < bullets.length; j++) {

            if( bullets[j] === undefined ){ continue; }
    
            if( bullets[j].alive === false ){
    
                bullets[j].splice(j, 1);
    
            }
            
            for (let index = 0; index < 50; index++) {

                bullets[j].position = bullets[j].position.sub(bullets[j].velocity);  

            }

            modelBB = new THREE.Box3().setFromObject(model);
            currentBulletBB = new THREE.Box3().setFromObject(bullets[j]);

            var bulletCollision = modelBB.intersectsBox(currentBulletBB);

            if(bulletCollision && modelGTLF != null){
                
                var audio = new Audio('/assets/music/bullet_impact.mp3');
                audio.play();

                bot.life -= 10

                if( bot.life <= 0 ){

                    animatePNJ( model, modelGTLF.animations, 'Death' );
                    compteur.innerHTML = scenario.niveau + '/10';

                    setTimeout(function(){


                        if(scenario.niveau >= 10) {

                            vaisseau.autorisation = true;
                            end = true;
                            scene.remove(model);

                            $('.success').show(5000);


                        }
                        else{

                            scenario.new = true;
    
                            bot.life = 30 + scenario.niveau * 10;
                            scene.remove(model);

                        }

    
                    }, 800);

                }
                else {

                    animatePNJ( model, modelGTLF.animations, 'Death' );
                    
                    setTimeout(function(){

                        animatePNJ( model, modelGTLF.animations, 'Walking' );


                    }, 100);
                    
                }

            }

        }

        for (let i = 0; i < objects.length; i++) {

            const object = objects[i];
            firstBB = new THREE.Box3().setFromObject(model);
            secondBB = new THREE.Box3().setFromObject(object);
        
            var collision = firstBB.intersectsBox(secondBB);

            if(collision){

                pnjDirection.direction > 0 ? pnjDirection.direction = -10 : pnjDirection.direction = +10;
                model.rotation.y += 3.14159;
                
            }
        }



    }

}

function gunPosition(){


    if( stuff.gun ){

        stuff.gun.position.y = controls.getObject().position.y;
        stuff.gun.position.x = controls.getObject().position.x + 0.3;
        stuff.gun.position.z = controls.getObject().position.z;

        stuff.gun.rotation.set(

            controls.getObject().rotation.x,
            controls.getObject().rotation.y,
            controls.getObject().rotation.z

        )
        
        scene.add(stuff.gun);

    }

}


function rayCastingCollision(){

       //Set raycaster position to controls position ray casting detection;
       raycaster.ray.origin.copy( controls.getObject().position );
       raycaster.ray.origin.y -= 10;
       raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(), 0, 10);
   
       var dt = clock.getDelta();
       if ( mixer ) mixer.update( dt );
            
        
       for (let i = 0; i < rays.length; i++){
   
            raycaster.set(controls.getObject().position , rays[i]);
   
            var intersections = raycaster.intersectObjects( objects );
            var onObject = intersections.length > 0;
            var time = performance.now();
            var delta = ( time - prevTime ) / 1000;
   
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            velocity.y -= 8.8 * 60.0 * delta; // 100.0 = mass
   
            direction.z = Number( moveForward ) - Number( moveBackward );
            direction.x = Number( moveLeft ) - Number( moveRight );
            direction.normalize(); // this ensures consistent movements in all directions
   
   
            if ( moveForward || moveBackward ) velocity.z -= direction.z * (1500.0 + stuff.speed) * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x *( 1500.0 + stuff.speed) * delta;
            
            controls.getObject().translateX( velocity.x * delta );
            controls.getObject().translateY( velocity.y * delta );
            controls.getObject().translateZ( velocity.z * delta );
            
            if(onObject){
   
                if ((i === 0 || i === 1 || i === 7) && direction.z === 1) {
   
                    direction.z = 0;
                    controls.getObject().position.z -= 15;
                    
                    if(game.started === false ){
                      
                       getObjcetIntersect(intersections, objects, selectorContainer, counterContainer, weaponChoice);
                    
                   }
                    
   
                } 
                else if ((i === 3 || i === 4 || i === 5) && direction.z === -1) {
   
                    direction.z = 0;
                    controls.getObject().position.z += 15;
                    
                   if(game.started === false ){
                       getObjcetIntersect(intersections, objects, selectorContainer, counterContainer, weaponChoice);
                    
                   }
   
                }
                if ((i === 1 || i === 2 || i === 3) && direction.x === 1) {
                    
                    direction.x = 0;
                    controls.getObject().position.x -= 15;
                    
                    if(game.started === false ){
                      
                       getObjcetIntersect(intersections, objects, selectorContainer, counterContainer, weaponChoice);
                    
                   }
                    
                } 
                else if ((i === 5 || i === 6 || i === 7) && direction.x === -1) {
   
                    direction.x = 0;
                    controls.getObject().position.x += 15;
                    if(game.started === false ){
                    
                       getObjcetIntersect(intersections, objects, selectorContainer, counterContainer, weaponChoice);
                       
                    }
   
   
                }
   
               if( vaisseau.uuid === intersections[0].object.uuid ){
   
                   vaisseau.fly = true;

                   
               }

                if( bottle.uuid === intersections[0].object.uuid ){
                    
                    if(bottle.blocker <= 1){

                        var lifeContainer = document.querySelector('.life');
                        scene.remove(bottle.object);
                        scene.remove(bottle.cube);
                        stuff.life += 20;
                        stuff.bullet += 10;
                        stuff.speed += 100;
                        lifeContainer.innerHTML = stuff.life;
                        bottle.blocker += 1;

                    }
                    
                }

   
   
               if(  box.potionBoxUiid === intersections[0].object.uuid ) {
   
                   box.potionBoxMoove = true
   
               }
   
   
               if(  box.blockBoxUiid === intersections[0].object.uuid ) {
   
                   box.blockBoxMoove = true
   
               }

               if(  box.blockBoxUiid === intersections[0].object.uuid ) {
   
                box.blockBoxMoove = true

                }
                
                if( scenario.discutionBlockUiid === intersections[0].object.uuid ) {
    
                    switch (true) {

                        case scenario.intro == true:

                            let text_content = $('#text-content');

                                animatePNJBrandon( brandonGLTF.scene , brandonGLTF.animations, 0);
                                pnjDirection.direction = 0;

                                text_content.show();
                                setTimeout(function(){


                                    scene.remove(brandonGLTF.scene);
                                    scene.remove(scenario.blocker1);
                                    scene.remove(scenario.blocker2);
                                    scene.remove(scenario.discutionBlockObject);
                                    
                                    scenario.intro = false;
                                    scenario.new = true;
                                    pnjDirection.direction = 10;
                                    text_content.hide();
                                    $('.robot-killed').show();
                                    compteur.innerHTML = '0/10';
                                }, 7500);


                            break;
                    
                        default:
                            break;

                    }

                }

   
            }
   
   
   
            if ( controls.getObject().position.y < 10 ) {
   
                velocity.y = 0;
                controls.getObject().position.y = 10;
                canJump = true;
                
            }
   
   
            prevTime = time;
   
       }


}

function setLife(){

    setInterval(function(){

        stuff.life -= 0.5;
        var currentLifeContainer = document.querySelector('#currentLife');

        currentLifeContainer.innerHTML = stuff.life;

    }, 1000);

    if(stuff.life <= 0) {
        $('.game-over').show();
    }
}



function animate() {

    requestAnimationFrame( animate );

    animationFrame.i += 1;

    moovePotionBlock();
    mooveSimpleBlocker();
    vaisseauMoovement();
    gunPosition();
    rayCastingCollision();
    botMoovement();

    
    if(scenario.new === true && animationFrame.i % 40 == 0) {

        scenario.new = false;
        scenario.niveau += 1;
        console.log(scenario.niveau -1);
        if(end === true) {
            $('.success').show(7500, function() {
                $(this).hide();
            });
        }
        setLevel();

    }



    renderer.render( scene, camera );


}