module("Mirror Test");

function displayResults(inputImage, outputCanvas, diffResult) {
  var diffImage = document.createElement("img");
  diffImage.setAttribute("class", "diff-image");
  diffImage.src = diffResult.getImageDataUrl();
  var imageDiffs = document.getElementById(QUnit.config.current.id);
  imageDiffs.appendChild(diffImage);
  if (diffResult.misMatchPercentage != 0) {
    outputCanvas.setAttribute("class", "")
    new ComparerWidget(imageDiffs, inputImage, outputCanvas).start()
  }
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
    var resembleFn = function (fixtureName, outputCanvas) {
      outputCanvas.setAttribute("id", canvasName);
      outputCanvas.setAttribute("class", "output-canvas");
      var result = outputCanvas.toDataURL("image/png");
      var url = "fixtures/" + fixtureName + ".png"
      withImage(url, function (inputImage) {
        resemble(url).compareTo(result).onComplete(function (diffResult) {
          displayResults(inputImage, outputCanvas, diffResult);
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