module("Mirror Test");

function displayDiffImage(result) {
  var currentTest = QUnit.config.current.testNumber - 1;
  var diffImage = document.createElement("img")
  diffImage.src = result.getImageDataUrl();
  image_diffs = document.getElementById('qunit-test-output' + currentTest)
  image_diffs.appendChild(diffImage)

}

function sceneTest(name, block) {
  asyncTest(name, function() {
    var canvasName = name.replace(/\s+/g, "-");
    Math.reseed();
    var resembleFn = function(fixtureName) {
      var canvas = document.getElementById(canvasName);
      canvas.setAttribute("class", "input-canvas")
      var result = canvas.toDataURL("image/png");
      resemble("fixtures/" + fixtureName + ".png").compareTo(result).onComplete(function(result) {
        displayDiffImage(result);
        equal(true, result.isSameDimensions, "Images have the same dimensions");
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
      });
    }
    block(canvasName, resembleFn);
  });
};

sceneTest("mirror demo ", function(canvasName, resembleFn) {
  mirror_sample(canvasName);
  resembleFn("mirror")
});

sceneTest("mirror demo needs at least two iteration counts", function(canvasName, resembleFn) {
  mirror_sample(canvasName, 1);
  resembleFn("mirror")
});

sceneTest("Collada works", function(canvasName, resembleFn) {
  collada_sample(canvasName, 30, function() {
    resembleFn("collada")
  });
});


sceneTest("Collada fails with a different morph target", function(canvasName, resembleFn) {
  collada_sample(canvasName, 29, function() {
    resembleFn("collada")
  });
});