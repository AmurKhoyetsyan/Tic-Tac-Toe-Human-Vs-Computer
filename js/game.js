/**
 * Copyright (c) Amur 2020
 *
 * Tic Tac Toe JS file of Game
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

;(function(game){
    let parent = game.querySelector('.game-xo');
    let colRow = 3;
    let xo = true;
    let startGame = true;
    let restart = game.querySelector('.restart');
    let x_count = game.querySelector('.x-count');
    let y_count = game.querySelector('.y-count');
    let win = game.querySelector('.win-gammer');
    let player = game.querySelector('.player');
    let typeGame = true;
    let selectedItem = true;
    let answers = [];

    function getAnswer(arr){
        let len = arr.length;
        for(let i = 0; i < len; i++){
            if(!arr[i]){
                return false;
            }
        }
        return true;
    };

    function eachForAnswer(item, start, end, pluse){
        let answer = [];
        for(let i = start; i <= end; i += pluse){
            if(parseInt(item[i].getAttribute('selected')) !== 1){
                return {
                    type: false
                };
            }else{
                let type = parseInt(item[start].getAttribute('type'));
                if(parseInt(item[i].getAttribute('type')) !== type){
                    return {
                        type: false
                    };
                }else{
                    answer.push((parseInt(item[i].getAttribute('type')) === type));
                    if(answer.length === colRow){
                        if(getAnswer(answer)){
                            return{
                                type: true,
                                typeX: type
                            }
                        }else{
                            return {
                                type: false
                            };
                        }
                    }
                }
            }
        }
        return {
            type: false
        };
    };

    function NoSpirit(item){
        let len = item.length;
        for(let i = 0; i < len; i++){
            if(parseInt(item[i].getAttribute('selected')) === 0){
                return false;
            }
        }

        return true;
    }

    function getTypes(index, item){
        let type = {
            type: true
        };

        let col = index % colRow;
        let row = (index - col) / colRow;
        let startRow = row * colRow;
        let endRow = startRow + colRow - 1;
        let endCol = (colRow * (colRow - 1)) + col;
        
        type = eachForAnswer(item, startRow, endRow, 1);

        if(!type.type){
            type = eachForAnswer(item, col, endCol, colRow);
        }

        if(!type.type){
            type = eachForAnswer(item, 0, ((colRow * colRow) - 1), (colRow + 1));
        }

        if(!type.type){
            type = eachForAnswer(item, (colRow - 1), (colRow * (colRow - 1)), (colRow - 1));
        }

        return type;
    };

    function equaltipes(index){
        let item = game.querySelectorAll('.item-xo');
        let type = getTypes(index, item);

        if(type.type){
            startGame = !type.type;
            win.innerText = `Won ${(type.typeX === 1)?('X'):('O')} Player`;
            if(type.typeX === 1){
                let x_counter = parseInt(x_count.innerText);
                x_count.innerText = ++x_counter;
            }else{
                let y_counter = parseInt(y_count.innerText);
                y_count.innerText = ++y_counter;
            }
        }else{
            if(NoSpirit(item)){
                startGame = !type.type;
                win.innerText = 'No spirit';
            }else if(!selectedItem){
                computerTime();
            }
        }

        (xo)?(player.innerText = 'X'):(player.innerText = 'O');
    };

    function selectCub(el){
        if(startGame){
            let elem = el.target;
            let index = parseInt(elem.getAttribute('index'));
            if(parseInt(elem.getAttribute('selected')) === 0){
                withCoputerOrTwoPlyers(index, elem);
            }
        }
    };

    function changeItem(index, elem){
        elem.setAttribute('selected', '1');
        let span = game.createElement('span');
        if(xo){
            span.innerText = 'X';
            xo = false;
            elem.setAttribute('type', '1');
        }else{
            span.innerText = 'O';
            xo = true;
            elem.setAttribute('type', '0');
        }
        elem.appendChild(span);
        equaltipes(index);
    }

    function withCoputerOrTwoPlyers(index, elem, comp = false){
        if(typeGame){
            changeItem(index, elem);
        }else{
            if(selectedItem){
                selectedItem = false;
                changeItem(index, elem);
            }

            if(comp){
                selectedItem = true;
                changeItem(index, elem);
            }
        }
    };

    function getAnswersWin(){
        let item = game.querySelectorAll('.item-xo');
        answers = [];

        for(let index = 0; index < colRow; index++){
            let col = index % colRow;
            let row = (index - col) / colRow;
            let startRow = row * colRow;
            let endCol = (colRow * (colRow - 1)) + col;
            answers.push(aPossibleOptionWin(item, index * colRow, ((index + 1) * colRow ) - 1, 1));
            answers.push(aPossibleOptionWin(item, col, endCol, colRow));
            if(index === 0){
                answers.push(aPossibleOptionWin(item, 0, ((colRow * colRow) - 1), (colRow + 1)));
                answers.push(aPossibleOptionWin(item, (colRow - 1), (colRow * (colRow - 1)), (colRow - 1)));
            }
        }
    };

    function aPossibleOptionWin(item, start, end, pluse){
        let answer = [];
        for(let i = start; i <= end; i += pluse){
            let index = parseInt(item[i].getAttribute('index'));
            if(!answer.includes(index)){
                answer.push(index);
            }  
        }
        return answer;
    };

    function createRow(){
        win.innerText = '';
        parent.innerHTML = '';
        startGame = true;
        (xo)?(player.innerText = 'X'):(player.innerText = 'O');
        let width = parent.clientWidth / colRow;
        for(let i = 0; i < Math.pow(colRow, 2); i++){
            let parx = game.createElement('div');
            parx.classList.add('item-xo');
            parx.setAttribute('selected', '0');
            parx.setAttribute('index', i);
            parx.style.width = `${width}px`;
            parx.style.height = `${width}px`;
            parx.addEventListener('click', selectCub.bind(this));
            parent.appendChild(parx);
        }
        getAnswersWin();
        if(!typeGame && !selectedItem){
            computerTime();
        }
    };

    function computerTime(){
        let item = game.querySelectorAll('.item-xo');
        
        let comp = !xo ? 1 : 0;
        let user = xo ? 1 : 0;
        let compans = findAnswers(comp, item);
        let userans = findAnswers(user, item);
        let index = getIndexForComputer(userans, compans, item);

        if(parseInt(item.item(index).getAttribute('selected')) === 0){        
            setTimeout(function(){
                withCoputerOrTwoPlyers(index, item.item(index), true);
            }, 200)
        }
    };

    function findAnswers(type, item){
        let ans = [];
        answers.map(function(answer, index){
            ans.push([]);
            for(let i = 0; i < item.length; i++){
                let selected = parseInt(item[i].getAttribute("selected")) === 1;
                let getAnswer = answer.includes(parseInt(item[i].getAttribute("index")));
                let itemType = parseInt(item[i].getAttribute("type")) === type
                if(selected && getAnswer && itemType){
                    ans[index].push(parseInt(item[i].getAttribute("index")));
                }
            }
        });

        return ans;
    };

    function findTheDifferenceOfAray(arr1, arr2){
        let differenceArray = [];
        arr1.map(function(item, index){
            if(!arr2.includes(item)){
                differenceArray.push(item);
            }
        });
        return differenceArray;
    };

    function getIndexForComputer(userans, compans, item) {
        let lenItem = colRow * colRow;
        let nInd = lenItem % 2 === 0 ? (lenItem / 2) - 1 : Math.floor(lenItem / 2);
        
        if(parseInt(item.item(nInd).getAttribute('selected')) === 0){
            return nInd;
        }else {
            let differenceArrayComp = getIndexUserAns(compans);
            let differenceArrayUser = getIndexUserAns(userans);
            let compIndex = coincideAns(differenceArrayComp, differenceArrayUser, item);

            // let userIndex =  coincideAns(differenceArrayUser, item);
            return compIndex;
        }
    };

    function coincideAns(arr1, arr2, item) {
        let indexisUser = [];
        let indexisComp = [];
        let ind = -1;
        arr1.map(function(item, index){
            if(item.length < colRow){
                indexisUser.push(index);
            }
        });

        arr2.map(function(item, index){
            if(item.length < colRow){
                indexisComp.push(index);
            }
        });

        if(indexisUser.length > 0){
            let arrAnsw = [];
            let uArr = [];
            let stIndex = false;
            indexisUser.map(function(it, index){
                // let differenceArray = findTheDifferenceOfAray(answers[it], arr[it]);
                arrAnsw.push(arr1[it]);
                if(arr1[it].length === 1 && parseInt(item.item(arr1[it][0]).getAttribute('selected')) === 0){
                    ind = arr1[it][0];
                    stIndex = true;
                }
            });

            indexisComp.map(function(it, index){
                // let differenceArray = findTheDifferenceOfAray(answers[it], arr[it]);
                if(arr2[it].length === 1 && parseInt(item.item(arr2[it][0]).getAttribute('selected')) === 0){
                    ind = arr2[it][0];
                    stIndex = true;
                }
            });
            if(!stIndex){
                nArr = concatAll(arrAnsw);
                let len = nArr.length;
                let getIndex = Math.floor(Math.random() * len);

                if(parseInt(item.item(nArr[getIndex]).getAttribute('selected')) === 0){
                    ind = nArr[getIndex];
                }else {
                    ind = coincideAns(arr1, arr2, item);
                }
            }
        }else {
            let nArr = concatAll(arr);
            let len = nArr.length;
            let getIndex = Math.floor(Math.random() * len);
            if(parseInt(item.item(getIndex).getAttribute('selected')) === 0){
                ind = getIndex;
            }else {
                ind = coincideAns(arr1, arr2, item);
            }
        }

        return ind;
    };

    function concatAll(arr){
        let nArr = [];
        arr.map(function(item, index){
            nArr = nArr.concat(item);
        });

        let uArr = [];

        nArr.map(function(item, index){
            if(!uArr.includes(item)){
                uArr.push(item);
            }
        })
        return uArr;
    };

    function getIndexUserAns(ans) {
        let differenceArray = [];

        ans.map(function(item, index){
            differenceArray.push(findTheDifferenceOfAray(answers[index], item));
        });

        return differenceArray;
    };

    restart.addEventListener('click', createRow);

    let ArmTicTacToe = {
        init: function(type = true){
            x_count.innerText = 0;
            y_count.innerText = 0;
            typeGame = type;
            if(type){
                xo = true;
                startGame = true;
                selectedItem = true;
                answers = [];
            }
            createRow();
        },
        empty: function(){
            win.innerText = '';
            parent.innerHTML = '';
            startGame = true;
        }
    }

    window.ArmTicTacToe = ArmTicTacToe;

})(document);