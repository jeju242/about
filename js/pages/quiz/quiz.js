//퀴즈배열(질문,옵션,답)
const quiz = [
  {
      q: '제주대학교를 상징하는 동물은?',
      options:['호랑이','수달','사슴','독수리'],
      answer:2
  },
  {
      q: '제주대학교 교훈에 해당하지 않는 것은?',
      options:['진리','도전','정의','창조'],
      answer:1
  },
  {
      q: '제주대학교 설립년도는?',
      options:['1949년','1950년','1951년','1952년'],
      answer:3
  },
  {
      q: '제주대학교 학생들이 약 1만명임을 뜻하는 단어는?',
      options:['일만제대','일만아라','일만사라','일만한라'],
      answer:1
  },
  {
      q: '제주대학교 마스코트는 "사슴"이다. 무슨색 사슴일까?',
      options:['흰색','분홍색','노란색','갈색'],
      answer:0
  },
  {
      q: '제주대학로는 어디에 있는가?',
      options:['제주대학교','시청','아라동','서귀포시'],
      answer:1
  },
  {
      q: '제주대학교에서 존재하는 학과는?',
      options:['감귤포장학과','해녀학과','수산생명의학과','마사학과'],
      answer:2
  },
  {
      q: '산업응용경제학과는 어느 단과대학에 속하는가?',
      options:['경상대학','사회과학대학','생명자원과학대학','해양과학대학'],
      answer:2
  },
  {
    q: '정문에 있는 음식점이 아닌 것은?',
    options:['365국밥','밥먹젠','학교종이 땡땡땡','배꼽시계'],
    answer:3
  },
  {
    q: '후문에 있는 카페는?',
    options:['카페 스위그','카페 띠아모','카페 봄봄','카페 제대가는길'],
    answer:0
  },
  {
    q: '제주대학교 교목은?',
    options:['느티나무','비자나무','녹나무','야자수나무'],
    answer:1
  },
  {
    q: '제주대학교 축제 이름은?',
    options:['아라대축제','제주대축제','아라대동제','일만대동제'],
    answer:2
  },
  {
    q: '제주대학교에는 2대의 순환버스가 있는데, 하루 몇 회 교차운행하는가?',
    options:['50회','51회','52회','53회'],
    answer:2
  },
  {
    q: '제주대학교 박물관은 제주특별자치도 향토유형유산 제 32호인 \'이것\'을 소장하고 있는데, \'이것\'은?',
    options:['제주향교 대성전','동여비고','상모리 석상','신엄리 석상'],
    answer:3
  },
  {
    q: '제주대학교 내에 있는 오름의 이름은?',
    options:['관제오름','아부오름','바굼지오름','아끈다랑쉬오름'],
    answer:0
  }

]

//퀴즈번호
const questionNumber = document.querySelector(".question-number");
//퀴즈질문
const questionText = document.querySelector(".question-text");
//퀴즈옵션
const optionContainer = document.querySelector(".option-container");

const answersIndicatorContainer = document.querySelector(".answers-indicator");

//퀴즈시작박스
const homeBox = document.querySelector(".home-box");
//퀴즈내용박스
const quizBox = document.querySelector(".quiz-box");
//퀴즈결과박스
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//퀴즈배열을 availableQuestion에 넣는함수
function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for(let i=0; i<totalQuestion; i++){
      availableQuestions.push(quiz[i])
  }
  
}

//
function getNewQuestion(){
  //퀴즈번호생성
  questionNumber.innerHTML = "Question" + (questionCounter + 1) + "of" + quiz.length;

  //랜덤으로 문제 제출
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  //html 퀴즈질문부분에 랜덤으로 선택된 문제 삽입(currentQuestion.q=퀴즈질문)
  questionText.innerHTML = currentQuestion.q;
  
  //선택된 문제의 배열 인덱스 번호 추출
  const index1 = availableQuestions.indexOf(questionIndex);
  
  //인덱스 번호를 통해 제출된 문제를 배열에서 제거
  availableQuestions.splice(index1,1);
  
  
  //퀴즈옵션 추출하는 코드 시작!
  //현재 해당하는 퀴즈의 옵션 길이 optionLen에 넣음
  const optionLen = currentQuestion.options.length
  
  //옵션 길이만큼 반복해 availableOptions에 삽입
  for(let i=0; i<optionLen; i++){
      availableOptions.push(i)
  }
  optionContainer.innerHTML = '';
  let animationDelay = 0.15;
  
  for(let i=0;i<optionLen;i++){
      //랜덤으로 옵션 순서 결정하는 부분
      const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
      
      const index2 = availableOptions.indexOf(optonIndex);
      
      //순서 정해지면 삭제
      availableOptions.splice(index2,1);
      //div로 퀴즈옵션들 생성
      const option = document.createElement("div");
      option.innerHTML = currentQuestion.options[optonIndex];
      option.id = optonIndex;
      option.style.animationDelay = animationDelay + 's';
      //옵션이 0.15씩 차이를 두고 차례로 효과적용(순서대로 올라오는 느낌)
      animationDelay = animationDelay + 0.15;
      option.className = "option";
      //내용이 추가된 option을 html 퀴즈옵션 부분에 추가
      optionContainer.appendChild(option)
      //옵션에 속성을 set->클릭하면 getResult함수 실행
      option.setAttribute("onclick","getResult(this)");
  }

  //증가->그 다음 문제의 번호
  questionCounter++
}

