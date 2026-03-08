let car1 = new Object();
car1.color = "pink";
car1.maxSpeed = 280;
car1.driver = {
  name: "Maks Mizerniy",
  category: "C",
  "personal limitations": "No driving at night",
};
car1.tuning = true;
car1["number of accidents"] = 0;

car1.drive = function () {
  console.log("I am not driving at night");
};
car1.drive();

let car2 = {
  color: "black",
  maxSpeed: 220,
  driver: {
    name: "Maks Mizerniy",
    category: "B",
    "personal limitations": null,
  },
  tuning: false,
  "number of accidents": 2,
  drive: function () {
    console.log("I can drive anytime");
  },
};
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  this.trip = function () {
    if (!this.driver) {
      console.log("No driver assigned");
    } else {
      let msg = `Driver ${this.driver.name} `;
      msg += this.driver.nightDriving
        ? "drives at night"
        : "does not drive at night";
      msg += ` and has ${this.driver.experience} years of experience`;
      console.log(msg);
    }
  };
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience,
  };
};

let truck1 = new Truck("black", 3000, 90, "Audi", "A4");
truck1.AssignDriver("Maks", true, 5);
truck1.trip();

let truck2 = new Truck("white", 5000, 80, "Volvo", "FH16");
truck2.AssignDriver("Ivan", false, 10);
truck2.trip();

class Square {
  constructor(a) {
    this.a = a;
  }
  static help() {
    console.log(
      "A square is a regular quadrilateral in which all sides and angles are equal."
    );
  }
  length() {
    console.log(`Length: ${4 * this.a}`);
  }
  square() {
    console.log(`Square ${this.a * this.a}`);
  }
  info() {
    console.log(`Side lengths: ${this.a},${this.a},${this.a},${this.a},`);
    console.log(`Corners: 90, 90, 90, 90`);
    this.length();
    this.square();
  }
}

class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }
  static help() {
    console.log(
      "A rectangle is a quadrilateral in which all angles are right angles."
    );
  }
  length() {
    console.log(`Length: ${2 * (this.a + this.b)}`);
  }
  square() {
    console.log(`Square: ${this.a * this.b}`);
  }
  info() {
    console.log(`Side lengths: ${this.a},${this.b},${this.a},${this.b},`);
    console.log(`Corners: 90, 90, 90, 90`);
    this.length();
    this.square();
  }
}
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this._alpha = alpha;
    this._beta = beta;
  }
  get a() {
    return this._a;
  }
  set a(val) {
    if (val > 0) this._a = val;
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(val) {
    if (val > 0 && val < 180) this._alpha = val;
  }
  get beta() {
    return this._beta;
  }
  set beta(val) {
    if (val > 0 && val < 180) this._beta = val;
  }
  static help() {
    console.log(
      "A rhombus is a quadrilateral whose four sides all have the same length."
    );
  }
  length() {
    console.log(`Length: ${4 * this.a}`);
  }
  square() {
    let area = this.a * this.a * Math.sin((this.alpha * Math.PI) / 180);
    console.log(`Square: ${area.toFixed(2)}`);
  }
  info() {
    console.log(`Side lengths: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
    console.log(
      `Corners: ${this.alpha}, ${this.beta}, ${this.alpha}, ${this.beta}`
    );
    this.length();
    this.square();
  }
}
class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha;
    this.beta = beta;
  }
  static help() {
    console.log(
      "A parallelogram is a simple quadrilateral with two pairs of parallel sides."
    );
  }
  length() {
    console.log(`Perimeter: ${2 * (this.a + this.b)}`);
  }
  square() {
    let area = this.a * this.b * Math.sin((this.alpha * Math.PI) / 180);
    console.log(`Square: ${area.toFixed(2)}`);
  }
  info() {
    console.log(`Side lengths: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
    console.log(
      `Corners: ${this.alpha}, ${this.beta}, ${this.alpha}, ${this.beta}`
    );
    this.length();
    this.square();
  }
}

console.log("help()");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

console.log("info()");
let square = new Square(5);
square.info();

let rectangle = new Rectangle(4, 6);
rectangle.info();

let rhombus = new Rhombus(5, 60, 120);
rhombus.info();

let parallelogram = new Parallelogram(4, 6, 45, 135);
parallelogram.info();

function Triangular(a = 3, b = 4, c = 5) {
  return { a, b, c };
}
let t1 = Triangular();
let t2 = Triangular(6, 8, 10);
let t3 = Triangular(5, 12, 13);

console.log("Triangles:", t1, t2, t3);

function PiMultiplier(multiplier) {
  return function () {
    return Math.PI * multiplier;
  };
}
let multiply1 = PiMultiplier(2);
let multiply2 = PiMultiplier(2 / 3);
let multiply3 = PiMultiplier(0.5);

console.log(`Pi * 2: ${multiply1()}`);
console.log(`Pi * 2/3: ${multiply2()}`);
console.log(`Pi / 2: ${multiply3()}`);

function Painter(color) {
  return function (obj) {
    if (obj && obj.type) {
      console.log(`Color: ${color}, Type: ${obj.type}`);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}

let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");

let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("--- Painting Objects ---");
PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);
