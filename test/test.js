module("Mirror Test");

function displayResults(inputImage, diffResult) {
  var diffImage = document.createElement("img");
  diffImage.setAttribute("class", "diff-image");
  diffImage.src = diffResult.getImageDataUrl();
  var imageDiffs = document.getElementById(QUnit.config.current.id);
  imageDiffs.appendChild(diffImage);
}

function withImage(url, callback) {
  var img = new Image();
  img.onload = function() {
    callback(img)
  };
  img.src = url;
}

function sceneTest(name, block) {
  asyncTest(name, function () {
    var canvasName = name.replace(/\s+/g, "-");
    var resembleFn = function (fixtureName, canvas) {
      canvas.setAttribute("id", canvasName);
      canvas.setAttribute("class", "input-canvas");
      var result = canvas.toDataURL("image/png");
      var url = "fixtures/" + fixtureName + ".png"
      withImage(url, function (inputImage) {
        resemble(url).compareTo(result).onComplete(function (diffResult) {
          displayResults(inputImage, diffResult);
          equal(true, diffResult.isSameDimensions, "Images have the same dimensions");
          equal(0, diffResult.misMatchPercentage, "Images are the same");
          start();
        });
      });

    }
    block(resembleFn);
  });
}

sceneTest("mirror demo ", function(resembleFn) {
  resembleFn("mirror", mirror_sample());
});

sceneTest("FAIL EXAMPLE: mirror demo needs at least two iteration counts", function(resembleFn) {
  resembleFn("mirror", mirror_sample(1));
});

sceneTest("Collada works", function(resembleFn) {
  collada_sample(30, function(canvas) {
    resembleFn("collada", canvas);
  });
});

sceneTest("FAIL EXAMPLE: Collada fails with a different morph target", function(resembleFn) {
  collada_sample(29, function(canvas) {
    resembleFn("collada", canvas);
  });
});

sceneTest("Multiple geometries", function(resembleFn) {
  geometries_sample(function(canvas) {
    resembleFn("geometries", canvas);
  });
});