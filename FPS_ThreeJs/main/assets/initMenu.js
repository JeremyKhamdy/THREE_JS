// BoardMenu


(function() {
    var SELECTOR_REPLAY_INTRO_BUTTONS = '#button-replay';
    var SELECTOR_BUTTON_NEWGAME = '.button-play';
    var SELECTOR_BUTTON_HOW_TO_PLAY = '.button-command';
    var SELECTOR_BUTTON_GAME_MENU = '.button-game-menu';
    var menu = $('.game');

    var timelineIntroScreen;

    function buildTimelines() {
        timelineIntroScreen = new TimelineMax({
            paused: false
        });

        timelineIntroScreen.staggerFrom('.screen-intro .button', 2, {
            css: {
                scale: 0
            },
            autoAlpha: 0,
            ease: Elastic.easeOut
        }, .1);
    }

    function playIntroButtons() {
        timelineIntroScreen.restart();
    }

    function reverseIntroButtons() {

        timelineIntroScreen.reverse();

    }

    function fadeToScreen(targetScreenClassName) {
        var _nameScreen;

        if (!targetScreenClassName) {
            _nameScreen = 'screen-intro';
        }

        _nameScreen = targetScreenClassName;

        var $elementTarget = $('.' + _nameScreen);
        var $elementActiveScreen = $('.active-screen');

        return TweenMax.to($elementActiveScreen, .4, {
            autoAlpha: 0,
            y: '+=10',
            onComplete: function() {

                $elementActiveScreen.removeClass('active-screen');

                TweenMax
                    .to($elementTarget, .4, {
                        y: '-=10',
                        autoAlpha: 1,
                        className: '+=active-screen'
                    });
            }
        });

    }

    // Initialize
    $(document).ready(buildTimelines);

    var audio = new Audio('assets/music/graveyard-shift-by-kevin-macleod.mp3');
    audio.play();

    $('.game-over').hide();
    $('.end').hide();
    $('.success').hide();
    $('.robot-killed').hide();
    $('#text-content').hide();
    $('#blocker').hide();
    $('#selector-container').hide();
    $('#command').hide();
    $('#menu-container').hide();
    $('#game-board').hide();
    $('.viseur').hide();

    // Bindings
    $(document).on('click', SELECTOR_REPLAY_INTRO_BUTTONS, function(event) {
        event.preventDefault();

        if (!$('.screen-intro').hasClass('active-screen')) {
            return;
        }

        playIntroButtons();
    });

    menu.on('click', SELECTOR_BUTTON_NEWGAME, function(event) {
        event.preventDefault();
      //  reverseIntroButtons();
        $('.game').hide(400, function() {

            $('.game').css('width', 0);
            $('#title').hide();
            $('.viseur').show();
            $('#blocker').show();
            $('#selector-container').show();
            $('#game-board').show();
            $('.life').append('<p class="life" id="currentLife" style="color:#001229; font-size: 25px; position: absolute; margin: 0;">' + stuff['life'] + '</p>');
            document.getElementById('pbullet').innerHTML = stuff.bullet;
            $('.grenade').append('<p class="grenade">' + stuff['granades'] + '</p>');

            init();
            animate();
            audio.pause();

        });



        timelineIntroScreen.eventCallback('onReverseComplete', function() {
           // fadeToScreen('screen-game');

        });
    });

    menu.on('click', SELECTOR_BUTTON_HOW_TO_PLAY, function(event) {
        event.preventDefault();

        $('#main').hide(400, function() {

            $('#block-menu').css('display', 'flex');
            $('#title').hide();
            $('#command').show();


        });
    });

    menu.on('click', SELECTOR_BUTTON_GAME_MENU, function(event) {
        event.preventDefault();

        $('#command').hide(400, function() {

            $('#main').show();
            $('#title').show();

        });
    });

})();