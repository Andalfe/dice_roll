document.addEventListener("DOMContentLoaded", () => {
    let highScore_num: number = 0;
    let lowScore_num: number = Infinity;

    const myButton = document.getElementById("myButton") as HTMLButtonElement | null;
    const resetButton = document.getElementById("resetButton") as HTMLButtonElement | null;
    const clickCount = document.getElementById("clickCount") as HTMLElement | null;
    const clickCount1 = document.getElementById("clickCount1") as HTMLElement | null;
    const clickSum = document.getElementById("clickSum") as HTMLElement | null;
    const highScore = document.getElementById("highScore") as HTMLElement | null;
    const lowScore = document.getElementById("lowScore") as HTMLElement | null;

    if (lowScore) {
        lowScore.textContent = `Low Score: N/A`; // Initialize low score display
    }

    if (myButton && resetButton) {
        myButton.addEventListener("click", () => {
            const dropdown_1 = document.getElementById("diceDropdown_1") as HTMLSelectElement | null;
            let dice1Value = "0";
            if (dropdown_1) {
                dice1Value = dropdown_1.value;
                // Use the value here if needed for other logic
                console.log("Dice 1 selected:", dice1Value);
            }

            const dropdown_2 = document.getElementById("diceDropdown_2") as HTMLSelectElement | null;
            let dice2Value = "0";
            if (dropdown_2) {
                dice2Value = dropdown_2.value; 
                // Use the value here if needed for other logic
                console.log("Dice 2 selected:", dice2Value);
            }

            console.log("Rolling dice...");
            playSound(); // Play sound on click

            function rollDie(dropdownValue: string): number {
                const randDice = (upperLimit: number): number => Math.floor(Math.random() * upperLimit) + 1;
                switch (dropdownValue) {
                    case "1": return randDice(4);
                    case "2": return randDice(6);
                    case "3": return randDice(8);
                    case "4": return randDice(10);
                    case "5": return randDice(12);
                    case "6": return randDice(20);
                    case "7": return randDice(100);
                    default: return 0;
                }
            }

            if (clickCount && clickCount1 && clickSum && highScore && lowScore) {
                let count = rollDie(dice1Value);
                let count1 = rollDie(dice2Value);
                let sum = count + count1;

                if (sum > highScore_num) highScore_num = sum;
                if (sum < lowScore_num) lowScore_num = sum;

                clickCount.textContent = `Dice 1: ${count}`;
                clickCount1.textContent = `Dice 2: ${count1}`;
                clickSum.textContent = `Sum: ${sum}`;
                highScore.textContent = `High Score: ${highScore_num}`;
                lowScore.textContent = `Low Score: ${lowScore_num === Infinity ? 'N/A' : lowScore_num}`;
            }
        });

        resetButton.addEventListener("click", () => {
            highScore_num = 0;
            lowScore_num = Infinity;
            if (highScore && lowScore) {
                highScore.textContent = `High Score: 0`;
                lowScore.textContent = `Low Score: N/A`;
            }
        });
    }
});

function playSound() {
    const audio = document.getElementById("dice") as HTMLAudioElement | null;
    if (audio) {
        audio.currentTime = 0; // Reset the audio playback position
        audio.play(); // Play the sound
    }
}

window.onerror = function (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error | null // Allow 'undefined' as well
): boolean | void {
    console.error('Uncaught Error:', message, source, lineno, colno, error);

    source = source || "Unknown source";
    lineno = lineno ?? -1;
    colno = colno ?? -1;

    const errorDetails = {
        message: message as string,
        source: source,
        lineno: lineno,
        colno: colno,
        stack: error ? error.stack : ''
    };

    fetch('/logError', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorDetails)
    }).catch((err) => console.error("Error sending to server:", err));

    console.error("Client-side error:", errorDetails);

    return true;
};