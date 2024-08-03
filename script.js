document.addEventListener("DOMContentLoaded", () => {
    let count;
    let count1;
    let sum;
    let highScore_num = 0; // Initialize highScore_num here

    const myButton = document.getElementById("myButton");
    const resetButton = document.getElementById("resetButton");
    const clickCount = document.getElementById("clickCount");
    const clickCount1 = document.getElementById("clickCount1");
    const clickSum = document.getElementById("clickSum");
    const highScore = document.getElementById("highScore");

    myButton.addEventListener("click", () => {
        // Generate random dice rolls (1-6)
        count = Math.floor(Math.random() * 6) + 1;
        count1 = Math.floor(Math.random() * 6) + 1;
        sum = count + count1;

        // Update highScore_num only if sum is greater than highScore_num
        if (sum > highScore_num) {
            highScore_num = sum;
        }

        // Update the DOM elements
        clickCount.textContent = `Dice 1: ${count}`;
        clickCount1.textContent = `Dice 2: ${count1}`;
        clickSum.textContent = `Sum: ${sum}`;
        highScore.textContent = `High Score: ${highScore_num}`;
    });
    resetButton.addEventListener("click", () => {
        highScore_num = 0;
        highScore.textContent = `High Score: ${0}`;
    });

});
