

document.addEventListener("DOMContentLoaded", () => {



    let highScore_num = 0;
    let lowScore_num = Infinity;

    const myButton = document.getElementById("myButton");
    const resetButton = document.getElementById("resetButton");
    const clickCount = document.getElementById("clickCount");
    const clickCount1 = document.getElementById("clickCount1");
    const clickSum = document.getElementById("clickSum");
    const highScore = document.getElementById("highScore");
    const lowScore = document.getElementById("lowScore");

    if (myButton && resetButton) {
        myButton.addEventListener("click", () => {
            const dropdown_1 = document.getElementById("diceDropdown_1").value;
            const dropdown_2 = document.getElementById("diceDropdown_2").value;
            console.log("hello");

            function rollDie(dropdownValue) {
                const randDice = (upperLimit) => Math.floor(Math.random() * upperLimit) + 1;
                switch (dropdownValue) {
                    case "1": return randDice(4);
                    case "2": return randDice(6);
                    case "3": return randDice(8);
                    case "4": return randDice(10);
                    case "5": return randDice(12);
                    case "6": return randDice(20);
                    case "7": return randDice(100);
                    case "8": return 0;
                }
            }

            let count = rollDie(dropdown_1);
            let count1 = rollDie(dropdown_2);
            let sum = count + count1;

            if (sum > highScore_num) highScore_num = sum;
            if (sum < lowScore_num) lowScore_num = sum;

            clickCount.textContent = `Dice 1: ${count}`;
            clickCount1.textContent = `Dice 2: ${count1}`;
            clickSum.textContent = `Sum: ${sum}`;
            highScore.textContent = `High Score: ${highScore_num}`;
            lowScore.textContent = `Low Score: ${lowScore_num}`;
        });

        resetButton.addEventListener("click", () => {
            highScore_num = 0;
            lowScore_num = Infinity;
            highScore.textContent = `High Score: 0`;
            lowScore.textContent = `Low Score: N/A`;
        });
    }
});

function playSound() {
    const audio = document.getElementById("dice");
    audio.currentTime = 0; // Reset the audio playback position
    audio.play(); // Play the sound
}







// Catch any uncaught errors and send them to the server
window.onerror = function (message, source, lineno, colno, error) {
    const errorDetails = {
        message: message,
        source: source,
        lineno: lineno,
        colno: colno,
        stack: error ? error.stack : ''
    };

    // Send the error to the server using a POST request
    fetch('/logError', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorDetails)
    }).catch(err => console.error("Error sending to server:", err));

    // You can also log to the console for debugging
    console.error("Client-side error:", errorDetails);
};