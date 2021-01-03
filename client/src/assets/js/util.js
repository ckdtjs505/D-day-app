export class Util {
  static addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // ##.##.## 형식으로 변경
  static dayToFormat(day) {
    return (
      `${day.split("-")[0]}. ` + `${day.split("-")[1]}. ` + `${day.split("-")[2].split("T")[0]}.`
    );
  }
}
