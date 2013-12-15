module ("Mirror Test");

function displayDiffImage(result) {
  var currentTest = QUnit.config.current.testNumber - 1;
  var diffImage = document.createElement ("img")
  diffImage.src = result.getImageDataUrl ();
  image_diffs = document.getElementById ('qunit-test-output' + currentTest)
  image_diffs.appendChild (diffImage)

}

function sceneTest(name, block) {
  asyncTest (name, function() {
    var canvasName = name.replace (/\s+/g, "-");
    Math.reseed ();
    var resembleFn = function() {
      var canvas = document.getElementById (canvasName);
      canvas.setAttribute ("class", "input-canvas")
      var result = canvas.toDataURL ("image/png");
      resemble ("fixtures/collada.png").compareTo (result).onComplete (function(result) {
        displayDiffImage (result);
        equal (true, result.isSameDimensions, "Images have the same dimensions");
        equal (0, result.misMatchPercentage, "Images are the same");
        start ();
      });
    }
    block (canvasName, resembleFn);
  });
};

sceneTest ("mirror demo ", function(canvasName) {
  mirror_sample (canvasName);
  var canvas = document.getElementById (canvasName);
  canvas.setAttribute ("class", "input-canvas")
  var result = canvas.toDataURL ("image/png");
  resemble ("fixtures/mirror.png").compareTo (result).onComplete (function(result) {
    displayDiffImage (result);
    equal (true, result.isSameDimensions, "Images have the same dimensions");
    equal (0, result.misMatchPercentage, "Images are the same");
    start ();
  })
});

sceneTest ("mirror demo needs at least two iteration counts", function(canvasName) {
  mirror_sample (canvasName, 1);
  var canvas = document.getElementById (canvasName);
  canvas.setAttribute ("class", "input-canvas")
  var result = canvas.toDataURL ("image/png");
  resemble ("fixtures/mirror.png").compareTo (result).onComplete (function(result) {
    displayDiffImage (result);
    equal (true, result.isSameDimensions, "Images have the same dimensions");
    equal (0, result.misMatchPercentage, "Images are the same");
    start ();
  })
});

sceneTest ("Collada works", function(canvasName, resembleFn) {
  collada_sample (canvasName, 30, resembleFn);
});


sceneTest ("Collada fails with a different morph target", function(canvasName) {
  collada_sample (canvasName, 29,
    function() {
      var canvas = document.getElementById (canvasName);
      canvas.setAttribute ("class", "input-canvas")
      var result = canvas.toDataURL ("image/png");
      resemble ("fixtures/collada.png").compareTo (result).onComplete (function(result) {
        displayDiffImage (result);
        equal (true, result.isSameDimensions, "Images have the same dimensions");
        equal (0, result.misMatchPercentage, "Images are the same");
        start ();
      })
    });
});