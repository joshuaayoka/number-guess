"use strict";

class GuessingGame {
    constructor() {
        this.statusMessage = document.getElementById("status");
        this.inputContainer = document.getElementById("number-input");
        this.actionButton = document.getElementById("action-button");
        this.livesContainer = document.getElementById("lives");
        this.number = this.generateNumber();
        this.lives = 7;
        this.mode = 0;
        this.actionButton.addEventListener("click", function () {
            this.action(this.mode);
        }.bind(this));
    }

    generateNumber() {
        return Math.round(Math.random() * 100);
    }

    action() {
        if (this.mode == 0) {
            this.checkGuess();
        }
        else if (this.mode == 1) {
            this.reset();
        }
    }

    checkGuess() {
        let input = this.inputContainer.value;
        if (input != "") {
            this.inputContainer.value = "";
            if (input > this.number) {
                this.statusMessage.textContent = input + " is too high";
            }
            else if (input < this.number) {
                this.statusMessage.textContent = input + " is too low";
            }
            else {
                this.statusMessage.textContent = "You win! " + input +
                    " is the correct answer!";
                this.gameOver(true);
            }
    
            this.lives--;
            this.updateLivesContainer();
    
            if (this.lives <= 0) {
                this.statusMessage.textContent = "You ran out of lives";
                this.gameOver(false);
            }
        }
    }

    updateLivesContainer() {
        this.livesContainer.textContent = "You have " + this.lives + " lives left";
    }

    gameOver(win) {
        this.mode = 1;
        if (win) {
            this.livesContainer.style.visibility = "hidden";
        }
        this.inputContainer.setAttribute("readonly", true);
        this.actionButton.textContent = "Replay";
    }

    reset() {
        this.statusMessage.textContent = "Take a guess";
        this.inputContainer.removeAttribute("readonly");
        this.actionButton.textContent = "Enter";
        this.number = this.generateNumber();
        this.lives = 7;
        this.updateLivesContainer();
        this.livesContainer.style.visibility = "visible";
        this.mode = 0;
    }

}

new GuessingGame();