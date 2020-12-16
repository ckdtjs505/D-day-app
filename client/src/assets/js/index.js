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
    fetch(`http://localhost:3000/app`)
      .then(ele => ele.json())
      .then(data => {
        console.log(data);
        const { goal, startDate } = data[0];
        const count = Math.ceil(
          (new Date().getTime() - new Date(startDate.split("T")[0]).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        this.date.querySelector(".pur").innerHTML = `${this.numberToString(goal)}`;
        this.date.querySelector(".state").innerHTML = `${this.numberToString(count)}`;
        this.startDate.innerHTML =
          `${startDate.split("-")[0]}. ` +
          `${startDate.split("-")[1]}. ` +
          `${startDate.split("-")[2].split("T")[0]}`;
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
