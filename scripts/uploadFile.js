document.getElementById("radio_button_1").disabled  = true;
document.getElementById("radio_button_2").disabled  = true;
document.getElementById("radio_button_3").disabled  = true;
function toText(){
    document.getElementById("loading").innerHTML = '<img src="images/loading.gif" alt="loading ..." width="20%" style="margin-left:10% ;"><pre class="fs-1 fw-bold">Scanning Images ...</pre><br><br>';
    let lines = "";
    let files = document.getElementById("pictures").files;
    for (let index = 0; index < files.length; index++) {
        Tesseract.recognize(files[index], 'eng').then(({ data: { text } }) => {
            lines = text + lines;
        }).then().catch(err => {
            console.error("OCR Error:", err);
        });        
    }
    setTimeout(() => {
        document.getElementById("loading").innerHTML = "";
        document.getElementById("radio_button_1").disabled  = false;
        document.getElementById("radio_button_2").disabled  = false;
        document.getElementById("radio_button_3").disabled  = false;
        document.getElementById("confirm_button").disabled = false;
        toJSON(lines);//end of the extract call display funtion /solution for not funtioning async
    },5000*files.length);
}

function toJSON(lines){
    let lineArray = lines.split("\n");
    lineArray = lineArray.filter(line => line!="");//filtering blank lines
    let QCount = 0;
    let paper = [];
    lineArray.forEach(line => {
        if(/^(\w)/gm.test(line)){
            paper.push(new Question(line));
            QCount++;
        }else{
            paper[paper.length-1].setAnswer(line);
        }
    });
    let paperJSON = [];
    paper.forEach(question => {
        paperJSON.push({
            question : question.getQuestion(),
            answers : question.getAnswers(),
            userSelected : null
        });
    });
    localStorage.setItem("paper",JSON.stringify(paperJSON));
    localStorage.setItem("noOfQuestion",QCount);
    calcTime("low");
}
function calcTime(difficulty) {
    let QCount = localStorage.getItem("noOfQuestion");
    let netTime;
    switch (difficulty) {
        case "low":
            netTime = QCount * 3;//time allowance in minutes
            break;
        case "medium":
            netTime = QCount * 2.4;
            break;
        case "high":
            netTime = QCount * 2;
            break;
        default:
            
    }
    document.getElementById("timeAllowence").innerText = `You only have ${netTime} mins to answering`;
    localStorage.setItem("netTime",netTime);
}
function loadPaper() {
    window.location.replace("examhall.html");
}