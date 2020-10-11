class app {
  constructor() {
    this.buildUI();
    this.getData();
    this.data = [];
  }

  buildUI() {
    this.date = document.querySelector(".date");
  }

  getData() {
    fetch(`http://localhost:3000/app`)
      .then(ele => ele.json())
      .then(data => {
        console.log(data);
      });
  }
}

new app();
