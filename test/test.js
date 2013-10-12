/**
 * @author bhouston / http://exocortex.com
 */

module( "TestDummy" );

asyncTest( "test", function() {
    mirror_sample("mirror-test");
    var canvas = document.getElementById("mirror-test");
    // canvas.width = 1400;
    // canvas.height = 800;
    var result = canvas.toDataURL("image/png");
    // window.open(result)
    resemble("fixtures/mirror.png").compareTo(result).onComplete(function(result) {
        console.log(result)
        equal(true, result.isSameDimensions, "Images have the same dimensions");
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
    })
});

