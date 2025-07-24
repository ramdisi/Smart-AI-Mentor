class Question {
    answerArray = [];
    constructor(question) {
        this.question = question;
    }
    setQuestion(question){
        this.question = question;
    }
    setAnswer(answer) {
       this.answerArray.push(answer); 
    }
    getQuestion(){
        return this.question;
    }
    getAnswers(){
        return this.answerArray;
    }
}