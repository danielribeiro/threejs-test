module("Mirror Test");

function displayDiffImage(result) {
  // if (result.misMatchPercentage == 0)
  //     return;
  var currentTest = QUnit.config.current.testNumber - 1;
  console.log("current test = ", currentTest);
  var diffImage = document.createElement("img")
  diffImage.src = result.getImageDataUrl();
  image_diffs = document.getElementById('qunit-test-output' + currentTest)
  image_diffs.appendChild(diffImage)

}

asyncTest("mirror demo ", function () {
  Math.reseed();
  var canvas_name = "mirror-test"
  mirror_sample(canvas_name);
  var canvas = document.getElementById(canvas_name);
  canvas.setAttribute("class", "input-canvas")
  var result = canvas.toDataURL("image/png");
  resemble("fixtures/mirror.png").compareTo(result).onComplete(function (result) {
    displayDiffImage(result);
    equal(true, result.isSameDimensions, "Images have the same dimensions");
    equal(0, result.misMatchPercentage, "Images are the same");
    start();
  })
});

asyncTest("mirror demo needs at least two iteration counts", function () {
  Math.reseed();
  var canvas_name = "mirror-test-fail"
  mirror_sample(canvas_name, 1);
  var canvas = document.getElementById(canvas_name);
  canvas.setAttribute("class", "input-canvas")
  var result = canvas.toDataURL("image/png");
  resemble("fixtures/mirror.png").compareTo(result).onComplete(function (result) {
    displayDiffImage(result);
    equal(true, result.isSameDimensions, "Images have the same dimensions");
    equal(0, result.misMatchPercentage, "Images are the same");
    start();
  })
});

asyncTest("Collada works", function () {
  Math.reseed();
  collada_sample("collada", 30,
    function () {
      var canvas = document.getElementById("collada");
      canvas.setAttribute("class", "input-canvas")
      var result = canvas.toDataURL("image/png");
      resemble("fixtures/collada.png").compareTo(result).onComplete(function (result) {
        displayDiffImage(result);
        equal(true, result.isSameDimensions, "Images have the same dimensions");
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
      })
    });
});


asyncTest("Collada fails with a different morph target", function () {
  Math.reseed();
  collada_sample("collada-fail", 29,
    function () {
      var canvas = document.getElementById("collada-fail");
      canvas.setAttribute("class", "input-canvas")
      var result = canvas.toDataURL("image/png");
      resemble("fixtures/collada.png").compareTo(result).onComplete(function (result) {
        displayDiffImage(result);
        equal(true, result.isSameDimensions, "Images have the same dimensions");
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
      })
    });
});