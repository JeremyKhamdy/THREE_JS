function shoot(){

    const bulletContainer = document.getElementById('pbullet');
    document.addEventListener('click', function(){
         
        if( stuff.bullet > 0) {

            stuff.bullet -= 1;
            bulletContainer.innerHTML = stuff.bullet;
            createBullet();

        }

    });

}

function createBullet(){

    var bulletGeo = new THREE.SphereGeometry( 0.05, 15, 15 );
    var color = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var bullet = new THREE.Mesh( bulletGeo, color );
    
    bullet.position.set(
        stuff.gun.position.x,
        stuff.gun.position.y,
        stuff.gun.position.z
    );

    bullet.velocity = new THREE.Vector3(
        Math.sin(controls.getObject().rotation.y),
        0,
        Math.cos(controls.getObject().rotation.y),
    );
    

    bullet.alive = true;

    setTimeout(function(){
        
        bullet.alive = true;
        scene.remove( bullet );

    },5000);

    bullets.push(bullet);
    scene.add( bullet );

}