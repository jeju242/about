// 문제 객체(생성자 함수)
function Question(text, choice, answer, explain) {
  this.text = text; // 질문 텍스트
  this.choice = choice; // 선택할 답들(배열)
  this.answer = answer; // 정답 정보
  this.explain = explain;
}

// 퀴즈 정보 객체
function Quiz(questions) {
  this.score = 0; // 점수
  this.questions = questions; // 문제
  this.questionIndex = 0; // 문제 번호
}

// 정답 확인 메서드
Quiz.prototype.correctAnswer = function(answer) {
  return answer == this.questions[this.questionIndex].answer;
}

var questions = [
  new Question('제주대학교를 상징하는 동물은?', ['호랑이', '수달', '사슴', '독수리'], '사슴', '제주대학교를 상징하는 동물은 사슴입니다.'),
  new Question('제주대학교 교훈에 해당하지 않는 것은?', ['진리', '도전', '정의', '창조'], '도전','제주대학교 교훈은 진리,정의,창조 3가지 입니다.'),
  new Question('제주대학교 설립년도는?', ['1949년', '1950년', '1951년', '1952년'], '1952년','제주대학교의 설립년도는 1952년입니다.'),
  new Question('제주대학교 학생들이 약 1만명임을 뜻하는 단어는?', ['일만제대', '일만아라', '일만사라', '일만한라'], '일만아라','제주대학교 학생들이 약 1만명임을 뜻하는 단어는 일만아라입니다.')
];

// 퀴즈 객체 생성
var quiz = new Quiz(questions);

// 문제 출력 함수
function updateQuiz() {
  var question = document.getElementById('question');
  var idx = quiz.questionIndex + 1;
  var choice = document.querySelectorAll('.btn');

  // 문제 출력
  question.innerHTML = idx + '. ' + quiz.questions[quiz.questionIndex].text;

  // 선택 출력
  for (var i = 0; i < 4; i++) {
     choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
  }

  progress();
}

function progress() {
  var progress = document.getElementById('progress');
  progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
}

var btn = document.querySelectorAll('.btn');


//틀릴시 해설 보여주는 함수
function printExplain(){
  var explain= '';
  var question=quiz.questions[quiz.questionIndex].explain
  
  explain +=question;
  alert('오답입니다! '+explain);
  //$("#exp").append(explain);
}


// 입력 및 정답 확인 함수
function checkAnswer(i) {
  btn[i].addEventListener('click', function() {
     var answer = btn[i].innerText;

     if (quiz.correctAnswer(answer)) {
        alert('정답입니다!');
        quiz.score++;
     } else {
        printExplain();
        
     }

     if (quiz.questionIndex < quiz.questions.length - 1) {
        quiz.questionIndex++;
        updateQuiz();
     } else {
        result();
     }
  });
}





function result() {
  var quizDiv = document.getElementById('quiz');
  var per = parseInt((quiz.score * 100) / quiz.questions.length);
  var txt = '<h1>결과</h1>' + '<h2 id="score">당신의 점수: ' + quiz.score + '/' + quiz.questions.length + '<br><br>' + per + '점' + '</h2>';

  quizDiv.innerHTML = txt;

  // 점수별 결과 텍스트
  // 추후 그림 적용
  if (per < 60) {
     txt += '<img src="images/quizimg/퀴즈그림1배경색(회).PNG"  style="width: 200px; height: 150px;"><br><h2>여러분은 제주대학교에 대해서 알고있는게 대체 뭐에요?</h2>';
     quizDiv.innerHTML = txt;
  } else if (per >= 60 && per < 80) {
     txt += '<img src="images/quizimg/퀴즈그림1배경색(회).PNG" style="width: 200px; height: 150px;"><br><h2>여러분은 제주대학교에 대해 꽤나 알고계시네요!</h2>'
     quizDiv.innerHTML = txt;
  } else if (per >= 80) {
     txt += '<img src="images/quizimg/퀴즈그림1배경색(회).PNG" style="width: 200px; height: 150px;"><br><h2>여러분은 제주대학교에 대해 많이 알고계시네요!</h2>'
     quizDiv.innerHTML = txt;
  }
}

for (var i = 0; i < btn.length; i++) {
  checkAnswer(i);
}

updateQuiz();