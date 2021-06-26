/**
 * Copyright (c) Amur 2020
 *
 * Tic Tac Toe JS file of Run Game
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

;(function(run){
    let twoPlayer = run.querySelector('.two-players');
    let withComputer = run.querySelector('.with-computer');
    let homeGame = run.querySelector('.home-game');
    let runGame = run.querySelector('.run-game');
    let back = run.querySelector('.back');
    let sound = run.querySelector('.sound');

    twoPlayer.addEventListener('click', function(){
        if(window.SoundGame) {
            Assets.files.audios.headling.play();
        }
        homeGame.style['display'] = 'none';
        runGame.style['display'] = 'block';
        if(!back.classList.contains('show')) {
            back.classList.add('show');
        }
        if(!sound.classList.contains('show')) {
            sound.classList.add('show');
        }
        ArmTicTacToe.init(true);
    });

    withComputer.addEventListener('click', function(){
        if(window.SoundGame) {
            Assets.files.audios.headling.play();
        }
        homeGame.style['display'] = 'none';
        runGame.style['display'] = 'block';
        if(!back.classList.contains('show')) {
            back.classList.add('show');
        }
        if(!sound.classList.contains('show')) {
            sound.classList.add('show');
        }
        ArmTicTacToe.init(false);
    });

    back.addEventListener('click', function(){
        if(window.SoundGame) {
            Assets.files.audios.headling.play();
        }
        homeGame.style['display'] = 'block';
        runGame.style['display'] = 'none';
        if(back.classList.contains('show')) {
            back.classList.remove('show');
        }
        if(sound.classList.contains('show')) {
            sound.classList.remove('show');
        }
        ArmTicTacToe.empty();
    });
})(document);