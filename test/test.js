/**
 * @author bhouston / http://exocortex.com
 */

module( "TestDummy" );

asyncTest( "test", function() {
    mirror_sample("mirror-test");
    var result = document.getElementById("mirror-test").toDataURL("image/png");
    // window.open(result)
    resemble("fixtures/mirror.png").compareTo(result).onComplete(function(result) {
        console.log(result)
        equal(0, result.misMatchPercentage, "Images are the same");
        start();
    })
});

