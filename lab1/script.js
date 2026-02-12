console.log(
  "Інструкція використання функції triangle(val1, type1, val2, type2):"
);
console.log(
  "Доступні типи: 'leg' (катет), 'hypotenuse' (гіпотенуза), 'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (кут для гіпотенузи)"
);
console.log("Приклад: triangle(3, 'leg', 5, 'hypotenuse');");

function triangle(val1, type1, val2, type2) {
  const TYPES = [
    "leg",
    "hypotenuse",
    "adjacent angle",
    "opposite angle",
    "angle",
  ];

  if (!TYPES.includes(type1) || !TYPES.includes(type2)) {
    console.log("Некоректний тип аргумента. Перечитайте інструкцію.");
    return "failed";
  }

  if (val1 <= 0 || val2 <= 0) {
    console.log("Значення мають бути додатними.");
    return "failed";
  }

  let a, b, c, alpha, beta;
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);

  let data = {};
  data[type1] = val1;
  data[type2] = val2;

  try {
    if (type1 === "leg" && type2 === "leg") {
      a = val1;
      b = val2;
      c = Math.sqrt(a * a + b * b);
      alpha = toDeg(Math.atan(a / b));
      beta = 90 - alpha;
    } else if (data["leg"] && data["hypotenuse"]) {
      let leg = data["leg"];
      let hyp = data["hypotenuse"];
      if (leg >= hyp) {
        console.log("Катет не може бути більшим за гіпотенузу.");
        return "failed";
      }
      a = leg;
      c = hyp;
      b = Math.sqrt(c * c - a * a);
      alpha = toDeg(Math.asin(a / c));
      beta = 90 - alpha;
    } else if (data["leg"] && data["adjacent angle"]) {
      a = data["leg"];
      beta = data["adjacent angle"];
      if (beta >= 90) return "Кут має бути гострим.";
      c = a / Math.cos(toRad(beta));
      b = Math.sqrt(c * c - a * a);
      alpha = 90 - beta;
    } else if (data["leg"] && data["opposite angle"]) {
      a = data["leg"];
      alpha = data["opposite angle"];
      if (alpha >= 90) return "Кут має бути гострим.";
      c = a / Math.sin(toRad(alpha));
      b = Math.sqrt(c * c - a * a);
      beta = 90 - alpha;
    } else if (data["hypotenuse"] && data["angle"]) {
      c = data["hypotenuse"];
      alpha = data["angle"];
      if (alpha >= 90) return "Кут має бути гострим.";
      a = c * Math.sin(toRad(alpha));
      b = c * Math.cos(toRad(alpha));
      beta = 90 - alpha;
    } else {
      console.log("Помилка: Несумісна пара типів.");
      return "failed";
    }

    console.log(`Результати:
a = ${a.toFixed(2)}
b = ${b.toFixed(2)}
c = ${c.toFixed(2)}
alpha = ${alpha.toFixed(2)}°
beta = ${beta.toFixed(2)}°`);

    return "success";
  } catch (e) {
    return "failed";
  }
}
