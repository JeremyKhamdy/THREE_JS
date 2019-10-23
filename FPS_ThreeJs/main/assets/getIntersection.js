// Set choose gun
function getObjcetIntersect(intersections, objects, selectorContainer, counterContainer, weaponChoice){

    var played = true;
    stopped = false;
    weaponChoice = 'gun';
    counterContainer.innerHTML = "0";

    
    for (let i = 0; i < objects.length; i++) {

        const analyseObject = objects[i];
        const currentUuid = intersections[0].object.uuid;
        
        
        if( analyseObject.uuid === currentUuid && played == true ){

            selectorContainer.style.display = 'block';
            counterContainer.style.display = '';
            controls.unlock();


            setInterval(function(){
                
                if(counterContainer.innerHTML == '') {
                    
                    counter = 0;
                    stopped = true;

                }

                if(stopped === false){

                    counter += 1;
                    counterContainer.innerHTML = counter;
                    
                    if( counter >= 1 ){

                        
                        if( weaponChoice === 'gun' ) {

                            weaponChoice = 'grenade';

                            stuff.gun = guns[i];
                            played = false;

                            selectorContainer.style.display = 'none';
                            counterContainer.style.display = 'none';
                            controls.lock();

                            guns[i].position.y += 50;
                            objects[i].position.y += 50;

                            game.started = true;

                            unsetGunChoice();
                            generateMap();
                            shoot();
                            setLife();
                            
                            controls.getObject().position.x = discutionBlockObject.position.x - 200;
                            controls.getObject().position.z = discutionBlockObject.position.z;

                        }
                        
                    }

                }

            }, 1000);

        }

    }

}