module( "Mirror Test" );

asyncTest( "mirror demo ", function() {
    var canvas = "mirror-test"
    mirror_sample(canvas);
    var canvas = document.getElementById(canvas);
    canvas.setAttribute("class", "input-canvas")
    var result = canvas.toDataURL("image/png");
    resemble("fixtures/mirror.png").compareTo(result).onComplete(function(result) {
        console.log(result)
        equal(true, result.isSameDimensions, "Images have the same dimensions");
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
    })
});

asyncTest( "mirror demo needs at least two iteratino counts", function() {
    var canvas = "mirror-test-fail"
    mirror_sample(canvas, 1);
    var canvas = document.getElementById(canvas);
    canvas.setAttribute("class", "input-canvas")
    var result = canvas.toDataURL("image/png");
    resemble("fixtures/mirror.png").compareTo(result).onComplete(function(result) {
        console.log(result)
        equal(true, result.isSameDimensions, "Images have the same dimensions");
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
    })
});