//퀴즈옵션 클릭하면 getResult 함수 실행
function getResult(element){
  //옵션을 클릭하면 요소의아이디(=요소의 인덱스)가 저장-->option.id
  const id = parseInt(element.id);
  
  //요소의 아이디(어떤 옵션을 선택했는지)와 퀴즈에 해당하는 인덱스의 answer 비교
  //같다면(정답이라면)
  if(id == currentQuestion.answer){
      //요소에 "correct"라는 클래스 추가-->css를 통해 옵션 배경색을 초록색으로 변경(정답)
      element.classList.add("correct");
      //맞은 개수 +1
      correctAnswers++;
      console.log("correct:"+correctAnswers);
  }
  //다르다면(오답이라면)
  else{
      //요소에 "wrong"라는 클래스 추가-->css를 통해 옵션 배경색을 빨간색으로 변경(오답)
      element.classList.add("wrong");
      //+만약 정답이 틀렸을 경우 정답 출력(초록색으로)
      const optionLen = optionContainer.children.length;
      for(let i=0; i<optionLen; i++){
          if(parseInt(optionContainer.children[i].id)==currentQuestion.answer){
              optionContainer.children[i].classList.add("correct");
          }
      }
  }
  //한번만 선택할 수 있는 함수 실행
  unclickableOptions();
}

//한번만 선택 가능
function unclickableOptions(){
  const optionLen = optionContainer.children.length;
  for(let i=0; i<optionLen; i++){
      //요소에 "already-ansewered" 클래스 추가-->다른 옵션을 클릭할 수 없음(더이상의 이벤트 x)
      optionContainer.children[i].classList.add("already-answered");
  }
}

//다음을 구분하는 함수
function next(){
  //퀴즈가 모두 끝남
  if(questionCounter == quiz.length){
      console.log("quiz over");
      //quizOver 함수 실행
      quizOver();
  }
  //퀴즈가 모두 끝나지 않음
  else{
      //getNewQuestion 함수 실행
      getNewQuestion();
  }
}

function quizOver(){
  //"quizBox"라는 클래스를 가진 html 부분을 숨김
  quizBox.classList.add("hide");
  //"resultBox"라는 클래스를 가진 html 부분을 나타냄
  resultBox.classList.remove("hide");
  //quizResult 함수 실행
  quizResult();
}

//퀴즈 결과 보여주는 부분
function quizResult(){
  //"img"라는 id를 가진 div 선택해서 imgDiv에 넣음
  var imgDiv =document.getElementById('img');
  var txt;
  //문제 갯수 띄워줌
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  //맞은 갯수 띄워줌
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  //틀린 갯수 띄워줌
  resultBox.querySelector(".total-wrong").innerHTML = quiz.length - correctAnswers;
  //퍼센테이지 계산
  const percentage = (correctAnswers/quiz.length)*100;
  //점수 띄워줌
  resultBox.querySelector(".total-score").innerHTML = percentage.toFixed() + "점";
  //점수별 이미지 다르게 띄우는 부분
  if(percentage>=80){
    //해당하는 html 부분을 txt에 넣고 imgDiv에 붙여줌
    txt ='<img src="images/pages/quiz/퀴즈그림1.PNG" style="width: 200px; height: 200px;"><br><h5>여러분은 제주대학교에 대해 많이 알고계시네요!</h5>'
    imgDiv.innerHTML=txt;
  }
  else if(percentage>=50 && percentage<80){
    txt ='<img src="images/pages/quiz/퀴즈그림2.PNG" style="width: 200px; height: 200px;"><br><h5>여러분은 제주대학교에 대해 꽤나 알고계시네요!</h5>'
    imgDiv.innerHTML=txt;
  }
  else if(percentage<50){
    txt ='<img src="images/pages/quiz/퀴즈그림3.PNG" style="width: 200px; height: 200px;"><br><h5>여러분은 제주대학교에 대해서 알고있는게 대체 뭐에요?</h5>'
    imgDiv.innerHTML=txt;
  }
}

//점수초기화
function resetQuiz(){
  questionCounter = 0;
  correctAnswers = 0;
}

//홈으로
function goToHome(){
  //"resultBox"라는 클래스를 가진 html 부분을 숨김
  resultBox.classList.add("hide");
  //"homeBox"라는 클래스를 가진 html 부분을 나타냄
  homeBox.classList.remove("hide");
  //퀴즈 리셋
  resetQuiz();
}

//퀴즈시작
function startQuiz(){
  //"homeBox"라는 클래스를 가진 html 부분을 숨김
  homeBox.classList.add("hide");
   //"quizBox"라는 클래스를 가진 html 부분을 나타냄
  quizBox.classList.remove("hide");


  setAvailableQuestions();
  
  getNewQuestion();
  //답이 맞는지 문제 진행과 함께 체크
}

//"homeBox" 부분에 총 문제 갯수 보여줌
window.onload = function(){
  homeBox.querySelector(".total-question").innerHTML = quiz.length;
}

