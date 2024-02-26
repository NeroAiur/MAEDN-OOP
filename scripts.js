document.addEventListener("DOMContentLoaded", () => {
    // initialising important variables
    let board;
    let gameState = [
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null
                    ]
    let currentPlayer = 1;
    let yellow;
    let green;
    let red;
    let black;
    
    // defining classes
    class player {
        constructor(id) {
            this.id = id;
            this.figures = [];
            this.home = [];
            this.end = [null, null, null, null];
            this.oneOut = false;
            this.oneHome = true;
            this.startingPoint;
            this.endEnteringPoint;
            this.dicePosition;
            switch(id) {
                case 1:
                    this.startingPoint = "1";
                    this.endEnteringPoint = "40";
                    this.dicePosition = "24";
                    break

                case 2:
                    this.startingPoint = "11";
                    this.endEnteringPoint = "10";
                    this.dicePosition = "30";
                    break;

                case 3:
                    this.startingPoint = "21";
                    this.endEnteringPoint = "20";
                    this.dicePosition = "96";
                    break;

                case 4:
                    this.startingPoint = "31";
                    this.endEnteringPoint = "30";
                    this.dicePosition = "90";
                    break;
            }
        }
    }

    class figure {
        constructor(player, position) {
            this.player = player;
            this.position = position;
            this.target = undefined;

            this.isHome = undefined;
            this.isEnd = undefined;
        }

        previewMove(roll) {
            removePreview();
            if (roll == null) return;
            if (this.position.endsWith("H1") || this.position.endsWith("H2") || this.position.endsWith("H3") || this.position.endsWith("H4")) {
                if (roll != 6) {
                    return;
                } else {
                    this.target = this.player.startingPoint;
                }
            } else this.target = (parseInt(this.position) + roll);
            board[this.target.toString()].classList.add("eligable");
            return;
        }

        executeMove(roll) {
            removePreview();
            if (this.position.endsWith("H1")) {
                board[this.target.toString()] = this;
                this.player.Home[0] = null;
                return;
            } else if (this.position.endsWith("H2")) {
                board[this.target.toString()] = this;
                this.player.Home[1] = null;
                return;
            } else if (this.position.endsWith("H3")) {
                board[this.target.toString()] = this;
                this.player.Home[2] = null;
                return;
            } else if (this.position.endsWith("H4")) {
                board[this.target.toString()] = this;
                this.player.Home[3] = null;
                return;
            } else {
                if (this.target >= 40) roll = roll - 40;
                board[this.target.toString()] = this;
                board[this.position] = null;
                return;
            }
        }
    }

    function removePreview() {
        for (let i = 0; i <= 120; i++) board[i].classList.remove("eligable");
        return;
    }

    function generatePlayers() {
        yellow = new player(1);
        green = new player(2);
        red = new player(3);
        black = new player(4);

        return [yellow, green, red, black];
    }

    function generatePieces() {
        for (player = 1; player < 5; player++) {
            let positions;
            switch (player) {
                case 1:
                    positions = ["P1-H1", "P1-H2", "P1-H3", "P1-H4"];
                    break;
                
                case 2:
                    positions = ["P2-H1", "P2-H2", "P2-H3", "P2-H4"];
                    break;
    
                case 3:
                    positions = ["P3-H1", "P3-H2", "P3-H3", "P3-H4"];
                    break;
    
                case 4:
                    positions = ["P4-H1", "P4-H2", "P4-H3", "P4-H4"];
                    break;
            }

            for (i = 0; i < 4; i++) {
                piece = new figure(i, positions[i]);
                switch (player) {
                    case 1:
                        yellow.figures.push(piece);
                        yellow.home[i] = positions[i];
                        continue;
                    
                    case 2:
                        green.figures.push(piece);
                        green.home[i] = positions[i];
                        continue;

                    case 3:
                        red.figures.push(piece);
                        red.home[i] = positions[i];
                        continue;
                    
                    case 4:
                        black.figures.push(piece);
                        black.home[i] = positions[i];
                        continue;
                }
            }
        }
    }

    function generateVisuals(player1, player2, player3, player4) {
        // the exact order of values in all of the arrays is important, as it determines the IDs of the board spaces
        // see the for-loop below
        let gameBoard = [
            44, 45, 46, 47, 48,
            37, 26, 15, 4, 5,
            6, 17, 28, 39, 50,
            51, 52, 53, 54, 65,
            76, 75, 74, 73, 72,
            83, 94, 105, 116, 115,
            114, 103, 92, 81, 70,
            69, 68, 67, 66, 55
        ];

        let p1Home = [0, 1, 11, 12];
        let p2Home = [9, 10, 20, 21];
        let p3Home = [108, 109, 119, 120];
        let p4Home = [99, 100, 110, 111];

        let p1End = [56, 57, 58, 59];
        let p2End = [16, 27, 38, 49];
        let p3End = [64, 63, 62, 61];
        let p4End = [104, 93, 82, 71];

        for (let i = 0; i <= 120; i++) {
            var div = document.createElement("div");
            if (gameBoard.includes(i)) {
                id = gameBoard.indexOf(i) + 1;
                switch (String(id)) {
                    case player1.startingPoint:
                        div.setAttribute("class", "gameBoard p1StartingPoint");
                        break;

                    case player2.startingPoint:
                        div.setAttribute("class", "gameBoard p2StartingPoint");
                        break;

                    case player3.startingPoint:
                        div.setAttribute("class", "gameBoard p3StartingPoint");
                        break;

                    case player4.startingPoint:
                        div.setAttribute("class", "gameBoard p4StartingPoint");
                        break;
    
                    default:
                        div.setAttribute("class", "gameBoard");
                }

            } else if (p1Home.includes(i)) {
                id = "P1-H" + (p1Home.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p1Home occupied p1Piece");

            } else if (p2Home.includes(i)) {
                id = "P2-H" + (p2Home.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p2Home occupied p2Piece");

            } else if (p3Home.includes(i)) {
                id = "P3-H" + (p3Home.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p3Home occupied p3Piece");
                 
            } else if (p4Home.includes(i)) {
                id = "P4-H" + (p4Home.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p4Home occupied p4Piece");
                 
            } else if (p1End.includes(i)) {
                id = "P1-E" + (p1End.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p1End");
                 
            } else if (p2End.includes(i)) {
                id = "P2-E" + (p2End.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p2End");
                 
            } else if (p3End.includes(i)) {
                id = "P3-E" + (p3End.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p3End");
                 
            } else if (p4End.includes(i)) {
                id = "P4-E" + (p4End.indexOf(i) + 1);
                div.setAttribute("class", "gameBoard p4End");
                 
            } else {
                id = null;
                var div = document.createElement("div")
            }

            if (id != null) div.id = id;
            document.getElementById("grid").appendChild(div);
        }
    }

    function initialize() {
        let playerArray = generatePlayers();
        console.log(playerArray);
        playerArray.forEach(player => {
            generatePieces(player);
        });

        generateVisuals(yellow, green, red, black);

    }
    
    function rollDice(getOutOnly, player) {
        let getOutAttempt = 0;
        let roll;
        board[player.dicePosition].classList.remove("diceButton", "eligable");

        while ((getOutOnly && getOutAttempt < 3 && roll != 6) || (!getOutOnly && getOutAttempt == 0)) {
            roll = Math.ceil(Math.random() * 6);
            getOutAttempt += 1;
        }

        switch (roll) {
            case 1:
                board[player.dicePosition].classList.add("dice1");
                break;
            case 2:
                board[player.dicePosition].classList.add("dice2");
                break;
            case 3:
                board[player.dicePosition].classList.add("dice3");
                break;
            case 4:
                board[player.dicePosition].classList.add("dice4");
                break;
            case 5:
                board[player.dicePosition].classList.add("dice5");
                break;
            case 6:
                board[player.dicePosition].classList.add("dice6");
                break;
        }

        if (getOutOnly && roll != 6) roll = null;
        return roll;

    }

    function changePlayer() {
        switch(currentPlayer) {
            case 1:
                board[yellow.dicePosition].classList.remove("dice");
                board[green.dicePosition].classList.add("dice");
                break;
            
            case 2:
                board[green.dicePosition].classList.remove("dice");
                board[black.dicePosition].classList.add("dice");
                break;

            case 3:
                board[red.dicePosition].classList.remove("dice");
                board[black.dicePosition].classList.add("dice");
                break;
            
            case 4:
                board[black.dicePosition].classList.remove("dice");
                board[yellow.dicePosition].classList.add("dice");
                break;
        }
        currentPlayer == 4 ? currentPlayer = 1 : currentPlayer += 1;
        return;
    }

    function game(e) {
        let player
        switch(currentPlayer) {
            case 1:
                player = yellow;
                break;
            case 2:
                player = green;
                break;
            case 3:
                player = red;
                break;
            case 4:
                player = black
                break;
        }
        gameBoard = document.querySelectorAll(".gameBoard");
        let clickTarget = e.target;
        let clickTargetCL = e.target.classList;
        let clickTargetElig = clickTargetCL.contains("eligable")
        let diceRoll;
        if (diceRoll === undefined && clickTargetElig) {
            diceRoll = rollDice(!player.oneOut, player);
            if (diceRoll) {
                clickTargetCL.remove("eligable");
                if (player.oneHome && diceRoll == 6) {

                }
            }
        }

    }

    function main() {
        initialize();
        let currentPlayer = 1
        let diceRoll = undefined;
        board = Array.from(document.querySelectorAll("#grid div"));
        board[yellow.dicePosition].classList.add("dice");
        board[yellow.dicePosition].classList.add("eligable");
        board.forEach(square => {
            square.addEventListener("click", game);
        })
    }

    main();
})