function ComparerWidget(container, original, fail) {
  this.wrapper = this.setupDom(container, original, fail);
  this.min = 0;
  this.max = 10;
  this.step = 10;
  this.reanimateDelta = 3000;
  this.lastInteraction = null;
  this.value = this.min;
  this.inp = this.wrapper.getElementsByClassName("cwslider")[0];
  this.failImg = fail;
  this.clock = new THREE.Clock();
}

ComparerWidget.prototype.setupDom = function (container, original, fail) {
  original.setAttribute("class", "cworiginal");
  fail.setAttribute("class", "cwfail");
  var wrapper = document.createElement("div");
  wrapper.innerHTML = '<div><h2>Interactive Diff:</h2></div><div class="cwwrapper">' +
    '<div class="cwcontent"></div>' +
    '</div>' +
    '<div class="cwcontrols">' +
    'Expected ' +
    '<input class="cwslider" type="range" name="points" min="0" max="10" step="0.001"> Actual' +
    '</div>'
  container.appendChild(wrapper);
  content = wrapper.getElementsByClassName("cwcontent")[0];
  content.appendChild(original);
  content.appendChild(fail);
  return wrapper;
};

ComparerWidget.prototype.animate = function() {
  this.clock.getDelta();
  this.innerAnimate();
};

ComparerWidget.prototype.innerAnimate = function() {
  var delta = this.clock.getDelta();
  requestAnimationFrame(this.innerAnimate.bind(this));
  if (this.lastInteraction && new Date() - this.lastInteraction > this.reanimateDelta) {
    this.paused = false;
  }
  if (this.paused) return;
  this.updateOpacity(delta);
}

ComparerWidget.prototype.updateOpacity = function(delta) {
  this.value += this.step * delta;
  if (this.value > this.max) {
    this.value = this.max;
    this.step = -this.step;
  }
  if (this.value < this.min) {
    this.value = this.min;
    this.step = -this.step;
  }
  this.inp.value = this.value;
  this.setOpacity(this.value);
};

ComparerWidget.prototype.setOpacity = function(v) {
  this.failImg.style.opacity = v / this.max;
};

ComparerWidget.prototype.start = function() {
  var self = this;
  this.inp.addEventListener("click", function() {
    self.paused = true;
    self.setOpacity(self.inp.value);
  });
  this.inp.addEventListener("change", function() {
    self.setOpacity(self.inp.value);
    self.lastInteraction = new Date();
  });
  this.animate();
};
