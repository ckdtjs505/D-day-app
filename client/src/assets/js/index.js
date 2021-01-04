import { shell } from "electron";

class dayApp {
  constructor() {
    this.buildUI();
    this.getData();
    this.event();
    this.data = [];
  }

  buildUI() {
    this.date = document.querySelector(".date");
    this.startDate = document.querySelector(".startDate");
    this.currentDate = document.querySelector(".currentDate");
    this.headerLogo = document.querySelector(".left_logo");
    this.logo = document.querySelector(".logo");
    this.closeBtn = document.querySelector("button.close");
    this.achDate = document.querySelector(".achDate");
    this.mainText = document.querySelector(".alert-message");

    this.currentDate.innerHTML = new Date().toLocaleDateString();
    this.hideSetTimeout = null;
  }

  event() {
    this.logo.addEventListener("click", () => {
      this.goToWebSite("http://woominec.co.kr/");
    });

    this.headerLogo.addEventListener("click", () => {
      this.goToWebSite("http://woominec.co.kr/");
    });

    // 종료 버튼 클릭시 창 숨김
    this.closeBtn.addEventListener("click", () => {
      window.close();
    });
  }

  // 웹 사이트 이동
  goToWebSite(url) {
    shell.openExternal(`${url}`);
  }

  // 숫자 문자열 변환
  numberToString(num) {
    if (num >= 1000) {
      return num;
    } else if (num >= 100) {
      return `0${num}`;
    } else if (num >= 10) {
      return `00${num}`;
    } else {
      return `000${num}`;
    }
  }

  // 날짜 더하기
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // 데이터 받기
  getData() {
    fetch(`https://woomin-d-day-app.herokuapp.com/app`)
      .then(ele => ele.json())
      .then(data => {
        console.log(data);
        const { goal, startDate, mainText } = data[0];
        const count =
          Math.ceil(
            // TODO :: -1 지우는 방향으로 진행
            // 현재 시간은 국내시간으로, 시작 날짜는 국외 기준 날짜이기에 오차가 생김
            Math.abs(new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
          ) - 1;

        console.log(startDate, new Date(startDate).toLocaleDateString(), new Date().getTime());

        // 목표
        this.date.querySelector(".pur").innerHTML = `${this.numberToString(goal)}`;
        // 달성
        this.date.querySelector(".state").innerHTML = `${this.numberToString(count)}`;
        // 시작일
        this.startDate.innerHTML = new Date(startDate).toLocaleDateString();
        // 달성 예정일
        this.achDate.innerHTML = this.addDays(startDate, goal).toLocaleDateString("ko-KR");
        // 문구
        this.mainText.innerHTML = mainText;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

new dayApp();
