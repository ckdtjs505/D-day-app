export default class admin {
  constructor() {
    this.buildUI();
    this.event();
  }

  buildUI() {
    this.resetBtn = document.getElementById("resetBtn");
    this.startBtn = document.getElementById("startBtn");
  }

  event() {
    this.resetBtn.addEventListener("click", () => {
      fetch("/reset", { method: "POST", data: countValue });
    });

    this.startBtn.addEventListener("click", () => {
      fetch("/start", { method: "POST" });
    });
  }
}
