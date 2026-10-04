const timeElement = document.getElementById("time");
const periodElement = document.getElementById("period");
const dateElement = document.getElementById("date");
const dayElement = document.getElementById("day");
const btn12 = document.getElementById("btn12");
const btn24 = document.getElementById("btn24");

let is24Hour = false;

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let period = "";

    if (!is24Hour) {
        period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        if (hours === 0) {
            hours = 12;
        }
    }

    const formattedHours = formatNumber(hours);
    const formattedMinutes = formatNumber(minutes);
    const formattedSeconds = formatNumber(seconds);

    timeElement.textContent =
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    periodElement.textContent = period;
    periodElement.style.display =
        is24Hour ? "none" : "inline";

    const dateOptions = {
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    dateElement.textContent =
        now.toLocaleDateString("en-US", dateOptions);

    const dayOptions = {
        weekday: "long"
    };
    dayElement.textContent =
        now.toLocaleDateString("en-US", dayOptions);
}

btn12.addEventListener("click", function () {
    is24Hour = false;
    btn12.classList.add("active");
    btn24.classList.remove("active");
    updateClock();
});

btn24.addEventListener("click", function () {
    is24Hour = true;
    btn24.classList.add("active");
    btn12.classList.remove("active");
    updateClock();
});

updateClock();

setInterval(updateClock, 1000);