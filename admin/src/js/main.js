/* eslint-disable no-undef */

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
    this.goalInput = document.querySelector(".inputGoal");

    if (countValue[0]) {
      this.time.style.display = "block";
      this.start.style.display = "none";
    } else {
      this.time.style.display = "none";
      this.start.style.display = "block";
    }
  }

  event() {
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

      // 서버 호출후 페이지 리로드
      fetch(`/start/${this.goalInput.value}`, { method: "POST" }).then(() =>
        location.reload("true")
      );
    });
  }
}
