var target_mili_sec = new Date("March 4, 2025 20:00:00 UTC+2").getTime();
function timer() {
    var now_mili_sec = new Date().getTime();
    var remaining_sec = Math.floor( (target_mili_sec - now_mili_sec) / 1000 );

    var day = Math.floor(remaining_sec / (3600 * 24));
    var hour = Math.floor((remaining_sec % (3600 * 24)) / 3600);
    var min = Math.floor((remaining_sec % 3600) / 60);
    var sec = Math.floor(remaining_sec % 60);

    document.querySelector("#day").innerHTML = day;
    document.querySelector("#hour").innerHTML = hour;
    document.querySelector("#min").innerHTML = min;
    document.querySelector("#sec").innerHTML = sec;

    if (remaining_sec <= 0) {
        document.querySelector("#day").innerHTML = 0;
        document.querySelector("#hour").innerHTML = 0;
        document.querySelector("#min").innerHTML = 0;
        document.querySelector("#sec").innerHTML = 0;
    }
}

setInterval(timer, 1000); 