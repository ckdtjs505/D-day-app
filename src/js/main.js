/* eslint-disable no-undef */
import datepicker from "js-datepicker";

export default class admin {
  constructor() {
    this.buildUI();
    this.event();
  }

  buildUI() {
    this.time = document.querySelector(".time");
    this.start = document.querySelector(".start");
    this.resetBtn = document.getElementById("resetBtn");
    this.startBtn = document.getElementById("startBtn");
    this.goalInput = document.querySelector(".inputGoal"); // 목표일
    this.mainTextInput = document.querySelector(".inputMainText"); // 전광판
    this.startDateInput = document.getElementById("inputStartDate"); // 시작일
    this.startDatePicker = datepicker("#inputStartDate", {
      // 시작일 입력 달력
      showAllDates: true,
      customMonths: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월 ",
        "11월 ",
        "12월 "
      ],
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString();
        input.value = value; // => '1/1/2099'
      }
    });

    if (countValue[0]) {
      this.time.style.display = "block";
      this.start.style.display = "none";
    } else {
      this.time.style.display = "none";
      this.start.style.display = "block";
    }
  }

  event() {
    this.startDateInput.addEventListener("click", () => {
      this.startDatePicker.show();
    });

    this.resetBtn.addEventListener("click", () => {
      fetch(`/reset/${countValue[0]._id}`, { method: "POST" }).then(() => location.reload("true"));
    });

    this.startBtn.addEventListener("click", () => {
      // 목표값 없는 경우 예외처리
      if (!this.goalInput.value) {
        alert("목표값을 입력해 주세요");
        return;
      }

      // 목표값이 숫자가 아니면 예외처리
      // if (typeof this.goalInput.value !== "number") {
      //   alert("목표값을 숫자로 입력해 주세요");
      //   return;
      // }

      // 전광판 글씨 예외처리
      if (!this.mainTextInput.value) {
        alert("전광판 문구 입력해주세요");
        return;
      }

      // 서버 호출후 페이지 리로드
      fetch(`/start/${this.goalInput.value}`, {
        method: "POST",
        body: JSON.stringify({
          mainText: this.mainTextInput.value,
          startDate: this.startDateInput.value
        }),
        headers: { "Content-Type": "application/json" }
      }).then(() => location.reload("true"));
    });
  }
}
