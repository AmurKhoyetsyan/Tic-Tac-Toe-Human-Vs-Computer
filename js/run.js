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

    twoPlayer.addEventListener('click', function(){
        homeGame.style['display'] = 'none';
        runGame.style['display'] = 'block';
        ArmTicTacToe.init(true);
    });

    withComputer.addEventListener('click', function(){
        homeGame.style['display'] = 'none';
        runGame.style['display'] = 'block';
        ArmTicTacToe.init(false);
    });

    back.addEventListener('click', function(){
        homeGame.style['display'] = 'block';
        runGame.style['display'] = 'none';
        ArmTicTacToe.empty();
    });
})(document);