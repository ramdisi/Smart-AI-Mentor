function loadMarkings() {
    let checkedPaper = JSON.parse(localStorage.getItem("checkedPaper"));
    let noOfQuestions = Number.parseInt(localStorage.getItem("noOfQuestion"));
    let precentage = (checkedPaper.totalMarks/noOfQuestions)*100;
    document.getElementById("rightAnswers").innerText = "Right Answers : "+checkedPaper.totalMarks;
    document.getElementById("wrongAnswers").innerText = "Wrong Answers : "+(noOfQuestions-checkedPaper.totalMarks);
    document.getElementById("precentage").innerText = "Precentage : "+precentage.toFixed(2)+"%";
    wrongAnswerList = "";
    checkedPaper.results.forEach(questionContent => {
        if (!questionContent.isCorrect) {
            wrongAnswerList+=`
            <li class="list-group-item">${questionContent.question}<br>
            <p class="text-danger">Your Answer was : ${questionContent.userSelected}</p>
            <p class="text-success">Right Answern is : ${questionContent.correctAnswer}</p>
            <p class="text-info">${questionContent.suggestion}</p>
            </li>
            `;
        }
    });
    document.getElementById("advices").innerHTML = wrongAnswerList;
    let finalAdvice ="";
    if(precentage>75){
        finalAdvice = "👏 Congragulation You are in Top 1% 👍";
    }else if(precentage>55 ){
        finalAdvice = "You almost There! Never Give Up 👏";
    }else{
        finalAdvice ="You have to work hard 👨‍🎓 Never Give up 👏";
    }
    document.getElementById("finalAdvice").innerText = finalAdvice;
}