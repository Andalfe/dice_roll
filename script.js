document.addEventListener("DOMContentLoaded", () => {
    let count;
    let count1;
    let sum;
    let highScore_num = 0; // Initialize high score
    let lowScore_num = Infinity; // Initialize low score to Infinity

    const myButton = document.getElementById("myButton");
    const resetButton = document.getElementById("resetButton");
    const clickCount = document.getElementById("clickCount");
    const clickCount1 = document.getElementById("clickCount1");
    const clickSum = document.getElementById("clickSum");
    const highScore = document.getElementById("highScore");
    const lowScore = document.getElementById("lowScore");

    myButton.addEventListener("click", () => {
        // Generate random dice rolls (1-6)
        // count = Math.floor(Math.random() * 6) + 1;
        // count1 = Math.floor(Math.random() * 6) + 1;

        let dropdown_1 = document.getElementById("diceDropdown_1").value;
        let dropdown_2 = document.getElementById("diceDropdown_2").value;

        // console.log(dropdown_1);


        function rollDie(dropdownValue) {
            switch (dropdownValue) {
                case "1":
                    return Math.floor(Math.random() * 4) + 1;
                case "2":
                    return Math.floor(Math.random() * 6) + 1;
                case "3":
                    return Math.floor(Math.random() * 8) + 1;
                case "4":
                    return Math.floor(Math.random() * 10) + 1;
                case "5":
                    return Math.floor(Math.random() * 12) + 1;
                case "6":
                    return Math.floor(Math.random() * 20) + 1;
                case "7":
                    return Math.floor(Math.random() * 100) + 1;
                default:
                    return "None"; // Default case if no match is found
            }
        }

        // Now, call the function for each dropdown
        let count = rollDie(dropdown_1);
        let count1 = rollDie(dropdown_2);

        sum = count + count1;

        // Update high score
        if (sum > highScore_num) {
            highScore_num = sum;
        }

        // Update low score (only if it's lower than the current lowScore_num)
        if (sum < lowScore_num) {
            lowScore_num = sum;
        }

        // Update the DOM elements
        clickCount.textContent = `Dice 1: ${count}`;
        clickCount1.textContent = `Dice 2: ${count1}`;
        clickSum.textContent = `Sum: ${sum}`;
        highScore.textContent = `High Score: ${highScore_num}`;
        lowScore.textContent = `Low Score: ${lowScore_num}`;
    });

    resetButton.addEventListener("click", () => {
        highScore_num = 0;
        lowScore_num = Infinity; // Reset to Infinity to ensure correct tracking
        highScore.textContent = `High Score: ${0}`;
        lowScore.textContent = `Low Score: N/A`; // Indicate no rolls yet
    });
});

function playSound() {
    const audio = document.getElementById("dice");
    audio.currentTime = 0; // Reset the audio playback position
    audio.play(); // Play the sound
}