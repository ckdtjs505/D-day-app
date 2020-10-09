/* eslint-disable no-undef */

export default class admin {
  constructor() {
    this.buildUI();
    this.event();
  }

  buildUI() {
    this.resetBtn = document.getElementById("resetBtn");
    this.startBtn = document.getElementById("startBtn");

    if (countValue[0]) {
      this.resetBtn.style.display = "block";
      this.startBtn.style.display = "none";
    } else {
      this.resetBtn.style.display = "none";
      this.startBtn.style.display = "block";
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
