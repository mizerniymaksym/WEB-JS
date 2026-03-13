(function () {
  var names = [
    "Bill",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Steven",
    "Larry",
    "Paula",
    "Laura",
    "Jim",
  ];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0);
    var lastLetter = names[i].charAt(names[i].length - 1).toLowerCase();
    if (lastLetter === "l" && firstLetter !== "B") {
      console.log(`Congratulations ${names[i]} ! You won a million!!!`);
    }
  }
})();
