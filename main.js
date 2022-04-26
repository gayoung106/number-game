//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 down!
//랜덤번호가 > 유저번호 up!
//reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다. 더이상 추측불가, 버튼이 disable
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지않음
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회깍지않음

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click",play);
//함수를 변수처럼 넘겼음 그래서 play()가 아님
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value=""})

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100+1);
    console.log("정답", computerNum);
}
function play() {
    let userValue=userInput.value;

    if(userValue<1 || userValue > 100) {
        resultArea.textContent="1~100사이 숫자만 입력해주세요"
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent="이미 입력한 숫자 입니다"
        return;
    }

    chances --;
    chanceArea.textContent=`남은기회: ${chances}번`;
    console.log(chances);


    if(userValue<1 || userValue > 100) {
        resultArea.textContent="1~100사이에 숫자만 입력해주세요"

    }else if(userValue < computerNum){
        resultArea.textContent="up!"

    }else if(userValue > computerNum) {
        resultArea.textContent="down!"

    }else {
        resultArea.textContent="정답"
        gameOver=true;

    }

    history.push(userValue);

    if(chances<1) {
        gameOver=true;
        playButton.disabled = true;

    }

}

function reset(){
    // 유저 인풋창 정리
    userInput.value = ""
    // 새로운 번호 생성
    pickRandomNum();
    resultArea.textContent="리셋되었습니다!";
    chances = 5;
    chanceArea.textContent=`남은기회: ${chances}번`;
    playButton.disabled=false;
    history.length=0;

}
pickRandomNum();