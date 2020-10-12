class app {
  constructor() {
    this.buildUI();
    this.getData();
    this.data = [];
  }

  buildUI() {
    this.date = document.querySelector(".date");
    this.startDate = document.querySelector(".startDate");
  }

  getData() {
    fetch(`http://localhost:3000/app`)
      .then(ele => ele.json())
      .then(data => {
        const { count, goal, startDate } = data[0];
        console.log(this.date.querySelector(".pur"));
        this.date.querySelector(".pur").innerHTML = goal;
        this.date.querySelector(".state").innerHTML = `${this.numberToString(count + 1)}`;
        this.startDate.innerHTML =
          `${startDate.split("-")[0]}.` +
          `${startDate.split("-")[1]}.` +
          `${startDate.split("-")[2].split("T")[0]}`;
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

new app();
