let alocatedMins = localStorage.getItem("netTime");
let hours = Math.trunc(alocatedMins/60);
let mins = Math.trunc(alocatedMins)%60;
let seconds = Math.trunc((alocatedMins-hours*60-mins)*60);
let repeatingInterval = setInterval(countdown,1000)
function countdown() {    
    document.getElementById("clock").innerText = `${(""+hours).padStart(2,0)}:${(""+mins).padStart(2,0)}:${(""+seconds).padStart(2,0)}`;
    if (seconds==0) {
        if (hours==0 & mins==0) {
            clearInterval(repeatingInterval);
            submitAnswers();
        } else {
            if (hours!=0 & mins==0) {
                --hours;
                mins=59;
                seconds=60;
            } else {
                --mins;
                seconds = 60;
            }
        }
    }
    --seconds;
}

function submitAnswers() {
    //code here to upload api
}