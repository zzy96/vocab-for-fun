const server = 'http://localhost:3002'

function invite(){

}

function generateQuestions(n, cb){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(xhttp.responseText));
    }
  }
  xhttp.open('GET', server + '/questions/' + n, true);
  xhttp.send();
}

function calculateScore(timeLeft){
  return timeLeft*5+50;
}

function updateStatus(isBusy, cb){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(xhttp.responseText));
    }
  }
  xhttp.open('POST', server + '/status', true);
  var data = {
    'isBusy': isBusy
  }
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}