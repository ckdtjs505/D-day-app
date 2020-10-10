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
      fetch("/start", { method: "POST" }).then(() => location.reload("true"));
    });
  }
}
