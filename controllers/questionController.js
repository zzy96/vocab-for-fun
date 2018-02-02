var vocab = require('../data/vocab');

/*
  question format:
  {
    "word":"abase",
    "choices":["lower: humiliat","choice 2",...],
    "answer":0
  }
*/

module.exports = {

  generateN: function(n){
    var indexList = []
    var questions = []
    for (var i=0; i<n; i++){
      while(true){
        var index = Math.floor(Math.random() * 2937);
        if (!indexList.includes(index)){
          indexList.push(index)
          break
        }
      }
    }
    for (var i=0; i<n; i++){
      var question = {}
      question.word = vocab[indexList[i]].word
      question.choices = []
      question.answer = Math.floor(Math.random() * 5)
      var counter = 0;
      for (var j=0; j<5; j++){
        if (j!=question.answer){
          counter += Math.floor(Math.random() * 700)
          if (counter==indexList[i]){
            counter++
          }
          question.choices.push(vocab[counter].meaning)
        } else {
          question.choices.push(vocab[indexList[i]].meaning)
        }
      }
      questions.push(question)
    }
    return questions
  }

}
