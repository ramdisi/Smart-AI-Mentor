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
    let idTemplate = "Q-A-";
    let noOfQuestion = Number.parseInt(localStorage.getItem("noOfQuestion"));
    let paper = JSON.parse(localStorage.getItem("paper"));
    for (let index = 0; index < noOfQuestion; index++) {
        let id = idTemplate+(index+1);
        let radioButtons = document.getElementsByName(id);
        radioButtons.forEach(radioButton => {
            if(radioButton.checked){
                paper[index].userSelected = radioButton.value;
            }
        });
    }
    localStorage.setItem("answeredPaper",JSON.stringify(paper));
    window.location.replace("waiting.html")
}

function loadPaper() {
    let paper = JSON.parse(localStorage.getItem("paper"));
    let htmlPaper = "";
    let questionNumber = 1;
    paper.forEach(json => {
        let question = replaceSpecialCharacters(json.question);
        let answers = json.answers;
        htmlPaper+=`${question}<br>`;
        htmlPaper+=`<input type="radio" name="Q-A-${questionNumber}" value="not answered" checked hidden>`;
        answers.forEach(answer => {
            htmlPaper+=`&nbsp;&nbsp;<input type="radio" name="Q-A-${questionNumber}" value="${replaceSpecialCharacters(answer)}"> ${answer}<br>`;
        });
        htmlPaper+=`<br>`;
        questionNumber++;
    });
    document.getElementById("paperCanvas").innerHTML = htmlPaper;
}
function replaceSpecialCharacters(line) {
    return line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}