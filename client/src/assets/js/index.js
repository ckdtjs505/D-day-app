const { shell, remote } = require("electron");

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

    this.currentDate.innerHTML = new Date().toLocaleDateString();
    this.hideSetTimeout = null;
  }

  event() {
    this.logo.addEventListener("click", () => {
      shell.openExternal("http://woominec.co.kr/");
    });

    this.headerLogo.addEventListener("click", () => {
      shell.openExternal("http://woominec.co.kr/");
    });

    // 종료 버튼 클릭시 창 숨김
    this.closeBtn.addEventListener("click", () => {
      this.hideMainWindow();
    });
  }

  // 메인 윈도우 숨기기
  hideMainWindow() {
    window.close();
  }

  getData() {
    fetch(`https://woomin-d-day-app.herokuapp.com/app`)
      .then(ele => ele.json())
      .then(data => {
        console.log(data);
        const { goal, startDate } = data[0];
        const count = Math.ceil(
          (new Date().getTime() - new Date(startDate.split("T")[0]).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        // 목표
        this.date.querySelector(".pur").innerHTML = `${this.numberToString(goal)}`;
        // 달성
        this.date.querySelector(".state").innerHTML = `${this.numberToString(count)}`;
        // 시작일
        this.startDate.innerHTML = new Date(startDate).toLocaleDateString();
        // 달성 예정일
        this.achDate.innerHTML = Util.addDays(startDate, goal).toLocaleDateString("ko-KR");
      })
      .catch(e => {
        console.log(e);
      });
  }

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
}

new dayApp();
