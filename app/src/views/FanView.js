define(function(require, exports, module) {
  var View      = require('famous/core/View');
  var Transform = require('famous/core/Transform');
  var StripView = require('views/StripView');

  function _clickEmitter(data) {
    this._eventOutput.emit('clicked', {data: data});
    if (this.isOpen)
      this.reset();
    else
      this.open();
  }

  function _fanClosedEmitter() {
    this._eventOutput.emit('FanClosed');
  }

  function _createStrips() {
    this.stripViews = [];
    var cities = this.options.cities;
    for (var j=0; j<cities.length; j++) {
      this.stripViews[j] = new StripView({
        content: cities[j],
        angle: Math.PI
      });
      this.stripViews[j].on('clicked', _clickEmitter.bind(this));
      this._add(this.stripViews[j]);
    }
  }

  function FanView() {
    View.apply(this, arguments);
    this.isOpen = false;
    _createStrips.call(this);
  }

  FanView.prototype = View.prototype;
  FanView.prototype.constructor = FanView;

  FanView.DEFAULT_OPTIONS = {
    cities: null
  };

  FanView.prototype.reset = function() {
    for(var i=0; i<this.options.cities.length; i++) // syntax enforced by eslint
      if (i === this.options.cities.length - 1)
        this.stripViews[i].rotate(Math.PI, _fanClosedEmitter.bind(this));
      else
        this.stripViews[i].rotate(Math.PI);
    this.isOpen = false;
  };

  FanView.prototype.open = function() {
    for (var i = 0; i < this.options.cities.length; i++) // syntax enforced by eslint
      this.stripViews[i].stripContainerMod.setTransform(
          Transform.rotateZ(i * (Math.PI / 15) - (Math.PI / 3.5)),
        {duration:400}
      );
    this._eventOutput.emit('FanOpened');
    this.isOpen = true;
  };

  module.exports = FanView;
});
